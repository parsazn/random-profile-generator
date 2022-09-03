import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";



function App() {
  const API_URL = "https://randomuser.me/api/";
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    
    const fetchItems = async () => { //as we only use this to fetch items we can define the function here 
      try{
        const response = await fetch(API_URL)
        const listItems = await response.json() ; 
        setItems(listItems.results)
        console.log(listItems.results)
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
        {items && items.map(
          (item) => {
            const {gender} = item ; 
            return (
              <h5 key={gender}>{gender}</h5>
            )
          }
        )
        }
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
