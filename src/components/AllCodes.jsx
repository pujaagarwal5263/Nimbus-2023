import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <div>
      <h2>All Codes</h2>
      <ul>
        {codeArray.map((codeData) => (
          <li key={codeData._id}>
            <h3>Question: {codeData.question}</h3>
            <Link to={`/code/${codeData._id}`}>
              <button>Open</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllCodes;
