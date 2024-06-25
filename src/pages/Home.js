import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [postData, setPostData] = useState([]);
  const [tempPost, setTempPost] = useState(null);
  const [reload, doReload] = useState(false);
  const [edit, setEdit] = useState(null);
  const [image, setImage] = useState(null);

  function deletePost(id) {
    axios.delete("http://localhost:8080/post/" + id).then((res) => {
      doReload(!reload);
    });
  }

  function addPost() {
    let form = new FormData();
    form.append("title", tempPost.title);
    form.append("description", tempPost.description);
    form.append("file", tempPost.image);

    axios
      .post("http://localhost:8080/post", form, {
        crossDomain: true,
      })
      .then((res) => {
        setTempPost(null);
        doReload(!reload);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function editPost(title, description, id) {
    console.log(description);
    axios
      .post(
        "http://localhost:8080/editPost",
        {
          title: title,
          description: description,
          id: id,
        },
        {
          crossDomain: true,
          withCredentials: true,
        }
      )
      .then((res) => {
        setEdit(null);
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    axios
      .get(
        "http://localhost:8080/isLoggedIn",
        {
          withCredentials: true,
        },
        (res) => {
          alert(res.status);
          if (res.status != 200) {
            window.location.href = "/login";
          }
        }
      )
      .catch((err) => {
        window.location.href = "/login";
      });

    axios
      .get("http://localhost:8080/posts")
      .then((res) => {
        setPostData(res.data);

        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);

  return (
    <div className="flex flex-col items-center justify-start pt-10">
      {tempPost ? (
        <div className="flex flex-row border-2 rounded-xl my-5 overflow-hidden">
          <div className="w-80 h-fit overflow-hidden flex items-center justify-center">
            <input
              type="file"
              onChange={(e) => {
                console.log(e.target.files[0]);
                setTempPost({ ...tempPost, image: e.target.files[0] });
              }}
            />
          </div>
          <div className="w-80 pl-5 flex flex-col justify-between gap-2">
            <div>
              <input
                type="text"
                placeholder="title"
                className=" outline-none text-lg font-semibold"
                onChange={(e) =>
                  setTempPost({ ...tempPost, title: e.target.value })
                }
                value={tempPost.title}
              />

              <textarea
                className=" outline-none resize-none min-h-20"
                placeholder="description"
                onChange={(e) =>
                  setTempPost({ ...tempPost, description: e.target.value })
                }
                value={tempPost.description}
              />
            </div>

            <div className="flex flex-row justify-evenly mb-2">
              <button
                className="px-2 py-1 font-semibold"
                onClick={(e) => addPost()}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => {
            setTempPost({
              title: "",
              description: "",
            });
          }}
          className="px-5 py-2 border-2 rounded-xl"
        >
          Add Post
        </button>
      )}
      {postData.map((val, index) => {
        if (edit == index) {
          return (
            <div className="flex flex-row border-2 rounded-xl my-5 overflow-hidden">
              <div className="w-80 h-fit overflow-hidden flex items-center justify-center">
                {val.image ? (
                  <img
                    src={"http://localhost:8080/getImage/" + val.image}
                    className="w-80"
                  />
                ) : (
                  <div>No Image</div>
                )}
              </div>
              <div className="w-80 pl-5 flex flex-col justify-between">
                <div>
                  <input
                    type="text"
                    className="outline-none text-lg font-semibold"
                    value={val.title}
                    onChange={(e) => {
                      setPostData((prev) => {
                        let newData = prev.slice();
                        newData[index].title = e.target.value;
                        return newData;
                      });
                    }}
                  />
                  <textarea
                    className="resize-none outline-none min-h-20 w-full"
                    value={val.description}
                    onChange={(e) => {
                      setPostData((prev) => {
                        let newData = prev.slice();
                        newData[index].description = e.target.value;
                        return newData;
                      });
                    }}
                  />
                </div>

                <div className="flex flex-row justify-evenly mb-2">
                  <button
                    onClick={(e) => {
                      editPost(val.title, val.description, val.id);
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="flex flex-row border-2 rounded-xl my-5 overflow-hidden">
            <div className="w-80 h-fit overflow-hidden flex items-center justify-center">
              {val.image ? (
                <img
                  src={"http://localhost:8080/getImage/" + val.image}
                  className="w-80"
                />
              ) : (
                <div>No Image</div>
              )}
            </div>
            <div className="w-80 pl-5 flex flex-col justify-between">
              <div>
                <div className="text-lg font-semibold">{val.title}</div>
                <div className="min-h-20">{val.description}</div>
              </div>

              <div className="flex flex-row justify-evenly mb-2">
                <button
                  className="px-2 py-1 font-semibold"
                  onClick={() => setEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 font-semibold"
                  onClick={() => deletePost(val.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
