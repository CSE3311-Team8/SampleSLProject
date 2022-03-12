import React from "react";
import Table from "react-bootstrap/Table";
import { useState} from "react";

//list of projects is generated using the prop received  
const ProjectList = (props) => {
  const[visible, setVisible] = useState(10);
  
  const data = props.items;
  const database = props.repository;
  //console.log(database);
  let Visible = visible;

  const loadMOre= () =>{
    
    setVisible(Visible + 25);

  }

  //console.log(data.length);
 
  return ( 
    <div className="search-items">
      <div className="list">
        { 
          data.slice(0, visible).map((item)=>{     
            return (
              /* all columns set to 20% total width */
              <div className="preview" key ={item.id}> 
                <Table  className="table">
                  <thead>
                    <tr className="headers">
                      <th className="header">Owner</th>
                      <th className="header">Repository</th>
                      <th className="header">Owner Page</th>
                      <th className="header">Created On</th>
                      <th className="header">Updated On</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td className="name">{item.author_name || item.owner_name}</td>
                    <td  className="url">
                      <a  href={item.mathworks_url || item.project_url}>
                      {item.title || item.repo_name}
                      </a>
                    </td>
                    <td  className="url">
                      {((item.author_uri || item.homepage_url) !== null) &&
                        <a  href={item.author_uri || item.homepage_url}>
                        take me there
                        </a>
                      }
                    </td>
                    <td  className="date-created">{new Date(item.published || item.created_at).toLocaleDateString()}</td>
                    <td  className="date-updated">{new Date(item.updated || item.updated_at).toLocaleDateString()}</td>
                  </tr>
                <tr>
                    <td className="description" align="center" colSpan={'12'} >
                  
                        
                        { database === 'GitHub' && 
                          <p>{item.Description}</p>
                        }
                        { database === 'MATC' && 
                          <p>{item.summary}</p>
                        }
                        { database === 'All' && 
                          <p>{item.summary || item.Description}</p>
                        }
                
                  
                    </td>
                  </tr>  
                  </tbody>
               
                </Table> 
              
              </div>
            )
          })
        }
        <div className="page-count">
          
          {visible < data.length && ( 
            <button className='loader' style={{ color: '#345beb'}} onClick={loadMOre}>Next 10</button>
          )}
        </div>  
       
      </div>
    </div>  
  );
}
 
export default ProjectList;

