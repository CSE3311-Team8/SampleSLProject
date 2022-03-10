import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import ReactTable from "react-table";  
import { useState } from "react";
import ProjectList from "./ProjectList";

//import {Dropdown} from 'semantic-ui-react'



const Home = () => {

  
///////////////////////////////////////////

  const [items, setItems] = useState([]);

  const fetchJSONDataFrom = useCallback(async (path) => {
    const response = await fetch(path, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    const data = await response.json();
    setItems(data);
  }, []);

  useEffect(() => {
    fetchJSONDataFrom("GitHub_Projects.json");
  }, [fetchJSONDataFrom]);

//////////////////////////////////////////////
  return ( 

    <div className="home">
      
     <ProjectList items ={items} title="Results"/>
    
    </div>
   );
}
 
export default Home ;