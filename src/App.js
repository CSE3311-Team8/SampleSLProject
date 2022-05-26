/* src/App.js */
import React from "react";
import SearchBar from "./components/search_bar/SearchBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import './background/background.css';

//import awsExports from "./aws-exports";

//Amplify.configure(awsExports);

function App() {
  
  return (
    <Container className="App">
      <SearchBar />
    </Container>
  );
}
export default App;
