import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useRoutes,
  Switch,
} from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        {/* <Home /> */}
        <Route path="/register" element={<Register />}/>
      </Routes>
    </BrowserRouter>
  );
}

const Home = () =>
  useRoutes([
    { path: "/", element: <Login /> },
    { path: "/auth", element: <Login /> },
  ]);

export default App;
