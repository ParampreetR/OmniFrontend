import axios from "axios";
import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  function registerUser() {
    axios
      .post("http://localhost:8080/register", {
        username: username,
        password: password,
        name: name,
      })
      .then((res) => {
        if (res.status == 200) {
          window.location.href = "/login";
          // Route to home
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex flex-col items-center  justify-center h-[70vh]">
      <div className="shadow flex flex-col  justify-center px-10 py-5 rounded-xl">
        <label className="text-sm">name</label>
        <input
          className="outline-none border-2 px-2 py-1 rounded"
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="mt-6 text-sm">username</label>
        <input
          className="outline-none border-2 px-2 py-1 rounded"
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="mt-6 text-sm">password</label>
        <input
          className="outline-none border-2 px-2 py-1 rounded"
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={(e) => registerUser()}
          className="mt-10  rounded bg-black text-white py-2"
        >
          Register
        </button>
      </div>
    </div>
  );
}
