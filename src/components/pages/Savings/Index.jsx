
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout.jsx";
import axios from "../../../Lib/axios.js";

function Savings() {
  const [goals, setGoals] = useState([]);

  const fetchGoals = async () => {
    try {
      const res = await axios.get("savingsgoals/index.php");

      console.log("Savings Goals:", res.data);

      if (res.data.status === true) {
        setGoals(res.data.data || []);
      } else if (Array.isArray(res.data)) {
        setGoals(res.data);
      } else {
        setGoals(res.data.data || []);
      }
    } catch (error) {
      console.log("Fetch savings goals error:", error);
      console.log("Error Response:", error.response?.data);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this goal?")) {
      return;
    }

    try {
      const res = await axios.delete(
        `savingsgoals/delete.php?id=${id}`
      );

      console.log("Delete Response:", res.data);

      if (res.data.status === true && res.data.data > 0) {
        alert("Savings goal deleted successfully!");
        fetchGoals();
      } else {
        alert("Goal delete hoyni.");
      }
    } catch (error) {
      console.log("Delete error:", error);
      alert("Goal delete hoyni.");
    }
  };
  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Savings Goals</h3>

          <Link
            to="/savings/create"
            className="btn btn-primary"
          >
            Add Savings Goal
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Goal Name</th>
                <th>Target Amount</th>
                <th>Achieved Amount</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {goals.length > 0 ? (
                goals.map((goal) => (
                  <tr key={goal.id}>
                    <td>{goal.id}</td>
                    <td>{goal.goal_name}</td>
                    <td>
                      {goal.target_amount}
                    </td>
                    <td>
                      {goal.achieved}
                    </td>
                    <td>{goal.deadline}</td>
                    <td>
                      {Number(goal.status) === 1
                        ? "Active"
                        : "Inactive"}
                    </td>
                    <td>
                      <Link
                        to={`/savings/view/${goal.id} `}
                        className="btn btn-sm btn-warning me-2"
                      >
                        View
                      </Link>
                      <Link
                        to={`/savings/edit/${goal.id} `}
                        className="btn btn-sm btn-warning me-2"
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                          handleDelete(goal.id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center"
                  >
                    No savings goals found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default Savings;
