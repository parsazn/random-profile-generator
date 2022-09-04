import {
  Avatar,
  Box,
  Grid,
  Button,
  IconButton,
  Paper,
  Skeleton,
  Stack,
} from "@mui/material";
import { borderRadius } from "@mui/system";
import RefreshIcon from "@mui/icons-material/Refresh";
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
              sx={{ height: "85vh", m: 8, border: 1, borderColor: "#000" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}  sm={3} sx={{ border: 1, m: 4 }}>
                  <Box >
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      spacing={10}
                    >
                      <Grid item xs={12} >
                        <Paper
                          sx={{
                            backgroundPositibon: "center",
                            borderRadius: "50%",
                            border: 1,
                            backgroundSize: "cover",
                            height: "300px",
                            width: "300px",
                            backgroundImage: `url(${picture.large})`,
                          }}
                        >
                          <IconButton
                            sx={{ backgroundColor: "#DDDDDD" }}
                            title="Refresh"
                          >
                            <RefreshIcon aria-label="refresh" />
                          </IconButton>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sx={{border:1 , width:'100%'}} >
                        <Stack spacing={3} >
                          <Button variant="contained" fullWidth>Porn</Button>
                          <Button variant="contained">Porn</Button>
                          <Button variant="contained">Porn</Button>
                          <Button variant="contained">Porn</Button>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={9}></Grid>
              </Grid>
            </Box>
          );
        })}
    </>
  );
}

export default App;
