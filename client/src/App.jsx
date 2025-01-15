import React, { useState } from 'react'
import { BrowserRouter as Router , Routes, Route, createBrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import Home from './components/Section/home/Home'
import AddTodo from './components/Section/todo/AddTodo';
import AllTodo from './components/Section/todo/AllTodo';
import TodoDetails from './components/Section/todo/TodoDetails';
import TodoEdit from './components/Section/todo/TodoEdit';


function App() {

  const [profile , setProfile] = useState([''])
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          exact path="/"
          element={
            profile && profile._id ? (
              <Dashboard profile={profile} setProfile={setProfile} />
            ) : (
              <Login setProfile={setProfile} />
            )
          }
        >
          <Route path="/" element={<Home profile={profile}></Home>}></Route>

          <Route
            path="/add-todo"
            element={<AddTodo profile={profile} />}
          ></Route>
          <Route
            path="/all-todo"
            element={<AllTodo profile={profile} />}
          ></Route>
          
          
            <Route
            path="/todo-detail/:id"
            element={<TodoDetails profile={profile} />}
          ></Route>
            <Route
            path="/edit-todo/:id"
            element={<TodoEdit profile={profile} />}
          ></Route>
   
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App
