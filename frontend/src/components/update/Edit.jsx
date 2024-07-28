import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import '../addProbs/add.css'
import axios from 'axios'
import toast from 'react-hot-toast'

function Edit() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const problems = {
    pname: "",
    description: "",
    difficulty: "",
    createdBy: ""
  }

  const {id} = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(problems);
  const [currentUser, setCurrentUser] = useState(null)

  const inputChangeHandler = (e) => {
    const {name,value} = e.target;
    setProblem({...problem, [name] :value});
    //console.log(problem);
  }

  useEffect (() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(`${backendUrl}/Problem/${id}`)
        setProblem(response.data)
      } catch (error) {
        console.error(error)
      }
    }

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

    fetchProblem()
    fetchCurrentUser()
  }, [id])

  const SubmitForm = async(e) => {
    e.preventDefault();
    if (currentUser && problem.createdBy === currentUser._id) { // Check if current user is the creator
      try {
        await axios.put(`${backendUrl}/update/${id}`, problem)
        toast.success("Problem updated successfully", { position: "top-right" })
        navigate("/problems")
      } catch (error) {
        console.error(error)
      }
    } else {
      toast.error("You are not authorized to update this problem", { position: "top-right" })
    }
  }

  return (
    <div className='addProblem'>
      <Link to ={'/problems'}>Back</Link>
      <h3>Update Problems</h3>
      <form className='addPForm' onSubmit={SubmitForm}>
        <div className='inputGroup'>
          <label htmlFor="pname">Problem Name</label>
          <input type="text" onChange={inputChangeHandler} value = {problem.pname} id='pname' name='pname' placeholder='Problem Name'/>
        </div>
        <div className='inputGroup'>
          <label htmlFor="description">Problem Description</label>
          <input type="text" onChange={inputChangeHandler} value = {problem.description} id='description' name='description' placeholder='Problem Description'/>
        </div>
        <div className='inputGroup'>
          <label htmlFor="difficulty">Problem Difficulty</label>
          <input type="text" onChange={inputChangeHandler} value = {problem.difficulty} id='difficulty' name='difficulty' placeholder='Problem Difficulty'/>
        </div>
        <div className='inputGroup'>
          <button type='submit'>UPDATE PROBLEM</button>
        </div>
      </form>
    </div>
  )
};

export default Edit