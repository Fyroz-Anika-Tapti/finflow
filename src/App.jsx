import { BrowserRouter, Routes, Route } from "react-router";
import { useState } from "react";


import DashboardPage from "./components/pages/DashboardPage.jsx";
import TransactionHead from "./components/pages/Transaction_head/Index.jsx";
import TransactionHeadCreate from "./components/pages/Transaction_head/Create.jsx";

import Transactions from "./components/pages/Transactions/Index.jsx";
import TransactionCreate from "./components/pages/Transactions/Create.jsx";


import Budgets from "./components/pages/Budgets/Index.jsx";
import BudgetsCreate from "./components/pages/Budgets/Create.jsx";


import Savings from "./components/pages/Savings/Index.jsx";
import SavingsCreate from "./components/pages/Savings/Create.jsx";

import GoalContributions from "./components/pages/GoalContributions/Index.jsx";

import IncomeExpense from "./components/pages/IncomeExpense/Index.jsx";

import Bills from "./components/pages/Bills/Index.jsx";
import BillsCreate from "./components/pages/Bills/Create.jsx";

import Loans from "./components/pages/Loans/Index.jsx";
import LoansCreate from "./components/pages/Loans/Create.jsx";
import LoanView from "./components/pages/Loans/View.jsx";


import Reports from "./components/pages/Reports/Index.jsx";
import Settings from "./components/pages/Settings.jsx";
import Login from "./components/pages/Login.jsx";
import Register from "./components/pages/Register.jsx";
import Protected from './Auth/Protected.jsx';
import Logout from './Auth/Logout.jsx';

function App() {

  const [isSignedIn, setIsSignedIn] = useState(() => {
    /* if you want, user will be logged in until they logout*/
    return localStorage.getItem("access_token") || false;
    /* if you want, user will be logged when they close the browser*/
    //return sessionStorage.getItem("access_token") || false;
  });
  return (
    <BrowserRouter>



      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<Protected isSignedIn={isSignedIn} />}>
          <Route index element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="logout" element={<Logout />} />

          <Route path="transaction_head">
            <Route index element={<TransactionHead />} />
            <Route path="create" element={<TransactionHeadCreate />} />
            <Route path="edit/:id" element={<TransactionHeadCreate />} />
          </Route>

          <Route path="transactions">
            <Route index element={<Transactions />} />
            <Route path="create" element={<TransactionCreate />} />
            <Route path="edit/:id" element={<TransactionCreate />} />
          </Route>

          <Route path="budgets">
            <Route index element={<Budgets />} />
            <Route path="create" element={<BudgetsCreate />} />
            <Route path="edit/:id" element={<BudgetsCreate />} />
          </Route>

          <Route path="savings">
            <Route index element={<Savings />} />
            <Route path="create" element={<SavingsCreate />} />
            <Route path="edit/:id" element={<SavingsCreate />} />
            <Route path="view/:id" element={<GoalContributions />} />
          </Route>

          <Route path="income-expense" element={<IncomeExpense />} />


          <Route path="bills">
            <Route index element={<Bills />} />
            <Route path="create" element={<BillsCreate />} />
            <Route path="edit/:id" element={<BillsCreate />} />
          </Route>

          <Route path="loans">
            <Route index element={<Loans />} />
            <Route path="create" element={<LoansCreate />} />
            <Route path="edit/:id" element={<LoansCreate />} />
            <Route path="view/:id" element={<LoanView />} />
          </Route>

          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>



    </BrowserRouter>
  );
}

export default App;