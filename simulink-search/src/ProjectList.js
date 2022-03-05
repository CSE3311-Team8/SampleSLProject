import React from "react";
import useFetch from "./useFetch";
import Table from "react-bootstrap/Table"

//list of projects is generated using the prop received  
const ProjectList = (props) => {

  //call for data using a re-usable component
  const {data} = useFetch('http://localhost:8000/items');
  const items = props.items;
  //console.log(data);

 
  return ( 
    <div className="search-items">
      <div className="list">
        { 
          data.filter((phrase)=>{
            if(items === "")
            {
              return "";
            }
            else if(phrase.Description.toLowerCase().includes(items.toLocaleLowerCase())) 
            {
              return phrase;
            }
            return "";
          }).map((phrase)=>{   
               
            return (
              /* all columns set to 20% total width */
              <div className="preview" key ={phrase.id}> 
                <Table  className="table table-fixed
                table-sm same-col-widths">
                  <thead>
                    <tr className="same-col-widths">
                      <th>Owner Name</th>
                      <th>Repository</th>
                      <th>Home Page</th>
                      <th>Created On</th>
                      <th>Updated On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      <tr>
                        <td className="name">{phrase.owner_name}</td>
                        <td  className="url">
                          <a  href={phrase.project_url}>
                          {phrase.repo_name}
                          </a>
                        </td>
                        <td  className="url">
                          <a  href={phrase.homepage_url}>
                          link
                          </a>
                        </td>
                        <td  className="date-created">{phrase.updated_at}</td>
                        <td  className="date-updated">{phrase.created_at}</td>
                      </tr>
                    }
                  </tbody>
                </Table> 
                <p>{phrase.Description}</p>
              </div>
            )
          })
        }
      </div>
    </div>  
  );
}
 
export default ProjectList;

