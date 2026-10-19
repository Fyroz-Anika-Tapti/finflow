
import { useState } from "react";
import Layout from "../Layout.jsx";

function IncomeExpense() {
    const [income, setIncome] = useState([
        { id: 1, name: "House Rent", checked: false },
        { id: 2, name: "Interest from Bank", checked: false },
        { id: 3, name: "Profit", checked: false },
    ]);

    const [expenses, setExpenses] = useState([
        { id: 1, name: "Grocery", checked: false },
        { id: 2, name: "House Rent", checked: false },
        { id: 3, name: "Internet Bill", checked: false },
    ]);

    const [newIncome, setNewIncome] = useState("");
    const [newExpense, setNewExpense] = useState("");
    const [notes, setNotes] = useState("");

    const addItem = (type) => {
        const name = type === "income" ? newIncome : newExpense;

        if (!name.trim()) {
            alert("Please enter an item name");
            return;
        }

        if (type === "income") {
            setIncome([
                ...income,
                { id: Date.now(), name: name.trim(), checked: false },
            ]);
            setNewIncome("");
        } else {
            setExpenses([
                ...expenses,
                { id: Date.now(), name: name.trim(), checked: false },
            ]);
            setNewExpense("");
        }
    };

    const toggleItem = (type, id) => {
        if (type === "income") {
            setIncome(income.map((item) =>
                item.id === id
                    ? { ...item, checked: !item.checked }
                    : item
            ));
        } else {
            setExpenses(expenses.map((item) =>
                item.id === id
                    ? { ...item, checked: !item.checked }
                    : item
            ));
        }
    };

    const deleteItem = (type, id) => {
        if (type === "income") {
            setIncome(income.filter((item) => item.id !== id));
        } else {
            setExpenses(expenses.filter((item) => item.id !== id));
        }
    };

    return (
        <Layout>
            <main className="container-fluid py-4">
                <h2>Income & Expense Checklist</h2>
                <p className="text-muted">
                    Check your income and expenses easily.
                </p>

                <div className="row g-4 mt-2">
                    {/* INCOME */}
                    <div className="col-md-6">
                        <div className="card shadow-sm h-100">
                            <div className="card-header bg-success text-white">
                                <h5 className="mb-0">Income</h5>
                            </div>

                            <div className="card-body">
                                {income.map((item) => (
                                    <div
                                        key={item.id}
                                        className="d-flex align-items-center
                    justify-content-between border-bottom py-3"
                                    >
                                        <label className="d-flex align-items-center gap-2">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={item.checked}
                                                onChange={() =>
                                                    toggleItem("income", item.id)
                                                }
                                            />
                                            <span>{item.name}</span>
                                        </label>

                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => deleteItem("income", item.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}

                                <div className="input-group mt-4">
                                    <input
                                        className="form-control"
                                        placeholder="Add income item..."
                                        value={newIncome}
                                        onChange={(e) => setNewIncome(e.target.value)}
                                    />
                                    <button
                                        className="btn btn-success"
                                        onClick={() => addItem("income")}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* EXPENSE */}
                    <div className="col-md-6">
                        <div className="card shadow-sm h-100">
                            <div className="card-header bg-danger text-white">
                                <h5 className="mb-0">Expense</h5>
                            </div>

                            <div className="card-body">
                                {expenses.map((item) => (
                                    <div
                                        key={item.id}
                                        className="d-flex align-items-center
                    justify-content-between border-bottom py-3"
                                    >
                                        <label className="d-flex align-items-center gap-2">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={item.checked}
                                                onChange={() =>
                                                    toggleItem("expense", item.id)
                                                }
                                            />
                                            <span>{item.name}</span>
                                        </label>

                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => deleteItem("expense", item.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}

                                <div className="input-group mt-4">
                                    <input
                                        className="form-control"
                                        placeholder="Add expense item..."
                                        value={newExpense}
                                        onChange={(e) => setNewExpense(e.target.value)}
                                    />
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => addItem("expense")}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ADDITIONAL NOTES */}
                    <div className="col-12">
                        <div className="card shadow-sm">
                            <div className="card-header">
                                <h5 className="mb-0">Additional Notes</h5>
                            </div>
                            <div className="card-body">
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    placeholder="Write your additional notes here..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}

export default IncomeExpense;
