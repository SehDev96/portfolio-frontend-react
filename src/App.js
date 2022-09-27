import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        {/* <HomeRoute /> */}
        <Route path="/register" element={<Register />}/>
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

// const HomeRoute = () =>
//   useRoutes([
//     { path: "/", element: <Login /> },
//     { path: "/auth", element: <Login /> },
//   ]);

export default App;
