import { Box, Grid, Skeleton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import logo from "./logo.svg";

function App() {
  const API_URL_USER = "https://randomuser.me/api/";
  const API_QUOTE = "https://api.kanye.rest/";
  const [items, setItems] = useState<any[]>([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      //as we only use this to fetch items we can define the function here
      try {
        const response = await fetch(API_URL_USER);
        if (!response.ok) throw new Error("Did not recieve expected profile");
        const listItems = await response.json();
        setItems(listItems.results);

        const responseQuote = await fetch(API_QUOTE);
        if (!responseQuote.ok)
          throw new Error("Did not recieve expected profile");
        const RecievedQuote = await responseQuote.json();
        console.log(RecievedQuote);
        setQuote(RecievedQuote.quote);

        setFetchError(null);
        console.log(listItems.results);
      } catch (err: any) {
        setFetchError(err.message);
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      (async () => await fetchItems())();
    }, 1000);
  }, []);

  return (
    <>
      {isLoading && (
        <Grid container spacing={2} sx={{ height: "100vh", p: 8 }}>
          <Grid item xs={12} sm={4}>
            <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
          </Grid>
        </Grid>
      )}

      {!isLoading &&
        !fetchError &&
        items.length > 0 &&
        items.map((user) => {
          const { picture, name, login } = user;
          console.log(name);
          return (
            <Box
              key={login.uuid}
              sx={{ height: "85vh", m: 8, backgroundColor: "#587222" }}
            >
              <Grid container spacing={2} sx={{ height: "100vh", p: 8 }}>
                <Grid item xs={12} sm={4}>
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={"100%"}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={"100%"}
                  />
                </Grid>
              </Grid>
            </Box>
          );
        })}
    </>
  );
}

export default App;
