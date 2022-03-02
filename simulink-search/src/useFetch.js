
import { useCallback } from "react"; 
import { useState } from "react";
import { useEffect } from "react";

const useFetch = (url) =>{

  const [data, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchJSONDataFrom = useCallback(async (url) => {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    const data = await response.json();
    setItems(data);
    setLoading(false);
  }, []);

    //will execute function when data is updated
    useEffect(() => {
      fetchJSONDataFrom(url);
    }, [url, fetchJSONDataFrom]);
    
    return{data, isLoading}
}
  

export default useFetch;