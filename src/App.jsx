import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import { loadUser } from "./redux/actions/user.js";
import { useDispatch, useSelector } from "react-redux";

//components
import Home from "./pages/Home/Home.jsx";
import LoginWrapper from "./pages/LoginWrapper/LoginWrapper.jsx";
import RegisterWrapper from "./pages/RegisterWrapper/RegisterWrapper.jsx";

function App() {
  const { message, error } = useSelector((state) => state.user);
 
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
   
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  

  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginWrapper />} />
        <Route path="/signup" element={<RegisterWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
