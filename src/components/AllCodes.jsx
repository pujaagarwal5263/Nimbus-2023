import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Box,
  Avatar,
  Text,
  Icon
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import Stars from "./Stars";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { FaSignOutAlt } from 'react-icons/fa';


const AllCodes = () => {
  const [codeArray, setCodeArray] = useState([]);
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  const fetchCodes = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/allcodes`,
      {
        email: user.email,
      }
    );
    setCodeArray(res.data);
    //console.log(res.data);
    //console.log(codeArray);
  };

  const saveUser = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/saveuser`,
      {
        username: user.name,
        email: user.email,
        profileURL: user.picture,
      }
    );
    localStorage.setItem("email", user.email);
    // console.log(user.picture);
    //console.log(res);
  };

  useEffect(() => {
    const fetchData = async () => {
    await saveUser();
    await fetchCodes();
    }
    fetchData();
  }, []);

   // Calculate the number of solved questions for each tab
   const solvedQuestionsNumbers = {
    Numbers: codeArray.filter((codeData) => codeData.label === "numbers" && codeData.stars !== -1).length,
    Arrays: codeArray.filter((codeData) => codeData.label === "arrays" && codeData.stars !== -1).length,
    LinkedLists: codeArray.filter((codeData) => codeData.label === "linked_lists" && codeData.stars !== -1).length,
  };

  return (
    <Box marginX={20} marginTop={10}>
      <div
        style={{
          position: "fixed",
          left: 2,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
          background: "white",
          //boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={user.picture}
            alt={user.name}
            style={{
              width: "40px", // Set a suitable width and height
              height: "40px",
              borderRadius: "50%",
              marginRight: "8px", // Adjust the margin as needed
            }}
          />
          <Text fontWeight="bold">{user.name}</Text>
          <Icon as={FaSignOutAlt} w={6} h={6} ml={3} onClick={logout}  />
        </div>
      </div>

      {/* <h2>My Dashboard</h2> */}
      <Tabs>
        
      <TabList>
          <Tab _selected={{ color: "white", bg: "black" }}>
            
            Numbers ({solvedQuestionsNumbers.Numbers}/{codeArray.filter((codeData) => codeData.label === "numbers").length})
          </Tab>
          <Tab _selected={{ color: "white", bg: "black" }}>
            
            Arrays ({solvedQuestionsNumbers.Arrays}/{codeArray.filter((codeData) => codeData.label === "arrays").length})
          </Tab>
          <Tab _selected={{ color: "white", bg: "black" }}>
        
            Linked Lists ({solvedQuestionsNumbers.LinkedLists}/{codeArray.filter((codeData) => codeData.label === "linked_lists").length})
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ol>
              {codeArray.map(
                (codeData) =>
                  // Check if codeData.label is equal to "numbers" before rendering
                  codeData.label === "numbers" && (
                    <Box
                      key={codeData._id}
                      p={4}
                      borderWidth="1px"
                      borderRadius="lg"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      marginY={5}
                    >
                      <div>
                        <h3>{codeData.question}</h3>
                        <Stars stars={codeData.stars} />
                      </div>
                      <Link to={`/code/${codeData._id}`}>
                        <Button
                        _hover={{ bg: "black", color: "white" }}
                        bgColor="white" // Set background color to black
                        color="black" // Set text color to white
                        border="1px solid black"
                        >Open</Button>
                      </Link>
                    </Box>
                  )
              )}
             
              more questions coming soon..
            </ol>
          </TabPanel>
          <TabPanel>
            <ol>
              {codeArray.map(
                (codeData) =>
                  // Check if codeData.label is equal to "numbers" before rendering
                  codeData.label === "arrays" && (
                    <Box
                      key={codeData._id}
                      p={4}
                      borderWidth="1px"
                      borderRadius="lg"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      marginY={5}
                    >
                      <div>
                        <h3>{codeData.question}</h3>
                        <Stars stars={codeData.stars} />
                      </div>
                      <Link to={`/code/${codeData._id}`}>
                        <Button
                         _hover={{ bg: "black", color: "white" }}
                         bgColor="white" // Set background color to black
                         color="black" // Set text color to white
                         border="1px solid black"
                         >Open</Button>
                      </Link>
                    </Box>
                  )
              )}
              <br />
              more questions coming soon..
            </ol>
          </TabPanel>
          <TabPanel>Coming Sooon...</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AllCodes;
