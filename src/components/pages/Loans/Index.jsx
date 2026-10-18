
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout.jsx";
import axios from "../../../Lib/axios.js";

function Loans() {
    const [loans, setLoans] = useState([]);

    const fetchLoans = async () => {
        try {
            const res = await axios.get("loans/index.php");

            console.log("Loans response:", res.data);

            if (Array.isArray(res.data.data)) {
                setLoans(res.data.data);
            } else {
                setLoans([]);
            }
        } catch (error) {
            console.error("Fetch loans error:", error);
            alert("Loan list failed to load.");
        }
    };

    useEffect(() => {
        fetchLoans();
    }, []);

    async function handleDelete(id) {
        if (
            !window.confirm(
                "Are you sure you want to delete this loan?"
            )
        ) {
            return;
        }

        try {
            const res = await axios.delete(
                `loans/delete.php?id=${id}`
            );

            console.log("Delete loan response:", res.data);

            if (
                res.data.status === true &&
                res.data.data !== 0
            ) {
                alert("Loan deleted successfully.");
                fetchLoans();
            } else {
                alert(
                    res.data.message || "Loan delete failed."
                );
            }
        } catch (error) {
            console.error("Delete loan error:", error);
            console.error(
                "API error response:",
                error.response?.data
            );

            alert("Loan delete failed.");
        }
    }

    return (
        <Layout>
            <div className="container">
                <div className="page-inner">
                    <div className="page-header">
                        <h3 className="fw-bold mb-3">
                            Loans
                        </h3>

                        <ul className="breadcrumbs mb-3">
                            <li className="nav-home">
                                <Link to="/">
                                    <i className="icon-home"></i>
                                </Link>
                            </li>

                            <li className="separator">
                                <i className="icon-arrow-right"></i>
                            </li>

                            <li className="nav-item">
                                <Link to="/loans">
                                    Loans
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-round">
                                <div className="card-header">
                                    <div className="d-flex align-items-center">
                                        <h4 className="card-title">
                                            Loan List
                                        </h4>

                                        <Link
                                            to="/loans/create"
                                            className="btn btn-primary btn-round ms-auto"
                                        >
                                            <i className="fa fa-plus"></i>
                                            &nbsp; Add Loan
                                        </Link>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Loan Title</th>
                                                    <th>Lender Name</th>
                                                    <th>Loan Amount</th>
                                                    <th>Interest Rate</th>
                                                    <th>Monthly EMI</th>
                                                    <th>Start Date</th>
                                                    <th>End Date</th>
                                                    <th>Purpose</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {loans.length > 0 ? (
                                                    loans.map((loan) => (
                                                        <tr key={loan.id}>
                                                            <td>
                                                                {loan.id}
                                                            </td>

                                                            <td>
                                                                {loan.loan_title}
                                                            </td>

                                                            <td>
                                                                {loan.lender_name}
                                                            </td>

                                                            <td>
                                                                ৳{" "}
                                                                {Number(
                                                                    loan.loan_amount || 0
                                                                ).toFixed(2)}
                                                            </td>

                                                            <td>
                                                                {Number(
                                                                    loan.interest_rate || 0
                                                                ).toFixed(2)}
                                                                %
                                                            </td>

                                                            <td>
                                                                ৳{" "}
                                                                {Number(
                                                                    loan.emi_amount || 0
                                                                ).toFixed(2)}
                                                            </td>

                                                            <td>
                                                                {loan.start_date
                                                                    ? loan.start_date.substring(0, 10)
                                                                    : ""}
                                                            </td>

                                                            <td>
                                                                {loan.end_date
                                                                    ? loan.end_date.substring(0, 10)
                                                                    : ""}
                                                            </td>

                                                            <td>
                                                                {loan.purpose}
                                                            </td>

                                                            <td>
                                                                <span
                                                                    className={`badge ${loan.status === "completed"
                                                                        ? "bg-success"
                                                                        : "bg-warning text-dark"
                                                                        }`}
                                                                >
                                                                    {loan.status || "active"}
                                                                </span>
                                                            </td>

                                                            <td>
                                                                <Link
                                                                    to={`/loans/edit/${loan.id}`}
                                                                    className="btn btn-sm btn-warning me-2 mb-1"
                                                                >
                                                                    Edit
                                                                </Link>

                                                                <button
                                                                    onClick={() =>
                                                                        handleDelete(loan.id)
                                                                    }
                                                                    className="btn btn-sm btn-danger mb-1"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td
                                                            colSpan="11"
                                                            className="text-center"
                                                        >
                                                            No loans found
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Loans;
