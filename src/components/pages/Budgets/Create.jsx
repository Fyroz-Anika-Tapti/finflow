
import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../Layout.jsx";
import axios from "../../../Lib/axios.js";

function BudgetsCreate() {
    let { id } = useParams();

    const [formData, setFormData] = useState({
        user_id: "1",
        budget_month: "",
        amount: "",
    });

    async function fetchBudget() {
        try {
            const response = await axios.get(`budgets/single.php?id=${id} `);

            console.log("Budget response:", response.data);

            const budget =
                response.data.data?.[0] ?? response.data.data;

            if (budget) {
                setFormData({
                    user_id: budget.user_id ?? "1",
                    budget_month: budget.budget_month
                        ? budget.budget_month.substring(0, 7)
                        : "",
                    amount: budget.amount ?? "",
                });
            }
        } catch (error) {
            console.error("Fetch budget error:", error);
            alert("Budget data load kora jayni.");
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (id) {
            fetchBudget();
        }
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const data = {
                user_id: formData.user_id,
                budget_month: `${formData.budget_month}-01`,
                amount: formData.amount,
            };

            let res;

            if (id) {
                res = await axios.post(
                    `budgets/update.php?id=${id} `,
                    data
                );
            } else {
                res = await axios.post(
                    `budgets/create.php`,
                    data
                );
            }

            console.log("Save budget response:", res.data);

            if (res.status === 200 && res.data.status !== false) {
                window.location.href = "/budgets";
            } else {
                alert(res.data.message || "Budget didnt save .");
            }
        } catch (error) {
            console.error("Save budget error:", error);
            alert("Budget didnt save.");
        }
    }

    return (
        <Layout>
            <div className="container">
                <div className="page-inner">
                    <div className="page-header">
                        <h3 className="fw-bold mb-3">
                            {id ? "Edit Budget" : "Add New Budget"}
                        </h3>

                        <ul className="breadcrumbs mb-3">
                            <li className="nav-item">
                                <Link to="/budgets">Budgets</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-round">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label>Budget Month</label>
                                            <input
                                                type="month"
                                                name="budget_month"
                                                className="form-control"
                                                value={formData.budget_month}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Total Budget Amount</label>
                                            <input
                                                type="number"
                                                name="amount"
                                                className="form-control"
                                                min="0.01"
                                                step="0.01"
                                                placeholder="Enter total budget"
                                                value={formData.amount}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary mt-3"
                                        >
                                            {id ? "Update" : "Save"}
                                        </button>

                                        <Link
                                            to="/budgets"
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

export default BudgetsCreate;