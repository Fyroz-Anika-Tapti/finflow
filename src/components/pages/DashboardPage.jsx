
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout.jsx";
import axios from "../../Lib/axios.js";

function DashboardPage() {
  const [dashboard, setDashboard] = useState({
    total_income: 0,
    total_expense: 0,
    balance: 0,
    total_savings: 0,
    total_goals: 0,
    recent_transactions: [],
    monthly_overview: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("dashboard/summary.php");

        if (res.data.status) {
          setDashboard(res.data.data);
        } else {
          setError(res.data.message || "Dashboard data load failed");
        }
      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Dashboard data load failed. Please check the API.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const money = (amount) =>
    Number(amount || 0).toLocaleString("en-BD", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const totalFlow =
    Number(dashboard.total_income) +
    Number(dashboard.total_expense);

  const incomePercent =
    totalFlow > 0
      ? (Number(dashboard.total_income) / totalFlow) * 100
      : 0;

  const expensePercent =
    totalFlow > 0
      ? (Number(dashboard.total_expense) / totalFlow) * 100
      : 0;

  return (
    <Layout>
      <div className="title-group mb-3">
        <h1 className="h2 mb-0">Dashboard</h1>
        <small className="text-muted">
          Welcome back to FinFlow!
        </small>
      </div>

      {loading && (
        <p className="text-muted">Loading dashboard data...</p>
      )}

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      {!loading && !error && (
        <div className="row my-4">
          {/* LEFT SIDE */}
          <div className="col-lg-7 col-12">
            {/* Balance */}

            <div className="card border-0 shadow-sm rounded-3 mb-4">
              <div className="card-body p-4">

                <p className="text-muted mb-2">Current Balance</p>

                <h2 className="fw-bold mb-4">
                  ৳{money(dashboard.balance)}
                </h2>

                <hr className="text-muted" />

                <div className="row mt-3">

                  <div className="col-6">
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-arrow-down-circle text-success me-2 fs-5"></i>
                      <small className="text-muted">Total Income</small>
                    </div>

                    <h5 className="fw-semibold text-success mb-0">
                      ৳{money(dashboard.total_income)}
                    </h5>
                  </div>

                  <div className="col-6 border-start">
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-arrow-up-circle text-danger me-2 fs-5"></i>
                      <small className="text-muted">Total Expense</small>
                    </div>

                    <h5 className="fw-semibold text-danger mb-0">
                      ৳{money(dashboard.total_expense)}
                    </h5>
                  </div>

                </div>
              </div>
            </div>


            {/* Dynamic Income & Expense */}
            <div className="custom-block bg-white">
              <h5 className="mb-4">Income &amp; Expense</h5>

              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>
                    <i className="bi bi-circle-fill text-success me-2"></i>
                    Income
                  </span>
                  <strong>৳{money(dashboard.total_income)}</strong>
                </div>

                <div className="progress mt-2" style={{ height: "10px" }}>
                  <div
                    className="progress-bar bg-success"
                    style={{ width: `${incomePercent}% ` }}
                  />
                </div>
              </div>

              <div>
                <div className="d-flex justify-content-between">
                  <span>
                    <i className="bi bi-circle-fill text-danger me-2"></i>
                    Expense
                  </span>
                  <strong>৳{money(dashboard.total_expense)}</strong>
                </div>

                <div className="progress mt-2" style={{ height: "10px" }}>
                  <div
                    className="progress-bar bg-danger"
                    style={{ width: `${expensePercent}% ` }}
                  />
                </div>
              </div>
            </div>

            {/* Monthly Overview */}
            <div className="custom-block bg-white">
              <h5 className="mb-4">Monthly Overview</h5>

              {dashboard.monthly_overview.length === 0 ? (
                <p className="text-muted">
                  No monthly transaction data available.
                </p>
              ) : (
                dashboard.monthly_overview.map((month) => (
                  <div className="mb-4" key={month.month_key}>
                    <div className="d-flex justify-content-between mb-2">
                      <strong>{month.month_name}</strong>
                      <small className="text-muted">
                        Income ৳{money(month.income)}
                      </small>
                    </div>

                    <div
                      className="progress mb-2"
                      style={{ height: "10px" }}
                    >
                      <div
                        className="progress-bar bg-success"
                        title={`Income: ৳${money(month.income)} `}
                        style={{
                          width:
                            Math.max(
                              month.income,
                              month.expense
                            ) > 0
                              ? `${(month.income /
                                Math.max(
                                  month.income,
                                  month.expense
                                )) *
                              100
                              }% `
                              : "0%",
                        }}
                      />
                    </div>

                    <div
                      className="progress"
                      style={{ height: "10px" }}
                    >
                      <div
                        className="progress-bar bg-danger"
                        title={`Expense: ৳${money(month.expense)} `}
                        style={{
                          width:
                            Math.max(
                              month.income,
                              month.expense
                            ) > 0
                              ? `${(month.expense /
                                Math.max(
                                  month.income,
                                  month.expense
                                )) *
                              100
                              }% `
                              : "0%",
                        }}
                      />
                    </div>

                    <small className="text-muted">
                      Expense: ৳{money(month.expense)}
                    </small>
                  </div>
                ))
              )}

              <small>
                <span className="text-success">■ Income</span>
                {"  "}
                <span className="text-danger">■ Expense</span>
              </small>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-5 col-12">


            {/* Quick Actions */}
            <div className="custom-block custom-block-bottom d-flex flex-wrap">
              <div className="custom-block-bottom-item">
                <Link to="/transactions" className="d-flex flex-column">
                  <i className="custom-block-icon bi bi-plus-circle"></i>
                  <small>Add Transaction</small>
                </Link>
              </div>

              <div className="custom-block-bottom-item">
                <Link to="/budget" className="d-flex flex-column">
                  <i className="custom-block-icon bi bi-wallet2"></i>
                  <small>Budget</small>
                </Link>
              </div>

              <div className="custom-block-bottom-item">
                <Link to="/savings" className="d-flex flex-column">
                  <i className="custom-block-icon bi bi-piggy-bank"></i>
                  <small>Save</small>
                </Link>
              </div>

              <div className="custom-block-bottom-item">
                <Link to="/bills" className="d-flex flex-column">
                  <i className="custom-block-icon bi bi-receipt"></i>
                  <small>Bills</small>
                </Link>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="custom-block custom-block-transations">
              <h5 className="mb-4">Recent Transactions</h5>

              {dashboard.recent_transactions.length === 0 ? (
                <div className="text-center py-3">
                  <i className="bi bi-receipt fs-1 text-muted"></i>
                  <p className="mt-2 mb-1">No transactions yet</p>
                  <small className="text-muted">
                    Your transactions will appear here
                  </small>
                </div>
              ) : (
                dashboard.recent_transactions.map((item) => {
                  const isIncome =
                    String(item.transaction_type).toLowerCase() ===
                    "income";

                  return (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between align-items-center mb-4"
                    >
                      <div className="d-flex align-items-center">
                        <div className="profile-image bg-light rounded-circle d-flex align-items-center justify-content-center me-3">
                          <i
                            className={`bi ${isIncome
                              ? "bi-arrow-down-circle text-success"
                              : "bi-arrow-up-circle text-danger"
                              } `}
                          ></i>
                        </div>

                        <div>
                          <p className="mb-1">
                            {item.purpose || "Transaction"}
                          </p>
                          <small className="text-muted">
                            {item.transaction_date}
                          </small>
                        </div>
                      </div>

                      <strong
                        className={
                          isIncome ? "text-success" : "text-danger"
                        }
                      >
                        {isIncome ? "+" : "-"}৳{money(item.amount)}
                      </strong>
                    </div>
                  );
                })
              )}

              <div className="border-top pt-4 mt-4 text-center">
                <Link to="/transactions" className="btn custom-btn">
                  View All Transactions
                  <i className="bi bi-arrow-up-right-circle-fill ms-2"></i>
                </Link>
              </div>
            </div>

            {/* Smart Tools */}
            <div className="custom-block primary-bg">
              <h5 className="text-white mb-4">
                Smart Financial Tools
              </h5>

              <div className="d-flex flex-column gap-2">
                <Link to="/reports" className="text-white">
                  <i className="bi bi-shield-check me-2"></i>
                  Financial Reports
                </Link>

                <Link to="/reports" className="text-white">
                  <i className="bi bi-calculator me-2"></i>
                  Income &amp; Expense Analysis
                </Link>

                <Link to="/reports" className="text-white">
                  <i className="bi bi-graph-up me-2"></i>
                  Spending Overview
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default DashboardPage;
