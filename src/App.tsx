import Dashboard from "./features/app/pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import Home from "./features/public/pages/Home";
import LoginPage from "./features/public/pages/LoginPage";


function App() {
  // const isLoggedIn = auth.currentUser;
  return (

    <Routes>
      <Route path="/app" element={<Dashboard />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/app"
      // element={isLoggedIn ? <AppPage /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;