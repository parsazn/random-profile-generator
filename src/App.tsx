import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";



function App() {
  const API_URL = "https://randomuser.me/api/";
  const [items, setItems] = useState<any[]>([]);
  const [fetchError , setFetchError] = useState(null);
  const [isLoading , setIsLoading] = useState(true);

  useEffect(() => {
    
    const fetchItems = async () => { //as we only use this to fetch items we can define the function here 
      try{
        const response = await fetch(API_URL) ; 
        if(!response.ok) throw new Error('Did not recieved expected data');
        const listItems = await response.json() ; 
        setItems(listItems.results);
        setFetchError(null);
        console.log(listItems.results);
      } catch (err : any ){
        setFetchError(err.message)
      }finally{
        setIsLoading(false);
      }
    }
    setTimeout(()=> {
      (async () => await fetchItems())();
    }, 7000)
    
  }, []);

  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {!fetchError && items.length > 0 && items.map(
          (item) => {
            const {gender , name} = item ; 
            console.log(name)
            return (
              <h5 key={gender}>{name.title.toUpperCase( )}</h5>
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
        {isLoading && 
          <h1>Error</h1>
        }
      </header>
    </div>
  );
}

export default App;
