import React from "react";
import {Link} from 'react-router-dom'
import useFetch from "./useFetch";
const ProjectList = (props) => {

  const {data, isLoading} = useFetch('http://localhost:8000/items')
  
  const items = props.items;
  console.log(items)
  const defaultHome = "Happy Searching!"
  //receives props passed in Home component 
  
  return ( 

    <div className="search-items">

      <div className="list">
        { 
          data.filter((phrase)=>{

            if(items === "")
            {
              return ;
            }
            else if(phrase.Description.toLowerCase().includes(items.toLocaleLowerCase())) 
            {
              return phrase;
            }

          }).map((phrase)=>(
            
            <div className="preview" key ={phrase.id}>
              <a  href={phrase.project_url}>
                {phrase.Description}
              </a>
              <p>Owner: {phrase.owner_name}</p>
            </div>

          ))    
        }
      </div>
    </div>  
   );

}
 
export default ProjectList;

