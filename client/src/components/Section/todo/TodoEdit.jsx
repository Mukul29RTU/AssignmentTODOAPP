import React from 'react'
import { useState ,useEffect} from 'react'
import axios from 'axios'
import "../Adddata.css"
import {toast} from 'react-toastify' 
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function TodoEdit() {
  const location = useLocation();
  const token = location.state?.token;

  const [name,setName] = useState("")
  const [date,setDate] = useState("")
  const [description,setDescription] = useState("")

  const navigate = useNavigate()
  const params = useParams()
  const handleUpdate= (e)=>{


    e.preventDefault()
    axios.put('http://localhost:3011/update/'+ params.id, {name,date,description},{
      headers:{
        Authorization:'Bearer '+ token
      }
    })
    .then(result => {
      navigate('/all-todo')
      toast.success("TODO Succesfully Edit")

      })
    .catch(err => alert("Error"))
            
  }

  return (
    <div className='todoEdit my-lg-5 px-lg-5'>
      <div className="addbox">
      <h3 className="text-center">Edit Todo Details</h3>
     <form action="" onSubmit={handleUpdate} className="addform px-lg-5 text-primary">
     <div className="d-flex flex-column px-lg-3 py-2">
            <label htmlFor="TODOname">NEW TODO NAME</label>
            <input type="text" placeholder="Enter TODO name" onChange={e => setName(e.target.value)}/>
          </div>
          
          <div className="d-flex flex-column px-lg-3 py-2">
            <label htmlFor="date">NEW TODO DATE</label>
            <input type="date" placeholder="Enter TODO DATE" onChange={e => setDate(e.target.value)}/>
          </div>
          <div className="d-flex flex-column px-lg-3 py-2">
            <label htmlFor="description">NEW TODO DESCRIPTION</label>
            <input type="text" placeholder="Enter Description" onChange={e => setDescription(e.target.value)}/>
          </div>

         
          <div className="d-flex justify-content-center px-lg-3 py-4">
            <button
              className="btn text-white"
              style={{ backgroundColor: "#FF2929" }}
                onClick={handleUpdate} 
            >
              Update
            </button>
          </div>
        </form>
      </div>
  </div>
  )
}

export default TodoEdit;
