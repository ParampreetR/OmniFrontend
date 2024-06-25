import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter,
  createBrowserRouter,
  Link,
  Route,
  Router,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import axios from "axios";
import UserInfoEdit from "./UserInfo";

function App() {
  const [userPrompt, setUserPrompt] = useState(false);

  const [userinfo, setUserinfo] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:8080/getUserInfo", {
        withCredentials: true,
      })
      .then((res) => {
        setUserinfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/isLoggedIn", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <BrowserRouter>
      <div className="App">
        <header className="h-16 shadow flex flex-row gap-5 items-center justify-evenly ">
          <nav className="flex flex-row gap-5">
            <Link className="border-2 rounded px-5 py-2" to={"/login"}>
              Login
            </Link>
            <Link className="border-2 rounded px-5 py-2" to={"/register"}>
              Register
            </Link>
            <Link className="border-2 rounded px-5 py-2" to={"/"}>
              Posts
            </Link>
          </nav>

          {userinfo != null && (
            <div className="rounded-full overflow-hidden h-16 w-16">
              {userinfo.username ? (
                <img
                  src={"http://localhost:8080/getImage/" + userinfo.image}
                  onClick={(e) => {
                    setUserPrompt(!userPrompt);
                  }}
                  className="h-full"
                />
              ) : (
                <div></div>
                // <button
                //   style={{
                //     marginLeft: 40,
                //   }}
                //   onClick={() => {
                //     setUserPrompt(!userPrompt);
                //   }}
                // >
                //   User
                // </button>
              )}
              {userPrompt && (
                <div className="flex flex-col absolute bg-white shadow rounded overflow-hidden">
                  <Link
                    className="px-3 py-2 duration-500 hover:bg-gray-200"
                    to={"/changeInfo"}
                  >
                    Change Info
                  </Link>
                  <button
                    className="px-3 py-2 duration-500 hover:bg-gray-200"
                    onClick={() => {
                      axios
                        .get("http://localhost:8080/logout", {
                          withCredentials: true,
                        })
                        .then((result) => {
                          console.log(result);
                          window.location.reload();
                        });
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/changeInfo" element={<UserInfoEdit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
