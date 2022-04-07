import React from "react";
import ProjectList from "../views/ProjectList";
import useFetch from "./useFetch";



//Hosts the lists of projects matching search word
const Home = (props) => {

  const word =props.string;
  const database = props.string2;
  //console.log(word);
  //will display a load effect between searches
  const {isLoading, datas} = useFetch(database, word);

  //console.log(datas);

  //the prop "word" comes from search bar and will be 
  //the filtering parameter used for project filtering
  return ( 
    <div className="home">

      {isLoading && <div>Loading...</div> } 

      <ProjectList  items ={datas} repository = {database} word = {word}/>
    </div>
  );
}
 
export default Home ;