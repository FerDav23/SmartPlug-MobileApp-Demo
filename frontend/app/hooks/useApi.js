import { useState } from "react";

const useApi = (apiFunc) => {
  // State variables to track the API request status and response data
  const [data, setData] = useState([]); // Store the data returned from the API
  const [error, setError] = useState(false); // Track if there is an error
  const [loading, setLoading] = useState(false); // Track loading state for the request

  const request = async (...args) => {
    setLoading(true); // Mark as loading when the request starts
    let response = null; // Variable to store the API response

    try {
      response = await apiFunc(...args); // Execute the API function with provided arguments
      // Check the response status and update the state
      if (!response.ok) {
        console.log("Response not okay");
        setError(true);
        setData([]); // If there's an error, clear the data
      } else {
        setError(false);
        setData(response.data); // Store the response data in state
      }
    } catch (error) {
      console.error("API call failed:", error);
      setError(true);
      setData([]); // Clear the data in case of an error
    } finally {
      setLoading(false); // Set loading to false when request completes
    }

    // Return the raw API response, so the caller receives correct values immediately
    return response;
  };

  // Return the `request` function along with state variables so that components can use them
  return { request, data, error, loading, setData };
};

export default useApi;
