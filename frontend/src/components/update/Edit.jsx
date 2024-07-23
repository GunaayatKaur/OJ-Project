import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import '../addProbs/add.css'
import axios from 'axios'
import toast from 'react-hot-toast'

function Edit() {
  const problems = {
    pname: "",
    description: "",
    difficulty: ""
  }

  const {id} = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(problems);

  const inputChangeHandler = (e) => {
    const {name,value} = e.target;
    setProblem({...problem, [name] :value});
    //console.log(problem);
  }

  useEffect (() => {
    axios.get(`http://localhost:8000/Problem/${id}`)
    .then((response)=>{
      setProblem(response.data)
    }).catch(error => console.log(error))
  }, [id])

  const SubmitForm = async(e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/update/${id}`, problem)
    .then((response)=>{
      //console.log(response);
      toast.success(response.data.message, {position:"top-right"});
      navigate("/problems");
    }).catch(error => console.log(error))
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