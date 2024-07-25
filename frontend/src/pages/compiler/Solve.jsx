import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import axios from 'axios';

function Solve() {
    const problems = {
        pname: "",
        description: "",
        difficulty: ""
      }
    const {id} = useParams();
    const [problem, setProblem] = useState(problems);
    useEffect(() => {
        const fetchProblem = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/Problem/${id}`);
            setProblem(response.data);
          } catch (error) {
            console.error('Error fetching problem details:', error);
          }
        };
    
        fetchProblem();
      }, [id]);

    const [code, setCode] = useState(`#include <iostream> 
      using namespace std;
      // Define the main function
      int main() { 
          // Declare variables
          int num1, num2, sum;
          // Prompt user for input
          cin >> num1 >> num2;  
          // Calculate the sum
          sum = num1 + num2;  
          // Output the result
          cout << "The sum of the two numbers is: " << sum;  
          // Return 0 to indicate successful execution
          return 0;  
      }`);

    const [input, setInput] = useState('');  
    const [output, setOutput] = useState('');
    const [language, setLanguage] = useState('cpp');
    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };
    const handleRun = async () => {
        const payload = {
          language,
          code,
          input
        };
    
        try {
          const { data } = await axios.post('http://localhost:8080/run', payload);
          console.log(data);
          setOutput(data.output);
        } catch (error) {
          console.log(error);
        }
      }
  return (
    <div className='grid h-screen grid-cols-2 mt-2'>
        <div className='flex flex-col'>
            <Link to ={'/problems'} className='text-l'><i className="fa-solid fa-arrow-left"></i></Link>
            <h1 className='justify-between text-3xl font-bold ml-3'>{problem.pname}</h1>
            <br />
            <p>Difficulty: {problem.difficulty}</p>
            <br />
            <p className='justify-center'>
                {problem.description}
            </p>
        </div>

        <div>
            <div className='flex flex-col items-center'>
                <select className="select-box border border-gray-300 rounded-lg py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500" 
                        value={language}
                        onChange={handleLanguageChange}>
                    <option value='cpp'>C++</option>
                    <option value='py'>Python</option>
                    <option value='java'>Java</option>
                </select>
                <br />
                <div className="bg-gray-100 shadow-md w-full max-w-lg" style={{ height: '400px', overflowY: 'auto' }}>
                    <Editor
                    value={code}
                    onValueChange={code => setCode(code)}
                    highlight={code => highlight(code, languages.js)}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                        outline: 'none',
                        border: 'none',
                        backgroundColor: '#f7fafc',
                        height: '100%',
                        overflowY: 'auto',
                        width: '100%',
                    }}
                    />
                </div>
                <div className="lg:w-1/2 lg:pl-8 pt-10">
                  {/* Input textarea */}
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-2">Input</h2>
                    <textarea
                      rows='5'
                      cols='15'
                      value={input}
                      placeholder='Input'
                      onChange={(e) => setInput(e.target.value)}
                      className="border border-gray-300 rounded-sm py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500 resize-none w-full"
                      style={{ minHeight: '100px' }}
                    ></textarea>
                  </div>

                  {/* Output box */}
                  {(
                    <div className="bg-gray-100 rounded-sm shadow-md p-4 h-28">
                      <h2 className="text-lg font-semibold mb-2">Output</h2>
                      <div style={{ fontFamily: '"Fira code", "Fira Mono", monospace', fontSize: 12 }}>{output}</div>
                    </div>
                  )}
                </div>
                <div className='flex flex-row mt-3'>
                    <button onClick={handleRun} className='text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'><i className="fa-solid fa-play"></i> Run</button>
                    <button className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Submit</button>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Solve