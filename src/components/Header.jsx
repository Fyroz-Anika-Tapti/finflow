function Header() {
  return (
    <header className="navbar sticky-top flex-md-nowrap">

      <div className="col-md-3 col-lg-3 me-0 px-3 fs-6">
        <a className="navbar-brand" href="/">
          <i className="bi-box"></i>
          FinFlow
        </a>
      </div>

      <button
        className="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <form
        className="custom-form header-form ms-lg-3 ms-md-3 me-lg-auto me-md-auto order-2 order-lg-0 order-md-0"
        action="#"
      >
        <input
          className="form-control"
          name="search"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
      </form>

      <div className="navbar-nav me-lg-2">
        <div className="nav-item text-nowrap d-flex align-items-center">

          {/* Notification */}
          <div className="dropdown ps-3">
            <a
              className="nav-link dropdown-toggle text-center"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi-bell"></i>

              <span className="position-absolute start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                <span className="visually-hidden">
                  New alerts
                </span>
              </span>
            </a>

            <ul className="dropdown-menu dropdown-menu-lg-end notifications-block-wrap bg-white shadow">
              <small>Notifications</small>

              <li className="notifications-block border-bottom pb-2 mb-2">
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="notifications-icon-wrap bg-success">
                    <i className="notifications-icon bi-check-circle-fill"></i>
                  </div>

                  <div>
                    <span>Your account has been created successfully.</span>
                    <p>12 days ago</p>
                  </div>
                </a>
              </li>

              <li className="notifications-block border-bottom pb-2 mb-2">
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="notifications-icon-wrap bg-info">
                    <i className="notifications-icon bi-folder"></i>
                  </div>

                  <div>
                    <span>Please check. We have sent a Daily report.</span>
                    <p>10 days ago</p>
                  </div>
                </a>
              </li>

              <li className="notifications-block">
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <div className="notifications-icon-wrap bg-danger">
                    <i className="notifications-icon bi-question-circle"></i>
                  </div>

                  <div>
                    <span>Account verification failed.</span>
                    <p>1 hour ago</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Profile */}
          <div className="dropdown px-3">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="custom-block-profile-image-wrap">
                <i className="bi-person-circle fs-4"></i>
              </div>
            </a>

            <ul className="dropdown-menu bg-white shadow">
              <li>
                <a className="dropdown-item" href="/settings">
                  <i className="bi-gear me-2"></i>
                  Settings
                </a>
              </li>

              <li>
                <a className="dropdown-item" href="#">
                  <i className="bi-box-arrow-left me-2"></i>
                  Logout
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

    </header>
  );
}

export default Header;