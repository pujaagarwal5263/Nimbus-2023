import React, { useState } from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { ChakraProvider, CheckboxGroup } from "@chakra-ui/react";
import CodeEditor from './components/CodeEditor';
import AllCodes from './components/AllCodes';
import LandingPage from './components/Landing';

function App() {

  return (
    <>
    <ChakraProvider>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/home" element={<AllCodes/>}></Route>
        <Route path='/code/:id' element={<CodeEditor/>}></Route>
      
    </Routes>
    </BrowserRouter>
    </ChakraProvider>
    </>
  );
}

export default App;
