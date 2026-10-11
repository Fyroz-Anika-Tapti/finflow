
import Layout from "./Layout.jsx";
function Budget() {
  return (
    <Layout>


      {/* Page Title */}
      <div className="title-group mb-3">
        <h1 className="h2 mb-0">Budget</h1>
        <small className="text-muted">
          Manage your monthly and category budgets
        </small>
      </div>

      {/* Monthly Budget */}
      <div className="custom-block custom-block-balance my-4">
        <h5 className="mb-4">Monthly Budget</h5>

        <div className="row">

          {/* Month */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Budget Month</label>
            <input type="month" className="form-control" />
          </div>

          {/* Total Budget */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Total Budget</label>
            <input type="number" className="form-control" placeholder="Enter budget amount" />
          </div>

          <div className="col-12">
            <button className="btn custom-btn">
              <i className="bi-plus-circle me-2"></i>
              Create Budget
            </button>
          </div>

        </div>
      </div>

      {/* Budget Overview */}
      <div className="custom-block bg-white">

        <h5 className="mb-4">Budget Overview</h5>

        <div className="row">

          {/* Total Budget */}
          <div className="col-md-4 mb-3">
            <div className="p-3 border rounded">
              <small className="text-muted">Total Budget</small>
              <h4 className="mt-2">$0.00</h4>
            </div>
          </div>

          {/* Spent */}
          <div className="col-md-4 mb-3">
            <div className="p-3 border rounded">
              <small className="text-muted">Total Spent</small>
              <h4 className="mt-2">$0.00</h4>
            </div>
          </div>

          {/* Remaining */}
          <div className="col-md-4 mb-3">
            <div className="p-3 border rounded">
              <small className="text-muted">Remaining</small>
              <h4 className="mt-2">$0.00</h4>
            </div>
          </div>

        </div>

      </div>

      {/* Category Budget */}
      <div className="custom-block custom-block-transations mt-4">

        <h5 className="mb-4">Category Budget</h5>

        {/* Food */}
        <div className="mb-4">

          <div className="d-flex justify-content-between">
            <span>Food</span>
            <span>$0 / $0</span>
          </div>

          <div className="progress mt-2">
            <div className="progress-bar" role="progressbar" style={{ width: "0%" }}></div>
          </div>

        </div>

        {/* Transport */}
        <div className="mb-4">

          <div className="d-flex justify-content-between">
            <span>Transport</span>
            <span>$0 / $0</span>
          </div>

          <div className="progress mt-2">
            <div className="progress-bar" role="progressbar" style={{ width: "0%" }}></div>
          </div>

        </div>

        {/* Bills */}
        <div>

          <div className="d-flex justify-content-between">
            <span>Bills</span>
            <span>$0 / $0</span>
          </div>

          <div className="progress mt-2">
            <div className="progress-bar" role="progressbar" style={{ width: "0%" }}></div>
          </div>

        </div>

      </div>


    </Layout>
  );
}

export default Budget;