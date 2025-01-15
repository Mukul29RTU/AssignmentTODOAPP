import React from 'react'
import "../Adddata.css"
import { useState ,useEffect} from 'react'
import {useNavigate}  from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify' 

function AddTodo({profile}) {

  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [myDate, setDate] = useState("");
  const [description, setDescription] = useState("");


  const handleAddtodo=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:3011/addtodo', {name,myDate,description},{
      headers:{
        Authorization:'Bearer '+ profile.token
      }
    })
    .then(result => {
      toast.success(result.data.msg)
      navigate('/')
      })
    .catch(err => alert("error"))
  }

  return (
    <div className="addtodo my-lg-5 px-lg-5">
      <div className='addbox'>
    <h3 className="text-center">Add New TODO</h3>
     <form action="" onSubmit={handleAddtodo} className="addform px-lg-5 text-primary">
          <div className="d-flex flex-column px-lg-3 py-2">
            <label htmlFor="TODOname">TODO NAME</label>
            <input type="text" placeholder="Enter TODO name" onChange={e => setName(e.target.value)}/>
          </div>
          
          <div className="d-flex flex-column px-lg-3 py-2">
            <label htmlFor="date">TODO DATE</label>
            <input type="date" placeholder="Enter TODO DATE" onChange={e => setDate(e.target.value)}/>
          </div>
          <div className="d-flex flex-column px-lg-3 py-2">
            <label htmlFor="description">TODO DESCRIPTION</label>
            <input type="text" placeholder="Enter Description" onChange={e => setDescription(e.target.value)}/>
          </div>

          <div className="d-flex justify-content-center px-lg-3 py-4">
            <button
              className="btn text-white"
              style={{ backgroundColor: "#FF2929" }}
            >
              Add TODO
            </button>
          </div>
        </form>
  </div>
    </div>
    
  )
}

export default AddTodo;