import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Flex,
} from "@chakra-ui/react";
import OpenAI from "openai";

const extensions = [javascript({ jsx: true })];

const CodeEditor = () => {
  const { id } = useParams();
  const [codeDetails, setCodeDetails] = useState({});
  const [show, setShow] = useState(false);
  const [credits, setCredits] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [testCases, setTestCases] = useState([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiResponse, setAIResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // Make an API request to fetch code details by ID
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/code/${id}`)
      .then((response) => {
        setCodeDetails(response.data);
        setCode(response.data.function);
      })
      .catch((error) => {
        console.error("Error fetching code details:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    setCode(e);
  };
  const getOutput = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/execute`,
        {
          code: code,
          codeId: id,
          email: localStorage.getItem("email"),
        }
      );
      // console.log(response.data);
      setTestCases(response.data.testResults);
      setShow(true);
      //console.log(testCases);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getSolution = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/managecreds`,
        {
          email: localStorage.getItem("email"),
        }
      );

      if (res.data.success) {
        setCredits(true);
        setShow(true);
      } else {
        setCredits(false);
        setShow(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePayment = async () => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      key_secret: process.env.REACT_APP_RAZORPAY_KEY_SECRET,
      amount: 100 * 100,
      currency: "INR",
      name: "Nimbus 2023",
      description: "Credits",
      handler: function (response) {
        console.log(response);
        alert("payment done");
      },
      prefill: {
        name: "Nimbus 2023",
        email: "payment@nimbus.com",
        contact: "7878787832",
      },
      notes: {
        address: "Nimbus Corporate office",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    //now credit 100 to user
    setTimeout(async () => {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/addcredits`,
        {
          email: localStorage.getItem("email"),
        }
      );

      if (res.data.success) {
        setCredits(true);
      } else {
        setCredits(false);
      }
    }, 12000); // 2-second delay in milliseconds
  };

  // const getAIHelp = async() =>{
  //   const openai = new OpenAI({
  //     apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  //     dangerouslyAllowBrowser: true
  //   });

  //   async function main() {
  //     const chatCompletion = await openai.chat.completions.create({
  //       messages: [{ role: 'user', content: `Explain the code for ${codeDetails.question} in python.` }],
  //       model: 'gpt-3.5-turbo',
  //     });

  //     console.log(chatCompletion.choices);
  //   }

  //   main();
  // }

  const getAIHelp = async () => {
    setLoadingAI(true);
    setShowModal(true);
    try {
      const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const chatCompletion = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Explain the code for ${codeDetails.question} in python.`,
          },
        ],
        model: "gpt-3.5-turbo",
      });
      //console.log(chatCompletion.choices[0].message.content);
      setAIResponse(chatCompletion.choices[0].message.content);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <Box m={6}>
      <Flex>
        {testCases?.map((testCase, i) => (
          <Box
            key={i}
            mr={4}
            color={testCase ? "green" : "red"}
            fontWeight="bold"
          >
            {testCase === true ? "✅ Test Case Passed" : "❌ Test Case Failed"}
          </Box>
        ))}
      </Flex>
      <br></br>
      <div style={{ display: "flex", gap: "30px" }}>
        <CodeMirror
          value={code}
          height="80vh"
          width="80vh"
          theme={okaidia}
          extensions={[javascript({ jsx: true })]}
          onChange={handleChange}
          style={{ fontSize: "16px" }}
        />
        <div>
          {codeDetails ? (
            <div>
              <h3 style={{ fontWeight: "bold" }}> {codeDetails.question} </h3>
              <div>{codeDetails.description}</div>
              <br />
              <div
                style={{
                  backgroundColor: "lightgray",
                  padding: "10px",
                  borderRadius: "2px",
                }}
              >
                <div>Inputs: {codeDetails.input}</div>
                <div>Sample Output: {codeDetails.output}</div>
              </div>
              <br />
              <Button
                onClick={getSolution}
                _hover={{ bg: "black", color: "white" }}
                bgColor="white" // Set background color to black
                color="black" // Set text color to white
                border="1px solid black"
              >
                Get Solution 👩‍💻
              </Button>
              <div>
                {show === true && credits === true ? (
                  <pre
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      padding: "10px",
                      borderRadius: "2px",
                      marginTop: "10px",
                    }}
                  >
                    {codeDetails.solution}
                  </pre>
                ) : show ? (
                  <div style={{ padding: "10px", borderRadius: "2px" }}>
                    <p style={{ color: "red", fontWeight: "bold" }}>
                      Not Enough Credits
                    </p>
                    <Button
                      onClick={handlePayment}
                      size="sm"
                      _hover={{ bg: "black", color: "white" }}
                      bgColor="white" // Set background color to black
                      color="black" // Set text color to white
                      border="1px solid black"
                    >
                      Buy Credits
                    </Button>
                  </div>
                ) : null}
              </div>

              <br />
              <Button
                onClick={getAIHelp}
                _hover={{ bg: "black", color: "white" }}
                bgColor="white" // Set background color to black
                color="black" // Set text color to white
                border="1px solid black"
              >
                Try Nimbus AI ✨
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <br />
      <Button
        onClick={getOutput}
        _hover={{ bg: "black", color: "white" }}
        bgColor="black" // Set background color to black
        color="white" // Set text color to white
        
        isLoading={isLoading}
      >
        Evaluate Code
      </Button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nimbus AI ✨</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loadingAI ? (
              <p>Loading AI response...</p>
            ) : aiResponse ? (
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  padding: "10px",
                  borderRadius: "2px",
                }}
              >
                {aiResponse}
              </pre>
            ) : (
              <p>No AI response available.</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => setShowModal(false)}
              _hover={{ bg: "black", color: "white" }}
              bgColor="white" // Set background color to black
              color="black" // Set text color to white
              border="1px solid black"
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CodeEditor;
