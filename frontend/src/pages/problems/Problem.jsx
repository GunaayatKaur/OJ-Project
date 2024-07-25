import React, { useEffect, useState } from 'react'
import axios from "axios"
import {Link} from 'react-router-dom'
import './Problem.css'
import toast from 'react-hot-toast'

function Problem() {
  const[problems, setproblems] = useState([]) ; 
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const fetchData = async() => {
        const response = await axios.get("http://localhost:8000/AllProblems");
        setproblems(response.data);
    }
    const fetchCurrentUser = async () => {
        const token = localStorage.getItem('token')
        if (!token) return
  
        try {
          const response = await axios.get("http://localhost:8000/profile", {
            headers: { 'Authorization': `Bearer ${token}` }
          })
          setCurrentUser(response.data)
        } catch (error) {
          console.error(error)
        }
    }
    fetchData();
    fetchCurrentUser();
  }, [])

  const deleteProblem = async(ProblemId) => {
    if (!currentUser) {
        toast.error("You need to be logged in to delete problems", { position: 'top-right' })
        return
    }

    await axios.delete(`http://localhost:8000/delete/${ProblemId}`)
    .then((response) => {
        setproblems((prevUser) => prevUser.filter((problem) => (problem._id !== ProblemId)))
        toast.success(response.data.message, {position: 'top-right'})
        console.log(response)
    }).catch((error) => {
        console.log(error);
    })
  }

  return (
    <div className='userTable'>
        <Link to={"/add"} className='addButton'>Add Problem</Link>
        <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>SNo.</th>
                    <th>Problem Name</th>
                    <th>Problem Description</th>
                    <th>Difficulty</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {
                    problems.map((problem,index) => {
                        return (
                        <tr key={problem._id}>
                            <td>{index+1}</td>
                            <td><Link to={`/solve/${problem._id}`}>{problem.pname}</Link></td>
                            <td>{problem.description}</td>
                            <td>{problem.difficulty}</td>
                            <td className='actionButtons'>
                            {currentUser && currentUser._id === problem.createdBy && (
                                <>
                                    <button onClick={() => deleteProblem(problem._id)}><i className="fa-solid fa-trash"></i></button>
                                    <Link to = {`/edit/` +problem._id}><i className="fa-solid fa-pen-to-square"></i></Link>
                                </>)}
                            </td>
                        </tr>
                        )
                    })
                }
                
            </tbody>
        </table>
    </div>
  )
}

export default Problem