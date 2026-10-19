import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-3 d-md-block sidebar collapse"
    >

      <div className="position-sticky py-4 px-3 sidebar-sticky">

        <ul className="nav flex-column h-100">

          {/* Dashboard */}
          <li className="nav-item">
            <Link className="nav-link active" to="/">
              <i className="bi-house-fill me-2"></i>
              Dashboard
            </Link>
          </li>

          {/* Cost*/}
          <li className="nav-item">
            <Link className="nav-link" to="/transaction_head">
              <i className="bi-bullseye me-2"></i>
              Transaction Head
            </Link>
          </li>


          {/* Transactions */}
          <li className="nav-item">
            <Link className="nav-link" to="/transactions">
              <i className="bi-wallet me-2"></i>
              Transactions
            </Link>
          </li>

          {/* Budget */}
          <li className="nav-item">
            <Link className="nav-link" to="/budgets">
              <i className="bi-pie-chart me-2"></i>
              Budget
            </Link>
          </li>

          {/* Savings Goals */}
          <li className="nav-item">
            <Link className="nav-link" to="/savings">
              <i className="bi-bullseye me-2"></i>
              Savings Goals
            </Link>
          </li>
          {/* Income & Expense Checklist */}
          <Link to="/income-expense" className="nav-link">
            <i className="bi bi-check2-square me-2"></i>
            Income & Expense Checklist
          </Link>

          {/* Bills */}
          <li className="nav-item">
            <Link className="nav-link" to="/bills">
              <i className="bi-receipt me-2"></i>
              Bills
            </Link>
          </li>
          {/* Loans */}
          <li className="nav-item">
            <Link className="nav-link" to="/loans">
              <i className="bi-receipt me-2"></i>
              Loans
            </Link>
          </li>

          {/* Reports */}
          <li className="nav-item">
            <Link className="nav-link" to="/reports">
              <i className="bi-bar-chart me-2"></i>
              Reports
            </Link>
          </li>

          {/* Settings */}
          <li className="nav-item">
            <Link className="nav-link" to="/settings">
              <i className="bi-gear me-2"></i>
              Settings
            </Link>
          </li>

          {/* Bottom */}
          <li className="nav-item border-top mt-auto pt-2">
            <Link className="nav-link" to="/logout">
              <i className="bi-box-arrow-left me-2"></i>
              Logout
            </Link>
          </li>

        </ul>

      </div>

    </nav>
  );
}

export default Sidebar;