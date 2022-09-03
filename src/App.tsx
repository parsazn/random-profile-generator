import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const API_URL = "https://randomuser.me/api/";
  const [items, setItems] = useState([]);

  useEffect(() => {
    
    const fetchItems = async () => { //as we only use this to fetch items we can define the function here 
      try{
        const response = await fetch(API_URL)
        const listItems = await response.json() ; 
        setItems(listItems.results[0])
        console.log(listItems.results[0])
      } catch (e: unknown ){
        console.log(e)
      }
    }

    fetchItems();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
