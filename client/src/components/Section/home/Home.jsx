import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home({ profile }) {
  const [todo, setTodo] = useState([]);
  const [todoCount, setTodoCount] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3011/latesttodos", {
        headers: {
          Authorization: "Bearer " + profile.token,
        },
      })
      .then((result) => {
        setTodo(result.data.data);
      });

    axios
      .get("http://localhost:3011/alltodo", {
        headers: {
          Authorization: "Bearer " + profile.token,
        },
      })
      .then((result) => setTodoCount(result.data.Todos));
  }, []);

  return (
    <>
      <div className="home-main px-3 py-2">
        <div className="home-top-box">
          <div
            className="top-todo text-white bg-warning text-center"
            onClick={() => navigate("/all-todo")}
          >
            <h5 className="mt-5">ALL TODO</h5>
            <h4 className="">{todoCount.length}</h4>
          </div>
        </div>
      </div>

      <div className="container mt-1">
        <div className="row mx-lg-2">
          <div className="col-md-12">
            <table className="todotable hometable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {todo.map((list) => (
                  <LatestTodo key={list._id} list={list} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

function LatestTodo({ list }) {
  // Extract only the date portion
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats the date to "MM/DD/YYYY"
  };

  return (
    <tr className="shadow-sm my-1 px-lg-3">
      <td>{list.name}</td>
      <td>{formatDate(list.date)}</td>
      <td>{list.description}</td>
    </tr>
  );
}

export default Home;
