
import Layout from "./Layout.jsx";
function DashboardPage() {
  return (

    <Layout>
    <main className="main-wrapper col-md-9 ms-sm-auto py-4 col-lg-9 px-md-4 border-start">

      {/* Title */}
      <div className="title-group mb-3">
        <h1 className="h2 mb-0">Dashboard</h1>
        <small className="text-muted">
          Welcome back to FinFlow!
        </small>
      </div>

      <div className="row my-4">

        {/* LEFT SIDE */}
        <div className="col-lg-7 col-12">

          {/* Balance */}
          <div className="custom-block custom-block-balance">

            <small>Current Balance</small>

            <h2 className="mt-2 mb-3">$0.00</h2>

            <div className="custom-block-numbers d-flex align-items-center">
              <span>Fin</span>
              <span>Flow</span>
            </div>

            <div className="d-flex">

              <div>
                <small>Total Income</small>
                <p>$0.00</p>
              </div>

              <div className="ms-auto">
                <small>Total Expense</small>
                <p>$0.00</p>
              </div>

            </div>

          </div>

          {/* History */}
          <div className="custom-block bg-white">

            <h5 className="mb-4">Income & Expense</h5>

            <div id="pie-chart"></div>

          </div>

          {/* Analytics */}
          <div className="custom-block bg-white">

            <h5 className="mb-4">Monthly Overview</h5>

            <div id="chart"></div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-5 col-12">

          {/* Savings */}
          <div className="custom-block custom-block-profile-front custom-block-profile text-center bg-white">

            <div className="custom-block-profile-image-wrap mb-4">
              <i className="bi-piggy-bank fs-1"></i>
            </div>

            <h5>Savings</h5>

            <p className="mb-1"><strong>Saved Amount</strong></p>

            <h3>$0.00</h3>

            <p className="text-muted">Start your savings goal</p>

          </div>

          {/* Quick Actions */}
          <div className="custom-block custom-block-bottom d-flex flex-wrap">

            <div className="custom-block-bottom-item">
              <a href="/transactions" className="d-flex flex-column">
                <i className="custom-block-icon bi-plus-circle"></i>
                <small>Add Transaction</small>
              </a>
            </div>

            <div className="custom-block-bottom-item">
              <a href="/budget" className="d-flex flex-column">
                <i className="custom-block-icon bi-wallet2"></i>
                <small>Budget</small>
              </a>
            </div>

            <div className="custom-block-bottom-item">
              <a href="/savings" className="d-flex flex-column">
                <i className="custom-block-icon bi-piggy-bank"></i>
                <small>Save</small>
              </a>
            </div>

            <div className="custom-block-bottom-item">
              <a href="/bills" className="d-flex flex-column">
                <i className="custom-block-icon bi-receipt"></i>
                <small>Bills</small>
              </a>
            </div>

          </div>

          {/* Recent Transactions */}
          <div className="custom-block custom-block-transations">

            <h5 className="mb-4">Recent Transactions</h5>

            <div className="d-flex flex-wrap align-items-center mb-4">

              <div className="d-flex align-items-center">

                <div className="profile-image bg-light rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi-arrow-down-circle"></i>
                </div>

                <div>
                  <p>No transactions yet</p>

                  <small className="text-muted">Your transactions will appear here</small>
                </div>

              </div>

            </div>

            <div className="border-top pt-4 mt-4 text-center">

              <a className="btn custom-btn" href="/transactions">
                View All Transactions
                <i className="bi-arrow-up-right-circle-fill ms-2"></i>
              </a>

            </div>

          </div>

          {/* Smart Tools */}
          <div className="custom-block primary-bg">

            <h5 className="text-white mb-4">Smart Financial Tools</h5>

            <div className="d-flex flex-column gap-2">

              <a href="#" className="text-white">
                <i className="bi-shield-check me-2"></i>
                Safe-to-Spend
              </a>

              <a href="#" className="text-white">
                <i className="bi-calculator me-2"></i>
                Can I Afford It?
              </a>

              <a href="#" className="text-white">
                <i className="bi-graph-up me-2"></i>
                Spending Forecast
              </a>

            </div>

          </div>

        </div>

      </div>

      {/* Footer */}
      <footer className="site-footer">

        <div className="container">

          <div className="row">

            <div className="col-lg-12 col-12">

              <p className="copyright-text">
                Copyright © FinFlow 2026
              </p>

            </div>

          </div>

        </div>

      </footer>

    </main>
    </Layout>
  );
}

export default DashboardPage;