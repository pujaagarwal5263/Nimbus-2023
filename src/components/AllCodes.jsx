import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button } from "@chakra-ui/react";

const AllCodes = () => {
  const [codeArray, setCodeArray] = useState([]);

  const fetchCodes = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/allcodes`
    );
    setCodeArray(res.data);
    console.log(codeArray);
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  return (
    <div style={{margin:"19px"}}>
      <h2>My Dashboard</h2>
      <Tabs>
        <TabList>
          <Tab>Numbers</Tab>
          <Tab>Arrays</Tab>
          <Tab>Linked Lists</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ol>
              {codeArray.map(
                (codeData) =>
                  // Check if codeData.label is equal to "numbers" before rendering
                  codeData.label === "numbers" && (
                    <li key={codeData._id}>
                      <h3> {codeData.question}</h3>
                      
                      <Link to={`/code/${codeData._id}`}>
                        <Button>Open</Button>
                      </Link>
                    </li>
                  )
              )}
              <br/>
              more questions coming soon..
            </ol>
          </TabPanel>
          <TabPanel>
            <ol>
              {codeArray.map(
                (codeData) =>
                  // Check if codeData.label is equal to "numbers" before rendering
                  codeData.label === "arrays" && (
                    <li key={codeData._id}>
                      <h3> {codeData.question}</h3>
                      
                      <Link to={`/code/${codeData._id}`}>
                        <Button>Open</Button>
                      </Link>
                    </li>
                  )
              )}
               <br/>
              more questions coming soon..
            </ol>
          </TabPanel>
          <TabPanel>
            Coming Sooon...
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default AllCodes;