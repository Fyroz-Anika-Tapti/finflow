
import { useState, useEffect } from "react";
import Layout from "../Layout.jsx";
import axios from "../../../Lib/axios.js";

function LoanAnalysis() {
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchAnalysis = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await axios.get("loans/analysis.php");

            if (res.data.status && res.data.data) {
                setAnalysis(res.data.data);
            } else {
                setError(
                    res.data.message || "Loan analysis failed to load."
                );
            }
        } catch (err) {
            console.error("Loan analysis error:", err);
            console.error("API response:", err.response?.data);

            setError(
                err.response?.data?.message ||
                "Could not load loan analysis. Check your API and authentication."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalysis();
    }, []);

    const money = (value) =>
        "৳ " + Number(value || 0).toLocaleString("en-BD", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

    const riskClass = (level) => {
        if (level === "Low") return "bg-success";
        if (level === "Moderate") return "bg-warning text-dark";
        if (level === "High") return "bg-danger";
        return "bg-secondary";
    };

    const affordabilityClass = (value) => {
        if (value === "Positive") return "bg-success";
        if (value === "Insufficient") return "bg-danger";
        return "bg-secondary";
    };

    return (
        <Layout>
            <div className="container">
                <div className="page-inner">
                    <div className="page-header d-flex justify-content-between align-items-center">
                        <div>
                            <h3 className="fw-bold mb-1">
                                Loan Analysis
                            </h3>
                            <p className="text-muted mb-0">
                                Check loan affordability and monthly financial pressure.
                            </p>
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={fetchAnalysis}
                            disabled={loading}
                        >
                            <i className="fa fa-refresh me-2"></i>
                            Refresh
                        </button>
                    </div>

                    {loading && (
                        <div className="card card-round">
                            <div className="card-body text-center p-5">
                                <div
                                    className="spinner-border text-primary"
                                    role="status"
                                ></div>
                                <p className="mt-3 mb-0">
                                    Calculating loan analysis...
                                </p>
                            </div>
                        </div>
                    )}

                    {!loading && error && (
                        <div className="alert alert-danger">
                            <strong>Unable to load analysis.</strong>
                            <p className="mb-2 mt-1">{error}</p>
                            <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={fetchAnalysis}
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {!loading && !error && analysis && (
                        <>
                            <div className="mb-3">
                                <h5 className="fw-bold">
                                    Monthly Overview
                                </h5>
                                <p className="text-muted">
                                    {analysis.month}
                                </p>
                            </div>

                            <div className="row">
                                <div className="col-md-6 col-xl-3 mb-3">
                                    <div className="card card-round h-100">
                                        <div className="card-body">
                                            <p className="text-muted mb-2">
                                                Monthly Income
                                            </p>
                                            <h3 className="fw-bold text-success">
                                                {money(analysis.monthly_income)}
                                            </h3>
                                            <small className="text-muted">
                                                From recorded transactions
                                            </small>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 col-xl-3 mb-3">
                                    <div className="card card-round h-100">
                                        <div className="card-body">
                                            <p className="text-muted mb-2">
                                                Monthly Expense
                                            </p>
                                            <h3 className="fw-bold text-danger">
                                                {money(analysis.monthly_expense)}
                                            </h3>
                                            <small className="text-muted">
                                                Current month
                                            </small>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 col-xl-3 mb-3">
                                    <div className="card card-round h-100">
                                        <div className="card-body">
                                            <p className="text-muted mb-2">
                                                Total Active Loan
                                            </p>
                                            <h3 className="fw-bold">
                                                {money(analysis.active_loan_amount)}
                                            </h3>
                                            <small className="text-muted">
                                                {analysis.active_loan_count} active loan(s)
                                            </small>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 col-xl-3 mb-3">
                                    <div className="card card-round h-100">
                                        <div className="card-body">
                                            <p className="text-muted mb-2">
                                                Monthly EMI
                                            </p>
                                            <h3 className="fw-bold text-primary">
                                                {money(analysis.monthly_emi)}
                                            </h3>
                                            <small className="text-muted">
                                                Total active loan EMI
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-6 mb-3">
                                    <div className="card card-round h-100">
                                        <div className="card-header">
                                            <h4 className="card-title mb-0">
                                                Loan Affordability Checker
                                            </h4>
                                        </div>

                                        <div className="card-body">
                                            <div className="d-flex justify-content-between mb-3">
                                                <span>Income after expenses</span>
                                                <strong>
                                                    {money(
                                                        analysis.monthly_surplus_before_emi
                                                    )}
                                                </strong>
                                            </div>

                                            <div className="d-flex justify-content-between mb-3">
                                                <span>Total monthly EMI</span>
                                                <strong className="text-primary">
                                                    − {money(analysis.monthly_emi)}
                                                </strong>
                                            </div>

                                            <hr />

                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <span className="fw-bold">
                                                    Remaining after EMI
                                                </span>
                                                <h4
                                                    className={`fw-bold mb-0 ${Number(analysis.remaining_after_emi) < 0
                                                        ? "text-danger"
                                                        : "text-success"
                                                        }`}
                                                >
                                                    {money(analysis.remaining_after_emi)}
                                                </h4>
                                            </div>

                                            <span
                                                className={`badge ${affordabilityClass(
                                                    analysis.affordability
                                                )}`}
                                            >
                                                {analysis.affordability}
                                            </span>

                                            <p className="text-muted mt-3 mb-0">
                                                {analysis.affordability_message}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <div className="card card-round h-100">
                                        <div className="card-header">
                                            <h4 className="card-title mb-0">
                                                Loan Risk Indicator
                                            </h4>
                                        </div>

                                        <div className="card-body">
                                            <p className="text-muted mb-2">
                                                EMI as a percentage of monthly income
                                            </p>

                                            <h2 className="fw-bold mb-3">
                                                {analysis.emi_to_income_ratio === null
                                                    ? "N/A"
                                                    : `${Number(
                                                        analysis.emi_to_income_ratio
                                                    ).toFixed(2)}%`}
                                            </h2>

                                            <div
                                                className="progress mb-3"
                                                style={{ height: "12px" }}
                                            >
                                                <div
                                                    className={`progress-bar ${analysis.risk_level === "Low"
                                                        ? "bg-success"
                                                        : analysis.risk_level === "Moderate"
                                                            ? "bg-warning"
                                                            : analysis.risk_level === "High"
                                                                ? "bg-danger"
                                                                : "bg-secondary"
                                                        }`}
                                                    role="progressbar"
                                                    style={{
                                                        width: `${analysis.emi_to_income_ratio === null
                                                            ? 0
                                                            : Math.min(
                                                                Number(
                                                                    analysis.emi_to_income_ratio
                                                                ),
                                                                100
                                                            )
                                                            }%`
                                                    }}
                                                    aria-valuenow={
                                                        analysis.emi_to_income_ratio ?? 0
                                                    }
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                ></div>
                                            </div>

                                            <span
                                                className={`badge ${riskClass(
                                                    analysis.risk_level
                                                )}`}
                                            >
                                                {analysis.risk_level} Risk
                                            </span>

                                            <p className="text-muted mt-3 mb-0">
                                                {analysis.risk_message}
                                            </p>

                                            <small className="text-muted d-block mt-3">
                                                Guide: Low ≤ 20%, Moderate 20–35%,
                                                High above 35%. This is a budgeting
                                                indicator, not an official credit score.
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card card-round">
                                <div className="card-header">
                                    <h4 className="card-title mb-0">
                                        Active Loan Breakdown
                                    </h4>
                                </div>

                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Loan Title</th>
                                                    <th>Lender</th>
                                                    <th>Loan Amount</th>
                                                    <th>Interest Rate</th>
                                                    <th>Monthly EMI</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {analysis.loans?.length > 0 ? (
                                                    analysis.loans.map((loan) => (
                                                        <tr key={loan.id}>
                                                            <td>{loan.loan_title}</td>
                                                            <td>{loan.lender_name || "-"}</td>
                                                            <td>{money(loan.loan_amount)}</td>
                                                            <td>
                                                                {Number(
                                                                    loan.interest_rate || 0
                                                                ).toFixed(2)}%
                                                            </td>
                                                            <td>{money(loan.emi_amount)}</td>
                                                            <td>
                                                                <span className="badge bg-success">
                                                                    {loan.status}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td
                                                            colSpan="6"
                                                            className="text-center"
                                                        >
                                                            No active loans found.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default LoanAnalysis;
