import React from "react";
import Table from "react-bootstrap/Table";
import { useState} from "react";


//list of projects is generated using the prop received  
const ProjectList = (props) => {
  const[visible, setVisible] = useState(10);

  const data = props.items;
  console.log(data);
 
  let Visible = visible;

  const loadMOre= () =>{
    
    setVisible(Visible + 25);

  }



  console.log(data.length);
 
  return ( 
    <div className="search-items">
      <div className="list">
        { 
          data.slice(0, visible).map((item)=>{   
               
            return (
              /* all columns set to 20% total width */
              <div className="preview" key ={item.id}> 
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
                        <td className="name">{item.owner_name}</td>
                        <td  className="url">
                          <a  href={item.project_url}>
                          {item.repo_name}
                          </a>
                        </td>
                        <td  className="url">
                          <a  href={item.homepage_url}>
                          link
                          </a>
                        </td>
                        <td  className="date-created">{new Date(item.updated_at).toLocaleDateString()}</td>
                        <td  className="date-updated">{new Date(item.created_at).toLocaleDateString()}</td>
                      </tr>
                    }
                  </tbody>
                </Table> 
                <p>{item.Description}</p>
              </div>
            )
          })
        }
        <div className="page-count">
          <p>{visible} out of {data.length}</p>
          {visible < data.length && ( 
            <button className='loader' style={{ color: '#345beb'}} onClick={loadMOre}>Next 10</button>
          )}
        </div>  
       
      </div>
    </div>  
  );
}
 
export default ProjectList;

