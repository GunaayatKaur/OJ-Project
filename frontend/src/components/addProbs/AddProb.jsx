import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './add.css'
import {Link, useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'

function AddP() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const problems = {
    pname: "",
    description: "",
    difficulty: "",
    createdBy: ""
  }

  const [problem, setproblem] = useState(problems);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null)
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem('token')
      if (!token) return

      try {
        const response = await axios.get(`${backendUrl}/profile`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        setCurrentUser(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchCurrentUser()
  }, [])

  const inputHandler = (e) => {
    const {name, value} = e.target;
    setproblem({...problem, [name] :value});
  }

  const submitForm = async(e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("You need to be logged in to add problems", { position: "top-right" })
      return
    }

    await axios.post(`${backendUrl}/create`, problem)
    .then((response)=>{
      //console.log(response);
      toast.success(response.data.message, {position:"top-right"});
      navigate("/problems");
    }).catch(error => console.log(error))
  }


  return (
    <div className='addProblem'>
      <Link to ={'/problems'}>Back</Link>
      <h3>Add new Problems</h3>
      <form className='addPForm' onSubmit={submitForm}>
        <div className='inputGroup'>
          <label htmlFor="pname">Problem Name</label>
          <input type="text" onChange={inputHandler} id='pname' name='pname' placeholder='Problem Name'/>
        </div>
        <div className='inputGroup'>
          <label htmlFor="description">Problem Description</label>
          <input type="text" onChange={inputHandler} id='description' name='description' placeholder='Problem Description'/>
        </div>
        <div className='inputGroup'>
          <label htmlFor="difficulty">Problem Difficulty</label>
          <input type="text" onChange={inputHandler} id='difficulty' name='difficulty' placeholder='Problem Difficulty'/>
        </div>
        <div className='inputGroup'>
          <button type='submit'>ADD PROBLEM</button>
        </div>
      </form>
    </div>
  )
};

export default AddP