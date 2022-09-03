import { Box, Grid, Skeleton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import logo from "./logo.svg";


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
    <>
        
        {!isLoading && !fetchError && items.length > 0 && items.map(
          (item) => {
            const {gender , name} = item ; 
            console.log(name)
            return (
              <h5 key={gender}>{name.title.toUpperCase()}</h5>
            )
          }
        )
        }
        {isLoading && 
          <Grid container spacing={2} sx={{height: '100vh' , p: 8}}>
            <Grid item xs={12} sm={4} >
                <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
            </Grid>
            <Grid item xs={12} sm={8}>
                 <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
            </Grid>
        </Grid>
        }
      </>
  );
}

export default App;
