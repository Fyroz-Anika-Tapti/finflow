
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout.jsx";
import axios from "../../../Lib/axios.js";

function PaymentCalendar() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [currentDate, setCurrentDate] = useState(() => new Date());
    const [selectedDate, setSelectedDate] = useState(() => {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    });

    const [filterType, setFilterType] = useState("all");

    // Convert Date to YYYY-MM-DD using local date
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    // Fetch existing transactions
    async function fetchTransactions() {
        try {
            setLoading(true);
            setError("");

            const response = await axios.get("transactions/index.php");

            // Support common_select response formats
            const result = response.data;
            let rows = Array.isArray(result)
                ? result
                : Array.isArray(result?.data)
                    ? result.data
                    : [];

            // Ignore soft-deleted transactions
            rows = rows.filter((item) => {
                const deletedAt = item.deleted_at ?? item.Deleted_at;
                return !deletedAt;
            });

            setTransactions(rows);
        } catch (err) {
            console.error("Payment Calendar error:", err);
            setError("Transactions could not be loaded.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTransactions();
    }, []);

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const monthName = currentDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
    });

    // Create calendar cells. Week starts on Sunday.
    const calendarDays = useMemo(() => {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const days = [];

        for (let i = 0; i < firstDay.getDay(); i++) {
            days.push(null);
        }

        for (let day = 1; day <= lastDay.getDate(); day++) {
            days.push(new Date(year, month, day));
        }

        while (days.length % 7 !== 0) {
            days.push(null);
        }

        return days;
    }, [year, month]);

    // Transactions belonging to the selected month
    const monthTransactions = useMemo(() => {
        return transactions.filter((item) => {
            if (!item.transaction_date) return false;

            const date = String(item.transaction_date).substring(0, 10);

            return date.startsWith(
                `${year}-${String(month + 1).padStart(2, "0")}-`
            );
        });
    }, [transactions, year, month]);

    // Monthly totals
    const summary = useMemo(() => {
        let income = 0;
        let expense = 0;

        monthTransactions.forEach((item) => {
            const type = String(item.transaction_type || "").toLowerCase();
            const amount = Number(item.amount || 0);

            if (type === "income") {
                income += amount;
            } else if (type === "expense") {
                expense += amount;
            }
        });

        return {
            income,
            expense,
            balance: income - expense
        };
    }, [monthTransactions]);

    // Apply income/expense filter to selected date
    const selectedTransactions = useMemo(() => {
        return monthTransactions.filter((item) => {
            const transactionDate = String(item.transaction_date).substring(0, 10);
            const type = String(item.transaction_type || "").toLowerCase();

            return (
                transactionDate === selectedDate &&
                (filterType === "all" || type === filterType)
            );
        });
    }, [monthTransactions, selectedDate, filterType]);

    function changeMonth(amount) {
        setCurrentDate((previous) => {
            const next = new Date(
                previous.getFullYear(),
                previous.getMonth() + amount,
                1
            );

            return next;
        });

        setSelectedDate((previous) => {
            const current = new Date(previous + "T00:00:00");

            const next = new Date(
                current.getFullYear(),
                current.getMonth() + amount,
                1
            );

            return formatDate(next);
        });
    }

    function getTransactionsForDay(date) {
        const dateString = formatDate(date);

        return monthTransactions.filter(
            (item) =>
                String(item.transaction_date).substring(0, 10) === dateString
        );
    }

    function money(amount) {
        return "৳ " + Number(amount || 0).toLocaleString("en-BD", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    function goToToday() {
        const today = new Date();

        setCurrentDate(today);
        setSelectedDate(formatDate(today));
    }

    return (
        <Layout>
            <div className="container">
                <div className="page-inner">

                    <div className="page-header d-flex justify-content-between align-items-center flex-wrap">
                        <div>
                            <h3 className="fw-bold mb-2">
                                Payment Calendar
                            </h3>
                            <p className="text-muted">
                                View your income and expense transactions by date.
                            </p>
                        </div>

                        <Link
                            to="/transactions"
                            className="btn btn-primary"
                        >
                            View Transactions
                        </Link>
                    </div>

                    {/* Monthly Summary */}
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <div className="card card-round">
                                <div className="card-body">
                                    <p className="text-muted mb-1">
                                        Total Income
                                    </p>
                                    <h3 className="text-success fw-bold">
                                        {money(summary.income)}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="card card-round">
                                <div className="card-body">
                                    <p className="text-muted mb-1">
                                        Total Expense
                                    </p>
                                    <h3 className="text-danger fw-bold">
                                        {money(summary.expense)}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="card card-round">
                                <div className="card-body">
                                    <p className="text-muted mb-1">
                                        Monthly Balance
                                    </p>
                                    <h3 className="fw-bold">
                                        {money(summary.balance)}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">

                        {/* Calendar */}
                        <div className="col-lg-7 mb-4">
                            <div className="card card-round h-100">

                                <div className="card-header">
                                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                                        <h4 className="card-title mb-0">
                                            {monthName}
                                        </h4>

                                        <div className="d-flex gap-2">
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => changeMonth(-1)}
                                            >
                                                Previous
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary btn-sm"
                                                onClick={goToToday}
                                            >
                                                Today
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => changeMonth(1)}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body">
                                    {loading ? (
                                        <p className="text-center py-5">
                                            Loading calendar...
                                        </p>
                                    ) : error ? (
                                        <div className="alert alert-danger">
                                            {error}
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger ms-2"
                                                onClick={fetchTransactions}
                                            >
                                                Retry
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="row g-1 text-center mb-2">
                                                {[
                                                    "Sun", "Mon", "Tue", "Wed",
                                                    "Thu", "Fri", "Sat"
                                                ].map((day) => (
                                                    <div
                                                        className="col"
                                                        key={day}
                                                    >
                                                        <small className="fw-bold text-muted">
                                                            {day}
                                                        </small>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="row g-1">
                                                {calendarDays.map((date, index) => {
                                                    if (!date) {
                                                        return (
                                                            <div
                                                                className="col"
                                                                key={`empty-${index}`}
                                                            >
                                                                <div
                                                                    style={{ minHeight: "72px" }}
                                                                />
                                                            </div>
                                                        );
                                                    }

                                                    const dateString = formatDate(date);
                                                    const dayTransactions =
                                                        getTransactionsForDay(date);

                                                    const hasIncome =
                                                        dayTransactions.some(
                                                            (item) =>
                                                                String(item.transaction_type).toLowerCase() === "income"
                                                        );

                                                    const hasExpense =
                                                        dayTransactions.some(
                                                            (item) =>
                                                                String(item.transaction_type).toLowerCase() === "expense"
                                                        );

                                                    const isSelected =
                                                        selectedDate === dateString;

                                                    const isToday =
                                                        dateString === formatDate(new Date());

                                                    return (
                                                        <div
                                                            className="col"
                                                            key={dateString}
                                                        >
                                                            <button
                                                                type="button"
                                                                onClick={() => setSelectedDate(dateString)}
                                                                className={`btn w-100 p-1 ${isSelected
                                                                    ? "btn-primary"
                                                                    : "btn-light"
                                                                    }`}
                                                                style={{
                                                                    minHeight: "72px",
                                                                    border: isToday
                                                                        ? "2px solid #0d6efd"
                                                                        : "1px solid #e5e7eb"
                                                                }}
                                                            >
                                                                <div className="fw-bold">
                                                                    {date.getDate()}
                                                                </div>

                                                                <div className="d-flex justify-content-center gap-1 mt-2">
                                                                    {hasIncome && (
                                                                        <span
                                                                            title="Income"
                                                                            style={{
                                                                                width: "7px",
                                                                                height: "7px",
                                                                                borderRadius: "50%",
                                                                                background: isSelected
                                                                                    ? "#ffffff"
                                                                                    : "#198754"
                                                                            }}
                                                                        />
                                                                    )}

                                                                    {hasExpense && (
                                                                        <span
                                                                            title="Expense"
                                                                            style={{
                                                                                width: "7px",
                                                                                height: "7px",
                                                                                borderRadius: "50%",
                                                                                background: isSelected
                                                                                    ? "#ffffff"
                                                                                    : "#dc3545"
                                                                            }}
                                                                        />
                                                                    )}
                                                                </div>

                                                                {dayTransactions.length > 0 && (
                                                                    <small
                                                                        className="d-block mt-1"
                                                                        style={{
                                                                            fontSize: "10px"
                                                                        }}
                                                                    >
                                                                        {dayTransactions.length} item(s)
                                                                    </small>
                                                                )}
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            <div className="d-flex gap-3 mt-3 flex-wrap">
                                                <small>
                                                    <span className="text-success">●</span>
                                                    {" "}Income
                                                </small>
                                                <small>
                                                    <span className="text-danger">●</span>
                                                    {" "}Expense
                                                </small>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Selected Date Transactions */}
                        <div className="col-lg-5 mb-4">
                            <div className="card card-round h-100">

                                <div className="card-header">
                                    <h4 className="card-title">
                                        Transactions
                                    </h4>
                                    <p className="text-muted mb-0">
                                        {selectedDate}
                                    </p>
                                </div>

                                <div className="card-body">

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Filter by type
                                        </label>

                                        <select
                                            className="form-select"
                                            value={filterType}
                                            onChange={(e) => setFilterType(e.target.value)}
                                        >
                                            <option value="all">
                                                All Transactions
                                            </option>
                                            <option value="income">
                                                Income
                                            </option>
                                            <option value="expense">
                                                Expense
                                            </option>
                                        </select>
                                    </div>

                                    {loading ? (
                                        <p className="text-muted">
                                            Loading transactions...
                                        </p>
                                    ) : error ? (
                                        <p className="text-danger">
                                            Unable to load transactions.
                                        </p>
                                    ) : selectedTransactions.length === 0 ? (
                                        <div className="text-center py-5">
                                            <h5>No Transactions</h5>
                                            <p className="text-muted">
                                                No transactions found for this date.
                                            </p>
                                        </div>
                                    ) : (
                                        selectedTransactions.map((item) => {
                                            const type = String(
                                                item.transaction_type || ""
                                            ).toLowerCase();

                                            return (
                                                <div
                                                    key={item.id}
                                                    className="border rounded p-3 mb-3"
                                                >
                                                    <div className="d-flex justify-content-between align-items-start gap-2">
                                                        <div>
                                                            <h6 className="fw-bold mb-1">
                                                                {item.purpose || "Transaction"}
                                                            </h6>

                                                            <small className="text-muted">
                                                                {item.transaction_date}
                                                            </small>
                                                        </div>

                                                        <span
                                                            className={`badge ${type === "income"
                                                                ? "bg-success"
                                                                : type === "expense"
                                                                    ? "bg-danger"
                                                                    : "bg-secondary"
                                                                }`}
                                                        >
                                                            {type || "Other"}
                                                        </span>
                                                    </div>

                                                    <h5 className={`mt-3 mb-0 ${type === "income"
                                                        ? "text-success"
                                                        : "text-danger"
                                                        }`}>
                                                        {type === "income" ? "+" : "-"}
                                                        {" "}
                                                        {money(item.amount)}
                                                    </h5>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default PaymentCalendar;
