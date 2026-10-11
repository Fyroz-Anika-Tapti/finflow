import React from 'react';
import { Link } from 'react-router';
import Layout from "../Layout.jsx";

function Transactions() {

  const [transactions, setTransactions] = React.useState([]);

  function fetchTransactions() {

    fetch('http://localhost/finflow_api/transactions/index.php')
      .then(response => response.json())
      .then(data => setTransactions(data.data))
      .catch(error =>
        console.error('Error fetching transactions:', error)
      );

  }

  React.useEffect(() => {
    fetchTransactions();
  }, []);

  function handleDelete(id) {

    if (window.confirm("Are you sure you want to delete this transaction?")) {

      fetch(
        `http://localhost/finflow_api/transactions/delete.php?id=${id}`,
        {
          method: 'DELETE'
        }
      )
        .then(response => response.json())
        .then(data => {

          if (data.status) {
            fetchTransactions();
          }

        })
        .catch(error =>
          console.error('Error deleting transaction:', error)
        );

    }
  }

  return (
    <Layout>
      <div className="container">

        <div className="page-inner">

          {/* Page Header */}
          <div className="page-header">

            <h3 className="fw-bold mb-3">
              Transactions
            </h3>

            <ul className="breadcrumbs mb-3">

              <li className="nav-home">
                <a href="#">
                  <i className="icon-home"></i>
                </a>
              </li>

              <li className="separator">
                <i className="icon-arrow-right"></i>
              </li>

              <li className="nav-item">
                <a href="#">Transactions</a>
              </li>

            </ul>

          </div>

          {/* Table Card */}
          <div className="row">

            <div className="col-md-12">

              <div className="card card-round">

                <div className="card-header">

                  <div className="d-flex align-items-center">

                    <h4 className="card-title">
                      Transactions
                    </h4>

                    <Link
                      to="/transactions/create"
                      className="btn btn-primary btn-round ms-auto"
                    >
                      <i className="fa fa-plus"></i>
                      &nbsp; Add Transaction
                    </Link>

                  </div>

                </div>

                <div className="card-body">

                  {/* Search */}
                  <div className="row mb-3">

                    <div className="col-md-4">

                      <div className="input-icon">

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search transaction..."
                        />

                        <span className="input-icon-addon">
                          <i className="fa fa-search"></i>
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Table */}
                  <div className="table-responsive">

                    <table className="table table-hover">

                      <thead>

                        <tr>
                          <th>#</th>
                          <th>User ID</th>
                          <th>Head ID</th>
                          <th>Dr</th>
                          <th>Cr</th>
                          <th>Transaction Date</th>
                          <th>Action</th>
                        </tr>

                      </thead>

                      <tbody>

                        {transactions.map((transaction, index) => (

                          <tr key={transaction.id}>

                            <td>
                              {index + 1}
                            </td>

                            <td>
                              {transaction.user_id}
                            </td>

                            <td>
                              {transaction.Cost_income_head_id}
                            </td>

                            <td>
                              {transaction.Dr}
                            </td>

                            <td>
                              {transaction.Cr}
                            </td>

                            <td>
                              {transaction.transaction_date}
                            </td>

                            <td>
                              <div className="form-button-action">

                                <Link
                                  to={`/transactions/edit/${transaction.id}`}
                                  className="btn btn-link btn-primary"
                                  title="Edit"
                                >
                                  <i className="bi bi-pencil-square"></i>
                                </Link>

                                <button
                                  className="btn btn-link btn-danger"
                                  title="Delete"
                                  onClick={() => handleDelete(transaction.id)}
                                >
                                  <i className="bi bi-trash"></i>
                                </button>

                              </div>
                            </td>

                          </tr>

                        ))}

                      </tbody>

                    </table>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default Transactions;