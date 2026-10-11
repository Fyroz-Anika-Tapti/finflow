import React from 'react';
import { Link } from 'react-router';
import Layout from "../Layout.jsx";

function TransactionsCreate() {

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    fetch('http://localhost/finflow_api/transactions/create.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);

        if (data.status) {
          window.location.href = '/transactions';
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <Layout>
      <div className="container">
        <div className="page-inner">

          {/* Page Header */}
          <div className="page-header">
            <h3 className="fw-bold mb-3">Add New Transaction</h3>

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
                <Link to="/transactions">Transactions</Link>
              </li>

              <li className="separator">
                <i className="icon-arrow-right"></i>
              </li>

              <li className="nav-item">
                <a href="#">Add New</a>
              </li>

            </ul>
          </div>

          {/* Card */}
          <div className="row">
            <div className="col-md-12">

              <div className="card card-round">

                <div className="card-body">

                  <form onSubmit={handleSubmit}>

                    <div className="form-group">
                      <label htmlFor="user_id">User ID</label>

                      <input
                        type="number"
                        name="user_id"
                        className="form-control"
                        id="user_id"
                        placeholder="Enter user id"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="Cost_income_head_id">
                        Cost / Income Head ID
                      </label>

                      <input
                        type="number"
                        name="Cost_income_head_id"
                        className="form-control"
                        id="Cost_income_head_id"
                        placeholder="Enter cost/income head id"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="Dr">Debit (Dr)</label>

                      <input
                        type="number"
                        step="0.01"
                        name="Dr"
                        className="form-control"
                        id="Dr"
                        placeholder="Enter debit amount"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="Cr">Credit (Cr)</label>

                      <input
                        type="number"
                        step="0.01"
                        name="Cr"
                        className="form-control"
                        id="Cr"
                        placeholder="Enter credit amount"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="transaction_date">
                        Transaction Date
                      </label>

                      <input
                        type="date"
                        name="transaction_date"
                        className="form-control"
                        id="transaction_date"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary mt-3"
                    >
                      Add Transaction
                    </button>

                  </form>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default TransactionsCreate;