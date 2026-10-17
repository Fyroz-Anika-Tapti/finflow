
import React from 'react';
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../Layout.jsx";
import axios from "../../../Lib/axios.js";

function TransactionsCreate() {

  let { id } = useParams();

  const [formData, setFormData] = useState({
    transaction_type: "",
    purpose: "",
    transaction_head: "",
    transaction_date: "",
    gross_amount: "",
    group_transctions: [{
      transaction_head: "",
      amount: "",
      note: "",
    }]
  });

  async function fetchTransaction() {
    const response = await axios.get(`transactions/single.php?id=${id}`);
    setFormData(response.data.data[0]);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGroupChange = (e, index, fieldName) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      group_transctions: prevData.group_transctions.map((account, i) =>
        i === index ? { ...account, [fieldName]: value } : account
      ),
    }));
  };

  const [heads, setHeads] = React.useState([]);
  const [transactionAccounts, setTransactionAccounts] = React.useState([]);

  const fetchHeads = async (e) => {
    let res = await axios.get(`transaction_head/select_option.php`);
    setHeads(res.data.data);
  }
  const fetchTransactionAccounts = async (e) => {
    let res = await axios.get(`transaction_head/select_option.php?head_type=1,2`);
    setTransactionAccounts(res.data.data);
  }

  React.useEffect(() => {
    fetchHeads();
    fetchTransactionAccounts();
    if (id) {
      fetchTransaction();
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    let url = '';

    if (id) {
      url = `transactions/update.php?id=${id} `;
    } else {
      url = `transactions/create.php`;
    }

    let res = await axios.post(url, formData);

    if (res.status === 200) {
      window.location.href = '/transactions';
    }
  }

  return (
    <Layout>
      <div className="container">
        <div className="page-inner">

          <div className="page-header">
            <h3 className="fw-bold mb-3">
              {id ? "Edit Transaction" : "Add New Transaction"}
            </h3>

            <ul className="breadcrumbs mb-3">
              <li className="nav-item">
                <Link to="/transactions">Transactions</Link>
              </li>
            </ul>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="card card-round">
                <div className="card-body">

                  <form onSubmit={handleSubmit}>
                    {/* transction type */}
                    <div>
                      <label>Transaction Type </label><br />
                      <label>
                        <input type="radio" name="transaction_type" value="income" checked={formData.transaction_type === "income"} onChange={handleChange} /> Income &nbsp; &nbsp;
                      </label>
                      <label>
                        <input type="radio" name="transaction_type" value="expense" checked={formData.transaction_type === "expense"} onChange={handleChange} /> Expense
                      </label>
                    </div>
                    <div className="form-group">
                      <label>Transaction Date</label>
                      <input
                        type="date"
                        name="transaction_date"
                        className="form-control"
                        value={formData.transaction_date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Purpose</label>
                      <input
                        type="text"
                        name="purpose"
                        className="form-control"
                        value={formData.purpose}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Cost/Income Head</label>
                      <select
                        name="transaction_head"
                        className="form-control"
                        value={formData.transaction_head}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Head</option>
                        {transactionAccounts && transactionAccounts.map((head) => (
                          <option key={head.id} value={head.id}>
                            {head.head_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Head</th>
                          <th>Amount</th>
                          <th>Note</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.group_transctions.map((account, index) => (
                          <tr key={account.id}>
                            <td><select
                              name={`gt[${index}][transaction_head]`}
                              className="form-control"
                              value={account.transaction_head}
                              onChange={(e) => handleGroupChange(e, index, "transaction_head")}
                              required
                            >
                              <option value="">Select Head</option>
                              {heads && heads.map((head) => (
                                <option key={head.id} value={head.id}>
                                  {head.head_name}
                                </option>
                              ))}
                            </select></td>
                            <td><input
                              type="number"
                              step="0.01"
                              name={`gt[${index}][amount]`}
                              className="form-control"
                              value={account.amount}
                              onChange={(e) => handleGroupChange(e, index, "amount")}
                              required
                            /></td>
                            <td><input
                              type="text"
                              name={`gt[${index}][note]`}
                              className="form-control"
                              value={account.note}
                              onChange={(e) => handleGroupChange(e, index, "note")}
                            /></td>
                            <td>

                              {index > 0 && (
                                <button
                                  type="button"
                                  className="btn btn-danger ms-2"
                                  onClick={() => {
                                    setFormData((prevData) => ({
                                      ...prevData,
                                      group_transctions: prevData.group_transctions.filter((_, i) => i !== index),
                                    }));
                                  }}
                                >
                                  Remove
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}

                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="3" className="text-end">
                            Total Amount: {formData.group_transctions.reduce((total, account) => total + parseFloat(account.amount || 0), 0).toFixed(2)}

                            <input type="text" name="gross_amount" value={formData.group_transctions.reduce((total, account) => total + parseFloat(account.amount || 0), 0).toFixed(2)} readOnly hidden />
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-info"
                              onClick={() => {
                                setFormData((prevData) => ({
                                  ...prevData,
                                  group_transctions: [
                                    ...prevData.group_transctions,
                                    { transaction_head: "", amount: "", note: "" },
                                  ],
                                }));
                              }}
                            >
                              Add
                            </button>
                          </td>
                        </tr>
                      </tfoot>
                    </table>




                    <button
                      type="submit"
                      className="btn btn-primary mt-3"
                    >
                      {id ? "Update" : "Save"}
                    </button>

                    <Link
                      to="/transactions"
                      className="btn btn-secondary mt-3 ms-2"
                    >
                      Back
                    </Link>

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
