import React from "react";
import styles from './index.css';

const ProjectList = (props) => {

  //receives props passed in Home component 
  const items = props.items;
  
  

  return ( 
    <div className="list">
      {items.map((item)=>(
        <div className="preview" key ={item.id}>
          <a  href={item.project_url}>
            {item.Description}
          </a>
          <p>Owner: {item.owner_name}</p>
        </div>
      ))}
    </div>
   );
}
 
export default ProjectList;

