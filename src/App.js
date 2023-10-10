import React, { useState } from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import CodeEditor from './components/CodeEditor';
import AllCodes from './components/AllCodes';

function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<AllCodes/>}></Route>
        <Route path='/code/:id' element={<CodeEditor/>}></Route>
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
