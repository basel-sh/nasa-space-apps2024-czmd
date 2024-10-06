// import React from "react";
// import { useState, useEffect } from "react";







// apiData.js
import { useState, useEffect } from 'react';

// Custom hook or function to fetch and export data
export function useFetchData() {
  const [data, setData] = useState([]); // State to store the data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://c6y6ekijnffsqymfjfmco6ftkm0lieai.lambda-url.me-south-1.on.aws/'); // API URL
        const result = await response.json(); // Convert to JSON
        setData(result); // Store the fetched data in state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the function on component mount
  }, []); // Empty dependency array ensures it only runs once

  return data; // Export the data array
}
