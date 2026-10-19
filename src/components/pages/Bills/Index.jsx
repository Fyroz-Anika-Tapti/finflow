
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout.jsx";
import axios from "../../../Lib/axios.js";

function Bills() {
  const [bills, setBills] = useState([]);

  async function fetchBills() {
    try {
      const res = await axios.get(
        "bills/index.php"
      );

      console.log("Bills response:", res.data);
      setBills(res.data.data ?? []);
    } catch (error) {
      console.error("Fetch bills error:", error);
    }
  }

  useEffect(() => {
    fetchBills();
  }, []);

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this bill?")) {
      try {
        const res = await axios.delete(
          `bills/delete.php?id=${id}`
        );

        console.log("Delete bill response:", res.data);

        if (
          res.data.status === true ||
          res.data.status === "success" ||
          res.data.success === true
        ) {
          fetchBills();
        } else {
          alert(res.data.message || "Bill didnt delete .");
        }
      } catch (error) {
        console.error("Delete bill error:", error);
        alert("Bill delete error.");
      }
    }
  }

  return (
    <Layout>
      <div className="container">
        <div className="page-inner">
          <div className="page-header">
            <h3 className="fw-bold mb-3">Bills</h3>


          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="card card-round">
                <div className="card-header">
                  <div className="d-flex align-items-center">
                    <h4 className="card-title">Bill List</h4>

                    <Link
                      to="/bills/create"
                      className="btn btn-primary btn-round ms-auto"
                    >
                      <i className="fa fa-plus"></i>
                      &nbsp; Add Bill
                    </Link>
                  </div>
                </div>

                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Bill Name</th>
                          <th>Amount</th>
                          <th>Frequency</th>
                          <th>Next Due Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {bills.length > 0 ? (
                          bills.map((bill) => (
                            <tr key={bill.id}>
                              <td>{bill.id}</td>
                              <td>{bill.title}</td>
                              <td>
                                ৳ {Number(bill.amount || 0).toFixed(2)}
                              </td>
                              <td>
                                {Number(bill.frequency) === 1
                                  ? "Weekly"
                                  : Number(bill.frequency) === 2
                                    ? "Monthly"
                                    : Number(bill.frequency) === 3
                                      ? "Yearly"
                                      : "Unknown"}
                              </td>
                              <td>
                                {bill.next_due_date
                                  ? bill.next_due_date.substring(0, 10)
                                  : ""}
                              </td>
                              <td>
                                <Link
                                  to={`/bills/edit/${bill.id}`}
                                  className="btn btn-sm btn-warning me-2"
                                >
                                  Edit
                                </Link>

                                <button
                                  onClick={() => handleDelete(bill.id)}
                                  className="btn btn-sm btn-danger"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-center">
                              No bills found
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

export default Bills;
