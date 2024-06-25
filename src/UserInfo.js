import axios from "axios";
import { useEffect, useState } from "react";

export default function UserInfoEdit() {
  const [userinfo, setUserinfo] = useState({});
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

  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="flex flex-col">
        <div>
          <input
            type="file"
            onChange={(e) =>
              setUserinfo({ ...userinfo, image: e.target.files[0] })
            }
          />
        </div>

        <label className="mt-4">username</label>
        <input
          className="outline-none border-2 px-2 py-1 rounded-lg"
          type="text"
          value={userinfo.username}
          onChange={(e) =>
            setUserinfo({ ...userinfo, username: e.target.value })
          }
        />

        <label className="mt-4">name</label>
        <input
          className="outline-none border-2 px-2 py-1 rounded-lg"
          type="text"
          value={userinfo.name}
          onChange={(e) => setUserinfo({ ...userinfo, name: e.target.value })}
        />

        <label className="mt-4">password</label>
        <input
          className="outline-none border-2 px-2 py-1 rounded-lg"
          type="text"
          value={userinfo.password}
          onChange={(e) =>
            setUserinfo({ ...userinfo, password: e.target.value })
          }
        />

        <label className="mt-4">address</label>
        <input
          className="outline-none border-2 px-2 py-1 rounded-lg"
          type="text"
          value={userinfo.address}
          onChange={(e) =>
            setUserinfo({ ...userinfo, address: e.target.value })
          }
        />
        <label className="mt-4">phone</label>
        <input
          className="outline-none border-2 px-2 py-1 rounded-lg"
          type="text"
          value={userinfo.phone}
          onChange={(e) => setUserinfo({ ...userinfo, phone: e.target.value })}
        />

        <button
          className="mt-10  rounded bg-black text-white py-2"
          onClick={() => {
            let form = new FormData();

            form.append("username", userinfo.username);
            form.append("user", userinfo.user);
            form.append("password", userinfo.password);
            form.append("phone", userinfo.phone);
            form.append("address", userinfo.address);
            form.append("file", userinfo.image);

            axios
              .post("http://localhost:8080/editUser", form, {
                withCredentials: true,
              })
              .then((res) => {
                console.log(res);
                window.location.href = "/";
              });
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
