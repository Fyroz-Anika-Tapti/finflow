
import Layout from "./Layout.jsx";
function Settings() {
  return (
    <Layout>
      <main className="main-wrapper col-md-9 ms-sm-auto py-4 col-lg-9 px-md-4 border-start">

      {/* Page Title */}
      <div className="title-group mb-3">
        <h1 className="h2 mb-0">Settings</h1>
        <small className="text-muted">
          Manage your profile and account settings
        </small>
      </div>

      {/* Profile */}
      <div className="custom-block bg-white my-4">
        <h5 className="mb-4">Profile Information</h5>

        <div className="row">

          <div className="col-md-6 mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="col-12">
            <button className="btn custom-btn">
              <i className="bi-check-circle me-2"></i>
              Save Changes
            </button>
          </div>

        </div>
      </div>

      {/* Account */}
      <div className="custom-block custom-block-transations">

        <h5 className="mb-4">Account</h5>

        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
          <div>
            <h6>Change Password</h6>
            <small className="text-muted">
              Update your account password
            </small>
          </div>

          <button className="btn btn-sm custom-btn">
            Change
          </button>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6>Logout</h6>
            <small className="text-muted">
              Sign out from your FinFlow account
            </small>
          </div>

          <button className="btn btn-sm btn-danger">
            Logout
          </button>
        </div>

      </div>

    </main>
    </Layout>
  );
}

export default Settings;