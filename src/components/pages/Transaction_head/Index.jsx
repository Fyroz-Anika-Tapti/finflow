
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout.jsx";
import axios from "../../../Lib/axios.js";
function TransactionHead() {
    const [costs, setCosts] = useState([]);
    const [headType, setHeadType] = useState({ cash: 1, bank: 2, income: 3, expense: 4, asset: 5, liability: 6, equity: 7, other: 8 });

    const fetchCosts = async (e) => {
        let res = await axios.get(`transaction_head/index.php`)
        setCosts(res.data.data);
    }
    useEffect(() => {
        fetchCosts();
    }, []);

    async function handleDelete(id) {
        if (window.confirm("Are you sure you want to delete this transaction?")) {
            let res = await axios.delete(`transaction_head/delete.php?id=${id}`)
            if (res.data.status) {
                fetchCosts();
            } else {
                alert(res.data.message);
            }
        }
    }

    return (
        <Layout>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Transaction Head</h2>

                    <Link to="/transaction_head/create" className="btn btn-primary">
                        Add New
                    </Link>
                </div>

                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Head Name</th>
                            <th>Head Type</th>
                            <th>Parent Head</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {costs && costs.length > 0 ? (
                            costs.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.head_name}</td>
                                    <td>{Object.entries(headType).find(([, value]) => Number(value) === Number(item.head_type))?.[0] || item.head_type}</td>
                                    <td>{item.parent_head || "None"}</td>
                                    <td>
                                        {Number(item.status) === 1
                                            ? "Active"
                                            : "Inactive"}
                                    </td>
                                    <td>
                                        <Link
                                            to={`/transaction_head/edit/${item.id}`}
                                            className="btn btn-sm btn-warning me-2"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="btn btn-sm btn-danger"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No categories found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export default TransactionHead;
