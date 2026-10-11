import { BrowserRouter, Routes, Route } from "react-router";
import { useState } from "react";


import DashboardPage from "./components/pages/DashboardPage.jsx";
import Transactions from "./components/pages/Transactions/Index.jsx";
import TransactionCreate from "./components/pages/Transactions/Create.jsx";
import TransactionEdit from "./components/pages/Transactions/Edit.jsx";
import Budget from "./components/pages/Budget.jsx";
import SavingsGoals from "./components/pages/SavingsGoals.jsx";
import Bills from "./components/pages/Bills.jsx";
import Reports from "./components/pages/Reports.jsx";
import Settings from "./components/pages/Settings.jsx";
import Login from "./components/pages/Login.jsx";
import Register from "./components/pages/Register.jsx";
import Protected from './Auth/Protected.jsx';
import Logout from './Auth/Logout.jsx';

function App() {

  const [isSignedIn, setIsSignedIn] = useState(() => {
    /* if you want, user will be logged in until they logout*/
    //return localStorage.getItem("access_token") || false;
    /* if you want, user will be logged when they close the browser*/
    return sessionStorage.getItem("access_token") || false;
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

          <Route path="transactions">
            <Route index element={<Transactions />} />
            <Route path="create" element={<TransactionCreate />} />
            <Route path="edit/:id" element={<TransactionEdit />} />
          </Route>

          <Route path="/budget" element={<Budget />} />
          <Route path="/savings" element={<SavingsGoals />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>



    </BrowserRouter>
  );
}

export default App;