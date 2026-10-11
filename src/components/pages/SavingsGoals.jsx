
import Layout from "./Layout.jsx";
function SavingsGoals() {
  return (
    <Layout>
      <main className="main-wrapper col-md-9 ms-sm-auto py-4 col-lg-9 px-md-4 border-start">

      {/* Page Title */}
      <div className="title-group mb-3">
        <h1 className="h2 mb-0">Savings Goals</h1>
        <small className="text-muted">
          Set goals and track your savings progress
        </small>
      </div>

      {/* Create Goal */}
      <div className="custom-block custom-block-balance my-4">
        <h5 className="mb-4">Create Savings Goal</h5>

        <div className="row">

          <div className="col-md-6 mb-3">
            <label className="form-label">Goal Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. New Laptop"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Target Amount</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter target amount"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Deadline</label>
            <input
              type="date"
              className="form-control"
            />
          </div>

          <div className="col-12">
            <button className="btn custom-btn">
              <i className="bi-plus-circle me-2"></i>
              Create Goal
            </button>
          </div>

        </div>
      </div>

      {/* Goals */}
      <div className="custom-block custom-block-transations">

        <h5 className="mb-4">My Savings Goals</h5>

        {/* Goal 1 */}
        <div className="border-bottom pb-4 mb-4">

          <div className="d-flex justify-content-between">
            <div>
              <h6>Emergency Fund</h6>
              <small className="text-muted">
                Target: $0.00
              </small>
            </div>

            <strong>$0.00</strong>
          </div>

          <div className="progress mt-3">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: "0%" }}
            ></div>
          </div>

          <div className="d-flex justify-content-between mt-2">
            <small>0% completed</small>

            <button className="btn btn-sm custom-btn">
              Add Contribution
            </button>
          </div>

        </div>

        {/* Empty message */}
        <div className="text-center py-3">
          <i className="bi-piggy-bank fs-1"></i>
          <p className="text-muted mt-2">
            Create a savings goal to start tracking your progress.
          </p>
        </div>

      </div>

    </main>
    </Layout>
  );
}

export default SavingsGoals