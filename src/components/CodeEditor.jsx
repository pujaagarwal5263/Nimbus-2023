import React, { useState, useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const extensions = [javascript({ jsx: true })];

const CodeEditor = () => {
  const { id } = useParams();
  const [codeDetails, setCodeDetails] = useState({});

    const [code,setCode] = useState("");
    const [output, setOutput] = useState("");
    const [testCases, setTestCases] = useState([]);

    useEffect(() => {
      // Make an API request to fetch code details by ID
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/code/${id}`)
        .then((response) => {
          setCodeDetails(response.data);
          setCode(response.data.function)
        })
        .catch((error) => {
          console.error('Error fetching code details:', error);
        });
    }, [id]);

    const handleChange = (e) =>{
        setCode(e)
    }
    const getOutput = async() =>{
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/execute`,{
            code: code
        })
        setTestCases([response.data.passOrFail])
    }

  return (
    <>
    {testCases?.map((testCase,i)=>{
        return <div key={i}>
            <div>{testCase== 'True' ? "✅ successss" : "❌ faillll"}</div>
            </div>
    })}
    <CodeMirror
      value={code}
      height="50vh"
      width='50vh'
      theme={okaidia}
      extensions={[javascript({ jsx: true })]}
      onChange={handleChange}
    />
    {codeDetails ? <p>{codeDetails.question}</p> : <></>}
    <button onClick={getOutput}>Get Output</button>
    </>
  )
}

export default CodeEditor