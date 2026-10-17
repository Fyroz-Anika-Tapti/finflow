
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../Layout.jsx";
import axios from "../../../Lib/axios.js";

function BillsCreate() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    user_id: localStorage.getItem("user_id") || "",
    title: "",
    amount: "",
    frequency: "2",
    next_due_date: "",
  });

  async function fetchBill() {
    try {
      const response = await axios.get(
        `bills/single.php?id=${id}`
      );

      console.log("Bill response:", response.data);

      const bill =
        response.data.data?.[0] ?? response.data.data;

      if (bill) {
        setFormData({
          user_id: bill.user_id ?? "1",
          title: bill.title ?? "",
          amount: bill.amount ?? "",
          frequency: String(bill.frequency ?? 2),
          next_due_date: bill.next_due_date
            ? bill.next_due_date.substring(0, 10)
            : "",
        });
      }
    } catch (error) {
      console.error("Fetch bill error:", error);
      alert("Bill data didnt load .");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (id) {
      fetchBill();
    }
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = {
        user_id: Number(formData.user_id),
        title: formData.title,
        amount: formData.amount,
        frequency: Number(formData.frequency),
        next_due_date: formData.next_due_date,
      };

      let res;

      if (id) {
        res = await axios.post(
          `bills/update.php?id=${id}`,
          data
        );
      } else {
        res = await axios.post(
          "bills/create.php",
          data
        );
      }

      console.log("Save bill response:", res.data);

      if (
        res.data.status === true ||
        res.data.status === "success" ||
        res.data.success === true
      ) {
        window.location.href = "/bills";
      } else {
        alert(
          res.data.message || "Bill didnt save ."
        );
      }
    } catch (error) {
      console.error("Save bill error:", error);
      alert("Bill didnt save.");
    }
  }

  return (
    <Layout>
      <div className="container">
        <div className="page-inner">
          <div className="page-header">
            <h3 className="fw-bold mb-3">
              {id ? "Edit Bill" : "Add New Bill"}
            </h3>
            <ul className="breadcrumbs mb-3">
              <li className="nav-item">
                <Link to="/bills">Bills</Link>
              </li>
            </ul>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="card card-round">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <label>Bill Name</label>
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Enter bill name"
                        value={formData.title}
                        onChange={handleChange}
                        maxLength="150"
                        required
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label>Amount</label>
                      <input
                        type="number"
                        name="amount"
                        className="form-control"
                        placeholder="Enter amount"
                        min="0.01"
                        step="0.01"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label>Frequency</label>
                      <select
                        name="frequency"
                        className="form-control"
                        value={formData.frequency}
                        onChange={handleChange}
                        required
                      >
                        <option value="1">Weekly</option>
                        <option value="2">Monthly</option>
                        <option value="3">Yearly</option>
                      </select>
                    </div>

                    <div className="form-group mb-3">
                      <label>Next Due Date</label>
                      <input
                        type="date"
                        name="next_due_date"
                        className="form-control"
                        value={formData.next_due_date}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary mt-3"
                    >
                      {id ? "Update Bill" : "Save Bill"}
                    </button>

                    <Link
                      to="/bills"
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

export default BillsCreate;