
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout.jsx";
import axios from "../../../Lib/axios.js";

function SavingsCreate() {
  const navigate = useNavigate();

  const userId = localStorage.getItem("user_id") || "";

  const [goalData, setGoalData] = useState({
    user_id: userId,
    goal_name: "",
    target_amount: "",
    target_date: "",
    status: "1",
  });

  const handleChange = (e) => {
    setGoalData({
      ...goalData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        user_id: Number(goalData.user_id),
        goal_name: goalData.goal_name,
        target_amount: Number(goalData.target_amount),
        target_date: goalData.deadline,
        status: Number(goalData.status),
      };

      const res = await axios.post(
        "savingsgoals/create.php",
        data
      );

      console.log("Savings Goal Response:", res.data);

      if (
        res.data.status === true ||
        res.data.success === true ||
        res.data.status === "success"
      ) {
        alert("Savings goal saved successfully!");
        navigate("/savings");
      } else {
        alert(
          res.data.message ||
          "Goal didnt save ."
        );
      }
    } catch (error) {
      console.log("Savings Goal Error:", error);
      console.log("Error Response:", error.response?.data);

      alert("Savings goal didnt save.");
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <h3 className="mb-4">Create Savings Goal</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">
                  Goal Name
                </label>
                <input
                  type="text"
                  name="goal_name"
                  className="form-control"
                  value={goalData.goal_name}
                  onChange={handleChange}
                  placeholder="Enter goal name"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Target Amount
                </label>
                <input
                  type="number"
                  name="target_amount"
                  className="form-control"
                  value={goalData.target_amount}
                  onChange={handleChange}
                  placeholder="Enter target amount"
                  min="1"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  className="form-control"
                  value={goalData.deadline}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Status
                </label>
                <select
                  name="status"
                  className="form-select"
                  value={goalData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-primary me-2"
              >
                Save Goal
              </button>

              <Link
                to="/savings"
                className="btn btn-secondary"
              >
                Back
              </Link>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SavingsCreate;
