import { useState, useEffect } from "react";
import Layout from "../Layout.jsx";
import axios from "../../../Lib/axios.js";

function Reports() {
  const [report, setReport] = useState({
    total_income: 0,
    total_expense: 0,
    balance: 0,
    current_month_expense: 0,
    previous_month_expense: 0,
  });

  const [loading, setLoading] = useState(true);

  async function fetchReport() {
    try {
      const response = await axios.get("reports/summary.php");

      console.log("Report response:", response.data);

      if (response.data.status !== false) {
        setReport({
          total_income: Number(response.data.data?.total_income ?? 0),
          total_expense: Number(response.data.data?.total_expense ?? 0),
          balance: Number(response.data.data?.balance ?? 0),
          current_month_expense: Number(
            response.data.data?.current_month_expense ?? 0
          ),
          previous_month_expense: Number(
            response.data.data?.previous_month_expense ?? 0
          ),
        });
      }
    } catch (error) {
      console.error("Fetch report error:", error);
      alert("Report data load kora jayni.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReport();
  }, []);

  const formatAmount = (amount) => {
    return Number(amount).toLocaleString("en-BD", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <Layout>
      <div className="container">
        <div className="page-inner">

          {/* Page Header */}
          <div className="page-header">
            <h3 className="fw-bold mb-2">Reports</h3>
            <p className="text-muted">
              Analyze your income, expenses and monthly spending.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <p>Loading report...</p>
            </div>
          ) : (
            <>
              {/* Summary Cards */}
              <div className="row">

                <div className="col-md-4 mb-3">
                  <div className="card card-round">
                    <div className="card-body">
                      <p className="text-muted mb-2">
                        Total Income
                      </p>
                      <h3 className="fw-bold text-success">
                        ৳{formatAmount(report.total_income)}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="card card-round">
                    <div className="card-body">
                      <p className="text-muted mb-2">
                        Total Expense
                      </p>
                      <h3 className="fw-bold text-danger">
                        ৳{formatAmount(report.total_expense)}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="card card-round">
                    <div className="card-body">
                      <p className="text-muted mb-2">
                        Balance
                      </p>
                      <h3 className="fw-bold text-primary">
                        ৳{formatAmount(report.balance)}
                      </h3>
                    </div>
                  </div>
                </div>

              </div>

              {/* Income vs Expense */}
              <div className="card card-round mt-3">
                <div className="card-header">
                  <h4 className="card-title">
                    Income vs Expense
                  </h4>
                </div>

                <div className="card-body">
                  <div className="row text-center">

                    <div className="col-md-6 mb-3">
                      <div className="border rounded p-4">
                        <i className="bi bi-graph-up-arrow fs-2 text-success"></i>
                        <h5 className="mt-3">
                          Total Income
                        </h5>
                        <h4 className="text-success">
                          ৳{formatAmount(report.total_income)}
                        </h4>
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <div className="border rounded p-4">
                        <i className="bi bi-graph-down-arrow fs-2 text-danger"></i>
                        <h5 className="mt-3">
                          Total Expense
                        </h5>
                        <h4 className="text-danger">
                          ৳{formatAmount(report.total_expense)}
                        </h4>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Monthly Comparison */}
              <div className="card card-round mt-4">
                <div className="card-header">
                  <h4 className="card-title">
                    Monthly Comparison
                  </h4>
                </div>

                <div className="card-body">

                  <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                    <span>Current Month Expense</span>
                    <strong className="text-danger">
                      ৳{formatAmount(
                        report.current_month_expense
                      )}
                    </strong>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <span>Previous Month Expense</span>
                    <strong className="text-primary">
                      ৳{formatAmount(
                        report.previous_month_expense
                      )}
                    </strong>
                  </div>

                  <p className="text-muted small mt-4 mb-0">
                    Compare your spending between the current
                    month and the previous month.
                  </p>

                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </Layout>
  );
}

export default Reports;