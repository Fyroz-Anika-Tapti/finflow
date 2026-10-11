
import Layout from "./Layout.jsx";
function Reports() {
  return (
    <Layout>


      {/* Page Title */}
      <div className="title-group mb-3">
        <h1 className="h2 mb-0">Reports</h1>
        <small className="text-muted">
          Analyze your income, expenses and budget
        </small>
      </div>

      {/* Summary */}
      <div className="row my-4">

        <div className="col-md-4 mb-3">
          <div className="custom-block custom-block-balance">
            <small>Total Income</small>
            <h3 className="mt-2">$0.00</h3>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="custom-block custom-block-balance">
            <small>Total Expense</small>
            <h3 className="mt-2">$0.00</h3>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="custom-block custom-block-balance">
            <small>Balance</small>
            <h3 className="mt-2">$0.00</h3>
          </div>
        </div>

      </div>

      {/* Income vs Expense */}
      <div className="custom-block bg-white mb-4">
        <h5 className="mb-4">Income vs Expense</h5>

        <div id="income-expense-chart">
          <div className="text-center py-5">
            <i className="bi-bar-chart fs-1"></i>
            <p className="text-muted mt-2">
              Income and expense chart will appear here.
            </p>
          </div>
        </div>
      </div>

      {/* Category Spending */}
      <div className="custom-block bg-white mb-4">
        <h5 className="mb-4">Category Spending</h5>

        <div className="text-center py-5">
          <i className="bi-pie-chart fs-1"></i>
          <p className="text-muted mt-2">
            Category-wise spending analysis will appear here.
          </p>
        </div>
      </div>

      {/* Monthly Comparison */}
      <div className="custom-block custom-block-transations">
        <h5 className="mb-4">Monthly Comparison</h5>

        <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
          <span>Current Month</span>
          <strong>$0.00</strong>
        </div>

        <div className="d-flex justify-content-between">
          <span>Previous Month</span>
          <strong>$0.00</strong>
        </div>

        <div className="text-center mt-4">
          <small className="text-muted">
            Monthly spending comparison will be calculated from your
            transactions.
          </small>
        </div>
      </div>


    </Layout>
  );
}

export default Reports;