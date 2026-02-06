import { useState, useEffect, useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import { Routes, Route } from "react-router";
import SignInForm from "./components/SignInForm/SignInForm";
import HomePage from "./components/HomePage/HomePage";
import Dashboard from "./components/Dashboard/Dashboard";
import { UserContext } from "./contexts/UserContext";
import HootList from "./components/HootList/HootList"
import * as hootService from './services/hootService';
import HootDetails from './components/HootDetails/HootDetails';


function App() {
  const { user } = useContext(UserContext)
  const [hoots, setHoots] = useState([]);

  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();

      setHoots(hootsData)
    };
    if (user) fetchAllHoots();
  }, [user]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <HomePage />} />
        {user ? (
          <>
            {/* Protected routes (available only to signed-in users) */}
            <Route path='/hoots' element={<HootList hoots={hoots} />} />
            <Route
              path='/hoots/:hootId'
              element={<HootDetails />} />
          </>
        ) : (
          <>
            {/* Non-user routes (available only to guests) */}
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
