
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout.jsx";
import axios from "../../../Lib/axios.js";

function Budgets() {
    const [budgets, setBudgets] = useState([]);

    const fetchBudgets = async () => {
        try {
            const res = await axios.get("budgets/index.php");

            console.log("Budgets response:", res.data);

            if (Array.isArray(res.data.data)) {
                setBudgets(res.data.data);
            } else {
                setBudgets([]);
            }
        } catch (error) {
            console.error("Fetch budgets error:", error);
            alert("Budget list .");
        }
    };

    useEffect(() => {
        fetchBudgets();
    }, []);


    async function handleDelete(id) {
        if (!window.confirm("Are you sure you want to delete this budget?")) {
            return;
        }

        try {
            const res = await axios.delete(
                `budgets/delete.php?id=${id}`
            );

            console.log("Delete budget response:", res.data);

            if (
                res.data.status === true &&
                res.data.data !== 0
            ) {
                alert("Budget deleted successfully.");
                fetchBudgets();
            } else {
                alert(res.data.message || "Budget delete failed.");
            }
        } catch (error) {
            console.error("Delete budget error:", error);
            console.error("API error response:", error.response?.data);
            alert("Budget delete failed.");
        }
    }

    return (
        <Layout>
            <div className="container">
                <div className="page-inner">
                    <div className="page-header">
                        <h3 className="fw-bold mb-3">Budgets</h3>

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
                                <Link to="/budgets">Budgets</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-round">
                                <div className="card-header">
                                    <div className="d-flex align-items-center">
                                        <h4 className="card-title">
                                            Budget List
                                        </h4>

                                        <Link
                                            to="/budgets/create"
                                            className="btn btn-primary btn-round ms-auto"
                                        >
                                            <i className="fa fa-plus"></i>
                                            &nbsp; Add Budget
                                        </Link>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Budget Month</th>
                                                    <th>Total Budget Amount</th>
                                                    <th>income</th>
                                                    <th>Cost</th>
                                                    <th>Balance</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {budgets.length > 0 ? (
                                                    budgets.map((budget) => (
                                                        <tr key={budget.id}>
                                                            <td>{budget.id}</td>

                                                            <td>
                                                                {budget.budget_month
                                                                    ? budget.budget_month.substring(0, 7)
                                                                    : ""}
                                                            </td>

                                                            <td>
                                                                ৳{" "}
                                                                {Number(
                                                                    budget.amount || 0
                                                                ).toFixed(2)}
                                                            </td>
                                                            <td>
                                                                ৳{" "}
                                                                {Number(
                                                                    budget.dr || 0
                                                                ).toFixed(2)}
                                                            </td>
                                                            <td>
                                                                ৳{" "}
                                                                {Number(
                                                                    budget.cr || 0
                                                                ).toFixed(2)}
                                                            </td>
                                                            <td>
                                                                ৳{" "}
                                                                {Number(
                                                                    (budget.dr - budget.cr) || 0
                                                                ).toFixed(2)}
                                                            </td>

                                                            <td>
                                                                <Link
                                                                    to={`/budgets/edit/ ${budget.id} `}
                                                                    className="btn btn-sm btn-warning me-2"
                                                                >
                                                                    Edit
                                                                </Link>

                                                                <button
                                                                    onClick={() =>
                                                                        handleDelete(budget.id)
                                                                    }
                                                                    className="btn btn-sm btn-danger"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td
                                                            colSpan="4"
                                                            className="text-center"
                                                        >
                                                            No budgets found
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

export default Budgets;
