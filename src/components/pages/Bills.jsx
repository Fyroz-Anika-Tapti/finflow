
import Layout from "./Layout.jsx";

function Bills() {
  return (
    <Layout>
      <main className="main-wrapper col-md-9 ms-sm-auto py-4 col-lg-9 px-md-4 border-start">

      {/* Page Title */}
      <div className="title-group mb-3">
        <h1 className="h2 mb-0">Bills</h1>
        <small className="text-muted">
          Manage your recurring bills and expenses
        </small>
      </div>

      {/* Add Bill */}
      <div className="custom-block custom-block-balance my-4">
        <h5 className="mb-4">Add Recurring Bill</h5>

        <div className="row">

          {/* Bill Title */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Bill Name</label>
            <input type="text" className="form-control" placeholder="e.g. Internet Bill" />
          </div>

          {/* Amount */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Amount</label>
            <input type="number" className="form-control" placeholder="Enter amount" />
          </div>

          {/* Frequency */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Frequency</label>
            <select className="form-control">
              <option>Select Frequency</option>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
          </div>

          {/* Next Due Date */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Next Due Date</label>
            <input type="date" className="form-control" />
          </div>

          {/* Button */}
          <div className="col-12">
            <button className="btn custom-btn">
              <i className="bi-plus-circle me-2"></i>
              Add Bill
            </button>
          </div>

        </div>
      </div>

      {/* Bills List */}
      <div className="custom-block custom-block-transations">

        <h5 className="mb-4">Upcoming Bills</h5>

        {/* Internet */}
        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">

          <div className="d-flex align-items-center">
            <div className="profile-image bg-light rounded-circle d-flex align-items-center justify-content-center">
              <i className="bi-receipt"></i>
            </div>

            <div className="ms-3">
              <h6 className="mb-1">Internet Bill</h6>
              <small className="text-muted">
                Monthly • Due soon
              </small>
            </div>
          </div>

          <strong>$0.00</strong>

        </div>

        {/* Empty message */}
        <div className="text-center py-4">
          <i className="bi-calendar-check fs-1"></i>
          <p className="text-muted mt-2">
            Your recurring bills will appear here.
          </p>
        </div>

      </div>

    </main>
    </Layout>
  );
}

export default Bills;