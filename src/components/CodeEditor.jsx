import React, { useState, useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button } from "@chakra-ui/react";

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
            code: code,
            codeId: id
        })
       // console.log(response.data);
        setTestCases(response.data.testResults)
        console.log(testCases);
    }

  return (
    <>
    {testCases?.map((testCase,i)=>{
        return <div key={i} >
            <div >{testCase== true ? "✅ Test Case Passed" : "❌ Test Case Failed"}</div>
            </div>
    })}
    <div style={{display:"flex", gap:"30px"}}>
    <CodeMirror
      value={code}
      height="80vh"
      width='80vh'
      theme={okaidia}
      extensions={[javascript({ jsx: true })]}
      onChange={handleChange}
    />
    <div>
    {codeDetails ? <div>
     <h3> {codeDetails.question} </h3>
     <div>{codeDetails.description}</div>
     <br/>
     <div style={{backgroundColor:"lightgray", padding:"10px", borderRadius:"2px"}}>
     <div>Inputs: {codeDetails.input}</div>
     <div>Sample Output: {codeDetails.output}</div>
     </div>
    </div> : <></>}
    </div>
    </div>
    <Button onClick={getOutput}>Get Output</Button>
    </>
  )
}

export default CodeEditor