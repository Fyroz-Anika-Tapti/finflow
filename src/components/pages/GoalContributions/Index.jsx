
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../Layout.jsx";
import axios from "../../../Lib/axios.js";

function GoalContributions() {
    const { id } = useParams();
    const [contributions, setContributions] = useState([]);

    const fetchContributions = async () => {
        try {
            const res = await axios.get("savingsgoals/single_detail.php?id=" + id, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            console.log("Contributions:", res.data);

            if (res.data.status === true) {
                setContributions(res.data.data || []);
            } else if (Array.isArray(res.data)) {
                setContributions(res.data);
            } else {
                setContributions(res.data.data || []);
            }
        } catch (error) {
            console.log("Fetch contributions error:", error);
            console.log("Error Response:", error.response?.data);
        }
    };


    useEffect(() => {
        fetchContributions();
    }, []);


    return (
        <Layout>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3>Goal Contributions</h3>

                    <Link
                        to="/savings"
                        className="btn btn-primary"
                    >
                        Back
                    </Link>
                </div>

                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Save Amount</th>
                                <th>withdraw Amount</th>
                                <th>Balance</th>
                            </tr>
                        </thead>

                        <tbody>
                            {contributions.length > 0 ? (
                                contributions.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.transaction_date}</td>
                                        <td>{item.dr}</td>
                                        <td>{item.cr}</td>
                                        <td>{item.dr - item.cr}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        No contributions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}

export default GoalContributions;
