import React from "react";
import "./AllTodo.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function TodoList({ list, token }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    axios
      .delete("http://localhost:3011/delete/" + list._id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        navigate("/all-todo");
        toast.success("Todo Deleted");
      });
  };

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); 
  };

  return (
    <div className="todolist">
      <div className="todocard shadow-lg">
        <div
          className="tododata"
          onClick={() => navigate("/todo-detail/" + list._id)}
        >
          <div className="listdata">
            <div className="text-uppercase">{list.name}</div>
            <div>{formatDate(list.date)}</div> 
            <div>{list.description}</div>
          </div>
        </div>

        <div className="listbuttons">
          <button className="btn text-danger" onClick={handleDelete}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
