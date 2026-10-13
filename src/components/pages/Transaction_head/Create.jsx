import React from 'react';

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../Layout.jsx";
import axios from "../../../Lib/axios.js";

function TransactionHeadCreate() {

    let { id } = useParams();
    const [headType, setHeadType] = useState({ cash: 1, bank: 2, income: 3, expense: 4, asset: 5, liability: 6, equity: 7, other: 8 });
    const [formData, setFormData] = useState({
        head_name: "",
        head_type: "",
        parent_id: "",
        status: 1,
    });

    async function fetchHead() {
        const response = await axios.get(`transaction_head/single.php?id=${id}`);
        setFormData(response.data.data[0]);
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [costs, setCosts] = React.useState([]);

    const fetchCosts = async (e) => {
        let res = await axios.get(`transaction_head/index.php`)
        setCosts(id
            ? res.data.data.filter(item => String(item.id) !== String(id))
            : res.data.data);
    }
    React.useEffect(() => {
        fetchCosts();
        if (id) {
            fetchHead();
        }
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        let url = '';
        if (id) {
            url = `transaction_head/update.php?id=${id}`;
        } else {
            url = `transaction_head/create.php`;
        }

        let res = await axios.post(url, formData);
        if (res.status === 200) {
            window.location.href = '/transaction_head';
        }
    }


    return (
        <Layout>
            <div className="container">
                <h2>Add Transaction Head</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Head Name</label>
                        <input
                            type="text"
                            name="head_name"
                            className="form-control"
                            value={formData.head_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Head Type</label>
                        <select
                            name="head_type"
                            className="form-control"
                            value={formData.head_type}
                            onChange={handleChange}
                        >
                            <option value="">Select Head Type</option>

                            {Object.entries(headType).map(([key, value]) => (
                                <option key={value} value={value}>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label>Parent Category</label>
                        <select
                            name="parent_id"
                            className="form-control"
                            value={formData.parent_id}
                            onChange={handleChange}
                        >
                            <option value="">No Parent</option>

                            {costs && costs.map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.head_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label>Status</label>
                        <select
                            name="status"
                            className="form-control"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value={1}>Active</option>
                            <option value={0}>Inactive</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>

                    <Link to="/cost" className="btn btn-secondary">
                        Back
                    </Link>
                </form>
            </div>
        </Layout>
    );
}

export default TransactionHeadCreate;
