import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./TodoDetails.css";
import { toast } from "react-toastify";

function TodoDetails({ profile }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const getDetail = () => {
      axios
        .get("http://localhost:3011/tododetail/" + params.id, {
          headers: {
            Authorization: "Bearer " + profile.token,
          },
        })
        .then((result) => {
          setData(result.data.Todo);
        });
    };

    getDetail();
  }, []);

  const handleDelete = () => {
    axios
      .delete("http://localhost:3011/delete/" + params.id, {
        headers: {
          Authorization: "Bearer " + profile.token,
        },
      })
      .then((result) => {
        toast.success(result.data.msg);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); 
  };


  return (
    <div className="todoDetail">
      <div
        className="myDetails bg-light shadow-sm" >
          <div className="maininfo">

        <div className="myInfo text-capitalize">
          <h1>{data.name}</h1>
          <p>{formatDate(data.date)}</p>
          <p>{data.description} </p>
        </div>
          </div>
       

        <div className="myButtons">
          <div className="buton">
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
            <button
              className="btn btn-warning mx-lg-3"
              onClick={() =>
                navigate("/edit-todo/" + params.id, {
                  state: {
                    token: profile.token,
                    myName: data.name,
                    date: data.date,
                    description: data.description,
                  },
                })
              }
            >
              Edit
            </button>
          </div>
         
        </div>
      </div>

      
    </div>
  );
}

export default TodoDetails;
