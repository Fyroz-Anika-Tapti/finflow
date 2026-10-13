
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout.jsx";
import axios from "../../../Lib/axios.js";

function Transactions() {

  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    let res = await axios.get(`transactions/index.php`);
    setTransactions(res.data.data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      let res = await axios.delete(`transactions/delete.php ? id = ${id} `);

      if (res.data.status) {
        fetchTransactions();
      } else {
        alert(res.data.message);
      }
    }
  }

  return (
    <Layout>
      <div className="container">
        <div className="page-inner">

          <div className="page-header">
            <h3 className="fw-bold mb-3">
              Transactions
            </h3>

            <ul className="breadcrumbs mb-3">
              <li className="nav-home">
                <Link to="/">
                  <i className="icon-home"></i>
                </Link>
              </li>

              <li className="separator">
                <i className="icon-arrow-right"></i>
              </li>

              <li className="nav-item">
                <Link to="/transactions">
                  Transactions
                </Link>
              </li>
            </ul>
          </div>

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

                  <div className="table-responsive">
                    <table className="table table-bordered table-striped">

                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Transaction Date</th>
                          <th>Purpose</th>
                          <th>Amount</th>
                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {transactions && transactions.length > 0 ? (
                          transactions.map(transaction => (
                            <tr key={transaction.id}>

                              <td>
                                {transaction.id}
                              </td>

                              <td>
                                {transaction.transaction_date}
                              </td>


                              <td>
                                {transaction.purpose}
                              </td>

                              <td>
                                {transaction.amount}
                              </td>
                              <td>
                                <Link
                                  to={`/transactions/edit/${transaction.id}`}
                                  className="btn btn-sm btn-warning me-2"
                                >
                                  Edit
                                </Link>

                                <button
                                  onClick={() => handleDelete(transaction.id)}
                                  className="btn btn-sm btn-danger"
                                >
                                  Delete
                                </button>

                              </td>

                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center">
                              No transactions found
                            </td>
                          </tr>
                        )}
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
