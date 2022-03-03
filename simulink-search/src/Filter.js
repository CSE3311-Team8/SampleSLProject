import React from "react";
import{ useState } from "react";
import Table from "react-bootstrap/Table";



//will contain the login for searching with different field parameters
const Filter = () => {

  //default value for each select drop-down menu
  //all this login can be combine into one component
  //to minimize code lenght, the cod below was created to
  //get a version of the filter page working
  const getInitialState = () => {
    const value = "Created At";
    return value;
  };
  const getInitialState1 = () => {
    const value = "Updatec At";
    return value;
  };
  const getInitialState2 = () => {
    const value = "Forks Count";
    return value;
  };
  const getInitialState3 = () => {
    const value = "Open Issues Count";
    return value;
  };
  const getInitialState4 = () => {
    const value = "License";
    return value;
  };
  const getInitialState5 = () => {
    const value = "Stargazers Count";
    return value;
  };
  const getInitialState6 = () => {
    const value = "Number Of Comments";
    return value;
  };
  const getInitialState7 = () => {
    const value = "Watchers Count";
    return value;
  };
  const getInitialState8 = () => {
    const value = "Number Of Ratings";
    return value;
  };
  const getInitialState9 = () => {
    const value = "Language";
    return value;
  };
  
  //hook for selected value
  //updates return value for each drop down menu
  const [value, setValue] = useState(getInitialState);
  const [value1, setValue1] = useState(getInitialState1);
  const [value2, setValue2] = useState(getInitialState2);
  const [value3, setValue3] = useState(getInitialState3);
  const [value4, setValue4] = useState(getInitialState4);
  const [value5, setValue5] = useState(getInitialState5);
  const [value6, setValue6] = useState(getInitialState6);
  const [value7, setValue7] = useState(getInitialState7);
  const [value8, setValue8] = useState(getInitialState8);
  const [value9, setValue9] = useState(getInitialState9);
 

  //these functions handle the what happens when new value is selected from menu
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleChange1 = (e) => {
    setValue1(e.target.value);
  };
  const handleChange2 = (e) => {
    setValue2(e.target.value);
  };
  const handleChange3 = (e) => {
    setValue3(e.target.value);
  };
  const handleChange4 = (e) => {
    setValue4(e.target.value);
  };
  const handleChange5 = (e) => {
    setValue5(e.target.value);
  };
  const handleChange6 = (e) => {
    setValue6(e.target.value);
  };
  const handleChange7 = (e) => {
    setValue7(e.target.value);
  };
  const handleChange8 = (e) => {
    setValue8(e.target.value);
  };
  const handleChange9 = (e) => {
    setValue9(e.target.value);
  };
 
  //logic for displaying the drowp-down menus
  //will be updated to fit mock up display
  //this is for testings purposes
  return ( 
    <div className="filter">
      <h2>Filtered Search</h2>
      <div className="drop-menu1">   
        <Table className="table table-fixed
                table-sm same-col-widths">
          <thead>
            <tr className="same-col-widths">
              <th>
                <div>
                  <p>Created At</p>
                  <select value={value} onChange={handleChange}>
                    <option value="Orange">Orange</option>
                    <option value="Radish">Radish</option>
                    <option value="Cherry">Cherry</option>
                  </select>
                 
                </div>
              </th>
              <th>
                <div>
                <p>Updated At</p>
                  <select value={value1} onChange={handleChange1}>
                    <option value="Orange">Orange</option>
                    <option value="Radish">Radish</option>
                    <option value="Cherry">Cherry</option>
                  </select>
                  
                </div>
              </th>
              <th>
                <div>
                <p>Forks Count</p>
                  <select value={value2} onChange={handleChange2}>
                    <option value="Orange">Orange</option>
                    <option value="Radish">Radish</option>
                    <option value="Cherry">Cherry</option>
                  </select>
                 
                </div>
              </th>
              <th>
                <div>
                <p>Open Issues Count</p>
                  <select value={value3} onChange={handleChange3}>
                    <option value="Orange">Orange</option>
                    <option value="Radish">Radish</option>
                    <option value="Cherry">Cherry</option>
                  </select>
                  
                </div>
              </th>
              <th>
                <div>
                <p>License</p>
                  <select value={value4} onChange={handleChange4}>
                    <option value="Orange">Orange</option>
                    <option value="Radish">Radish</option>
                    <option value="Cherry">Cherry</option>
                  </select>
                
                </div>
              </th>
            </tr>
          </thead>
        </Table>
      </div>
      <div className="drop-menu1">   
        <Table className="table table-fixed
                table-sm same-col-widths">
          <thead>
            <tr className="same-col-widths">
              <th>
                <div>
                <p>Stargazers Count</p>
                  <select value={value5} onChange={handleChange5}>
                    <option value="Orange">Orange</option>
                    <option value="Radish">Radish</option>
                    <option value="Cherry">Cherry</option>
                  </select>
                 
                </div>
              </th>
              <th>
                <div>
                <p>Number of Comments</p>
                  <select value={value6} onChange={handleChange6}>
                    <option value="Orange">Orange</option>
                    <option value="Radish">Radish</option>
                    <option value="Cherry">Cherry</option>
                  </select>
             
                </div>
              </th>
              <th>
                <div>
                <p>Watchers Count</p>
                  <select value={value7} onChange={handleChange7}>
                    <option value="Orange">Orange</option>
                    <option value="Radish">Radish</option>
                    <option value="Cherry">Cherry</option>
                  </select>
                 
                </div>
              </th>
              <th>
                <div>
                <p>Number of Ratings</p>
                  <select value={value8} onChange={handleChange8}>
                    <option value="Orange">Orange</option>
                    <option value="Radish">Radish</option>
                    <option value="Cherry">Cherry</option>
                  </select>
                  
                </div>
              </th>
              <th>
                <div>
                <p>Language</p>
                  <select value={value9} onChange={handleChange9}>
                    <option value="Orange">Orange</option>
                    <option value="Radish">Radish</option>
                    <option value="Cherry">Cherry</option>
                  </select>
            
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