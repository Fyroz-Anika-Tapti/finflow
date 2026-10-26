
import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../Layout.jsx";
import axios from "../../../Lib/axios.js";

function LoanView() {
    const { id } = useParams();
    const [payments, setPayments] = useState([]);
    const [loan, setLoan] = useState({});

    const fetchPayments = useCallback(async () => {
        try {
            const { data } = await axios.get(
                `loans/single_detail.php?id=${id}`
            );

            if (!data.status) {
                throw new Error(data.message || "Loan details could not be loaded.");
            }

            if (!data.data?.loan || !Array.isArray(data.data.payments)) {
                throw new Error("Unexpected loan details response.");
            }

            setLoan(data.data.loan);
            setPayments(data.data.payments);
        } catch (error) {
            console.error("Fetch loan payments error:", error);
            console.error("Error response:", error.response?.data);
        }
    }, [id]);

    useEffect(() => {
        fetchPayments();
    }, [fetchPayments]);

    const balanceReduced = payments.reduce(
        (total, item) => total + Number(item.dr || 0),
        0
    );

    return (
        <Layout>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3>Loan Payment History</h3>

                    <Link to="/loans" className="btn btn-primary">
                        Back
                    </Link>
                </div>

                <div className="card mb-4">
                    <div className="card-body">
                        <h5>{loan.loan_title || "Loan Details"}</h5>

                        <p>
                            Loan Amount: ৳
                            {Number(loan.loan_amount || 0).toFixed(2)}
                        </p>

                        <p>Loan Balance Reduced: ৳{balanceReduced.toFixed(2)}</p>

                        <p>
                            Remaining Amount: ৳
                            {Math.max(
                                0,
                                Number(loan.loan_amount || 0) - balanceReduced
                            ).toFixed(2)}
                        </p>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Transaction ID</th>
                                <th>Debit</th>
                                <th>Credit</th>
                                <th>Purpose</th>
                            </tr>
                        </thead>

                        <tbody>
                            {payments.length > 0 ? (
                                payments.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.transaction_date || "-"}</td>
                                        <td>{item.transaction_id || "-"}</td>
                                        <td>৳{Number(item.dr || 0).toFixed(2)}</td>
                                        <td>৳{Number(item.cr || 0).toFixed(2)}</td>
                                        <td>{item.purpose || "-"}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        No loan transactions found.
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

export default LoanView;
