
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "../Layout.jsx";
import axios from "../../../Lib/axios.js";

function LoansCreate() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        loan_title: "",
        lender_name: "",
        loan_amount: "",
        interest_rate: "0",
        interest_type: "reducing",
        tenure_months: "",
        start_date: "",
        end_date: "",
        purpose: "",
        notes: ""
    });

    const [loading, setLoading] = useState(false);

    // Fetch existing loan when editing
    async function fetchLoan() {
        try {
            const response = await axios.get(
                `loans/single.php?id=${id}`
            );

            console.log("Loan response:", response.data);

            const loan =
                response.data.data?.[0] ?? response.data.data;

            if (!loan) {
                alert("Loan data not found.");
                navigate("/loans");
                return;
            }

            setFormData({
                loan_title: loan.loan_title ?? "",
                lender_name: loan.lender_name ?? "",
                loan_amount: loan.loan_amount ?? "",
                interest_rate: String(loan.interest_rate ?? 0),
                interest_type: loan.interest_type ?? "reducing",
                tenure_months: String(loan.tenure_months ?? ""),
                start_date: loan.start_date
                    ? loan.start_date.substring(0, 10)
                    : "",
                end_date: loan.end_date
                    ? loan.end_date.substring(0, 10)
                    : "",
                purpose: loan.purpose ?? "",
                notes: loan.notes ?? ""
            });
        } catch (error) {
            console.error("Fetch loan error:", error);
            console.error("API response:", error.response?.data);
            alert("Loan data could not be loaded.");
        }
    }

    useEffect(() => {
        if (id) {
            fetchLoan();
        }
    }, [id]);


    useEffect(() => {
        const { start_date, tenure_months } = formData;

        if (!start_date || !tenure_months || Number(tenure_months) <= 0) {
            return;
        }

        const startDate = new Date(start_date + "T00:00:00");
        const months = Number(tenure_months);

        // Calculate end date
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + months);

        // Handle month-end overflow, e.g. January 31
        if (endDate.getDate() !== startDate.getDate()) {
            endDate.setDate(0);
        }

        const year = endDate.getFullYear();
        const month = String(endDate.getMonth() + 1).padStart(2, "0");
        const day = String(endDate.getDate()).padStart(2, "0");

        const calculatedEndDate = `${year}-${month}-${day}`;

        setFormData((previous) => ({
            ...previous,
            end_date: calculatedEndDate
        }));
    }, [formData.start_date, formData.tenure_months]);


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    // Calculate EMI
    function calculateEMI() {
        const principal = Number(formData.loan_amount);
        const annualRate = Number(formData.interest_rate);
        const months = Number(formData.tenure_months);

        if (
            principal <= 0 ||
            months <= 0 ||
            annualRate < 0
        ) {
            return 0;
        }

        if (formData.interest_type === "flat") {
            const interest =
                principal * (annualRate / 100) * (months / 12);

            return (principal + interest) / months;
        }

        const monthlyRate = annualRate / 1200;

        if (monthlyRate === 0) {
            return principal / months;
        }

        return (
            principal *
            monthlyRate *
            Math.pow(1 + monthlyRate, months) /
            (Math.pow(1 + monthlyRate, months) - 1)
        );
    }

    const emi = calculateEMI();

    async function handleSubmit(e) {
        e.preventDefault();

        if (Number(formData.loan_amount) <= 0) {
            alert("Loan amount must be greater than zero.");
            return;
        }

        if (Number(formData.interest_rate) < 0) {
            alert("Interest rate cannot be negative.");
            return;
        }

        if (Number(formData.tenure_months) <= 0) {
            alert("Loan tenure must be greater than zero.");
            return;
        }

        if (
            formData.end_date < formData.start_date
        ) {
            alert("End date cannot be earlier than start date.");
            return;
        }

        const data = {
            ...formData,
            loan_amount: Number(formData.loan_amount),
            interest_rate: Number(formData.interest_rate),
            tenure_months: Number(formData.tenure_months),
            emi_amount: Number(emi.toFixed(2))
        };

        try {
            setLoading(true);

            let response;

            if (id) {
                // Edit existing loan
                response = await axios.post(
                    `loans/update.php?id=${id}`,
                    {
                        ...data,
                        id: Number(id)
                    }
                );
            } else {
                // Create new loan
                response = await axios.post(
                    "loans/create.php",
                    data
                );
            }

            console.log("Save loan response:", response.data);

            if (
                response.data.status === true ||
                response.data.status === "success" ||
                response.data.success === true
            ) {
                alert(
                    id
                        ? "Loan updated successfully."
                        : "Loan created successfully."
                );

                navigate("/loans");
            } else {
                alert(
                    response.data.message ||
                    (id ? "Loan update failed." : "Loan creation failed.")
                );
            }
        } catch (error) {
            console.error("Save loan error:", error);
            console.error("API response:", error.response?.data);

            alert(
                error.response?.data?.message ||
                (id ? "Loan update failed." : "Loan creation failed.")
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <Layout>
            <div className="container">
                <div className="page-inner">

                    <div className="page-header">
                        <h3 className="fw-bold mb-3">
                            {id ? "Edit Loan" : "Add New Loan"}
                        </h3>


                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-round">

                                <div className="card-header">
                                    <h4 className="card-title">
                                        {id ? "Update Loan Information" : "Loan Information"}
                                    </h4>
                                </div>

                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Loan Title *</label>
                                                <input
                                                    type="text"
                                                    name="loan_title"
                                                    className="form-control"
                                                    value={formData.loan_title}
                                                    onChange={handleChange}
                                                    maxLength="100"
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Lender Name *</label>
                                                <input
                                                    type="text"
                                                    name="lender_name"
                                                    className="form-control"
                                                    value={formData.lender_name}
                                                    onChange={handleChange}
                                                    maxLength="150"
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Loan Amount (৳) *</label>
                                                <input
                                                    type="number"
                                                    name="loan_amount"
                                                    className="form-control"
                                                    value={formData.loan_amount}
                                                    onChange={handleChange}
                                                    min="0.01"
                                                    step="0.01"
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Annual Interest Rate (%) *</label>
                                                <input
                                                    type="number"
                                                    name="interest_rate"
                                                    className="form-control"
                                                    value={formData.interest_rate}
                                                    onChange={handleChange}
                                                    min="0"
                                                    step="0.01"
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Interest Type *</label>
                                                <select
                                                    name="interest_type"
                                                    className="form-select"
                                                    value={formData.interest_type}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="reducing">Reducing Balance</option>
                                                    <option value="flat">Flat Interest</option>
                                                </select>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Tenure (Months) *</label>
                                                <input
                                                    type="number"
                                                    name="tenure_months"
                                                    className="form-control"
                                                    value={formData.tenure_months}
                                                    onChange={handleChange}
                                                    min="1"
                                                    step="1"
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Start Date *</label>
                                                <input
                                                    type="date"
                                                    name="start_date"
                                                    className="form-control"
                                                    value={formData.start_date}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">End Date *</label>
                                                <input
                                                    type="date"
                                                    name="end_date"
                                                    className="form-control"
                                                    value={formData.end_date}
                                                    min={formData.start_date || undefined}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-12 mb-3">
                                                <label className="form-label">Purpose *</label>
                                                <select
                                                    name="purpose"
                                                    className="form-select"
                                                    value={formData.purpose}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Select purpose</option>
                                                    <option value="Education">Education</option>
                                                    <option value="Home">Home</option>
                                                    <option value="Business">Business</option>
                                                    <option value="Medical">Medical</option>
                                                    <option value="Personal">Personal</option>
                                                    <option value="Vehicle">Vehicle</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>

                                            <div className="col-md-12 mb-3">
                                                <label className="form-label">Notes</label>
                                                <textarea
                                                    name="notes"
                                                    className="form-control"
                                                    rows="3"
                                                    value={formData.notes}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="card bg-light mb-4">
                                            <div className="card-body">
                                                <h5 className="fw-bold">EMI Summary</h5>

                                                <p className="mb-1">
                                                    Monthly EMI: <strong>
                                                        ৳ {emi.toLocaleString("en-BD", {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2
                                                        })}
                                                    </strong>
                                                </p>

                                                <p className="mb-0">
                                                    Estimated Total Payment: <strong>
                                                        ৳ {(emi * Number(formData.tenure_months || 0)).toLocaleString("en-BD", {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2
                                                        })}
                                                    </strong>
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary mt-3"
                                            disabled={loading}
                                        >
                                            {loading
                                                ? "Saving..."
                                                : id
                                                    ? "Update Loan"
                                                    : "Save Loan"}
                                        </button>

                                        <Link
                                            to="/loans"
                                            className="btn btn-secondary mt-3 ms-2"
                                        >
                                            Back
                                        </Link>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
}

export default LoansCreate;
