import React from "react";
import ProjectList from "./ProjectList";
import useFetch from "./useFetch";



const Home = (props) => {
  const {data, isLoading} = useFetch('http://localhost:8000/items')
  const word =props.string;
  console.log(word);
  
  //main data request, needs to updated for searching
  //currently displaying all contents of table 
  

  
  //the code below calls the ProjecList component and passes the data requested above as a prop
  //new comment for commi9t
  return ( 
    
    <div className="home">
        
      {isLoading && <div>Searching...</div> } 
      <ProjectList  items = {word}/>
    
    </div>
   );
}
 
export default Home ;