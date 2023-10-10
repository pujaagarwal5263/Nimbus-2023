import React, { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import axios from 'axios';

const extensions = [javascript({ jsx: true })];

const CodeEditor = () => {
    const [code,setCode] = useState("");
    const [output, setOutput] = useState("");
    const [testCases, setTestCases] = useState([]);

    const handleChange = (e) =>{
        setCode(e)
    }
    const getOutput = async() =>{
        const response = await axios.post("http://localhost:8000/execute",{
            code: code
        })
        //console.log(response.data.passOrFail);
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
      theme={okaidia}
      extensions={[javascript({ jsx: true })]}
      onChange={handleChange}
    />
    <button onClick={getOutput}>Get Output</button>
    </>
  )
}

export default CodeEditor