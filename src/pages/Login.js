import axios from "axios";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  function loginUser() {
    axios
      .post(
        "http://localhost:8080/login",
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status == 200) {
          window.location.href = "/";
          // Route to home
        } else {
          setError("Wrong password or username");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex flex-col items-center  justify-center h-[70vh]">
      <div className="shadow flex flex-col  justify-center px-10 py-5 rounded-xl">
        <label className="text-sm">username</label>
        <input
          className="outline-none border-2 px-2 py-1 rounded-lg"
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="mt-10 text-sm">password</label>
        <input
          className="outline-none border-2 px-2 py-1 rounded-lg"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={(e) => loginUser()}
          className=" mt-10  rounded bg-black text-white py-2"
        >
          Login
        </button>
      </div>
    </div>
  );
}
