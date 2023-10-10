import React, { useState } from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import CodeEditor from './CodeEditor';

function App() {

  return (
    <BrowserRouter>
    <Routes>
     
        <Route path='/code' element={<CodeEditor/>}></Route>
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
