import React from 'react'
import TodoList from './TodoList';
import { useState, useEffect} from 'react';
import axios from 'axios';
import "./AllTodo.css"

function AllTodo({profile}) {
  const [list, setList] = useState([]);
  
  useEffect(() => {
    const getTodos = async () => {
      axios
        .get("http://localhost:3011/alltodo",{
          headers:{
            Authorization:'Bearer '+ profile.token
          }
        })
        .then((result) => setList(result.data.Todos));
    };
    getTodos();
  }, []);

  return (
    <div className='todoall'> 
 
  {list.map((todo) => {
  
    return (
          <TodoList
          key={todo.date}
          list={todo}
          token={profile.token}
        />
    );
  })}
</div>
  );
}

export default AllTodo;
