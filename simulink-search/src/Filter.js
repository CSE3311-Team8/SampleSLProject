import React from "react";
import{ useState } from "react";
import Table from "react-bootstrap/Table";



//will contain the login for searching with different field parameters
const Filter = () => {

  const getInitialState = () => {
    const value = "Orange";
    return value;
  };

  const [value, setValue] = useState(getInitialState);

  const handleChange = (e) => {
    setValue(e.target.value);
  };


  return ( 

    <div className="filter">
      <h2>Filtered Search</h2>
      <div className="drop-menu">   
        <Table >
          <thead>
            <tr>
              <th>
                <div>
                  <select value={value} onChange={handleChange}>
                    <option value="Orange">Orange</option>
                    <option value="Radish">Radish</option>
                    <option value="Cherry">Cherry</option>
                  </select>
                  <p>{`You selected ${value}`}</p>
                </div>
              </th>
              <th>
                <div>
                  <select value={value} onChange={handleChange}>
                    <option value="Orange">Orange</option>
                    <option value="Radish">Radish</option>
                    <option value="Cherry">Cherry</option>
                  </select>
                  <p>{`You selected ${value}`}</p>
                </div>
              </th>
              <th>
                <div>
                  <select value={value} onChange={handleChange}>
                    <option value="Orange">Orange</option>
                    <option value="Radish">Radish</option>
                    <option value="Cherry">Cherry</option>
                  </select>
                  <p>{`You selected ${value}`}</p>
                </div>
              </th>
              <th>
                <div>
                  <select value={value} onChange={handleChange}>
                    <option value="Orange">Orange</option>
                    <option value="Radish">Radish</option>
                    <option value="Cherry">Cherry</option>
                  </select>
                  <p>{`You selected ${value}`}</p>
                </div>
              </th>
              <th>
                <div>
                  <select value={value} onChange={handleChange}>
                    <option value="Orange">Orange</option>
                    <option value="Radish">Radish</option>
                    <option value="Cherry">Cherry</option>
                  </select>
                  <p>{`You selected ${value}`}</p>
                </div>
              </th>
              <th>
                <div>
                  <select value={value} onChange={handleChange}>
                    <option value="Orange">Orange</option>
                    <option value="Radish">Radish</option>
                    <option value="Cherry">Cherry</option>
                  </select>
                  <p>{`You selected ${value}`}</p>
                </div>
              </th>
            </tr>
            
          </thead>
        </Table>
      </div>
    </div>

  );

}
 
export default Filter;