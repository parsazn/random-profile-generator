import {
  Avatar,
  Box,
  Grid,
  Button,
  IconButton,
  Container,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { borderRadius } from "@mui/system";
import RefreshIcon from "@mui/icons-material/Refresh";
import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import SocialMediaCard from "./components/SocialMediaCard";
import AddressTable from "./components/AddressTable";

function App() {
  const API_URL_USER = "https://randomuser.me/api/";
  
  const [items, setItems] = useState<any[]>([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [latestPost , setLatestPost] = useState(true);
  const [address , setAddress] = useState(false);
  const [privacy , setPrivacy] = useState(false);
  

  useEffect(() => {
    const fetchItems = async () => {
      //as we only use this to fetch items we can define the function here
      try {
        const response = await fetch(API_URL_USER);
        if (!response.ok) throw new Error("Did not recieve expected profile");
        const listItems = await response.json();
        setItems(listItems.results);
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

  const handleLatestPost = () =>{
    setLatestPost(!latestPost)
    address && handleAddress();
    privacy && handlePrivacy();
  }

  const handleAddress = () =>{
    setAddress(!address)
    latestPost && handleLatestPost(); 
    privacy && handlePrivacy(); 
  }

  const handlePrivacy = () =>{
    setPrivacy(!privacy)
    latestPost && handleLatestPost() ; 
    address && handleAddress() ; 
  }

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
          const { picture, name, login , location, registered } = user;
          console.log(name);
          
          

          const locationData = [
            {
              name: 'City',
              detail: `${location.city}`,
            },
            {
              name: 'Country',
              detail: `${location.country}`,
            },
            {
              name: 'state',
              detail: `${location.state}`,
            },
            {
              name: 'street',
              detail: `${location.street.name + ' ' + location.street.number.toString()}`,
            },
            {
              name: 'timezone',
              detail: `${location.timezone.description}`,
            },
          ]

          return (
            <Container maxWidth="xl"
              key={login.uuid}
              sx={{ height: "85vh"}}
            >
              <Grid container spacing={10} mt={6} direction="row">
                <Grid item xs={12} sm={3.5} >
                  <Box sx={{ width:'100%' , py:4 , px:1 ,border:1 }} >
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
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
                            onClick={() => window.location.reload()}
                          >
                            <RefreshIcon aria-label="refresh" />
                          </IconButton>
                        </Paper>
                      </Grid>
                      <Grid item xs={12}  sx={{ width:'100%'}} >
                        <Box pr={2} display="flex" alignItems="center"
        justifyContent="center" >
                         <Stack>
                         <Typography noWrap  variant="h4">{login.username}</Typography> 
                         <Typography variant="h6">{name.title + ' ' + name.first + ' ' +name.last}</Typography> 
                         </Stack>
                         </Box>   
                      </Grid>        
                      <Grid item xs={12} sx={{ width:'100%'}} mt={9}>
                        <Stack spacing={3} >
                          <Button variant="contained" onClick={handleLatestPost} disabled={latestPost} fullWidth>Latest Post</Button>
                          <Button variant="contained" onClick={handleAddress} disabled={address} >Address</Button>
                          <Button variant="contained" onClick={handlePrivacy} disabled={privacy} >Privacy</Button>
                          
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8.5}>
                  {latestPost && (
                        <Box border={1} >
                            <SocialMediaCard></SocialMediaCard>
                        </Box>)
                  }
                  {address && (
                        <Box border={1} >
                            <AddressTable rows={locationData}></AddressTable>
                        </Box>)
                  }
                  {privacy && (
                        <Box border={1} >
                            <Typography variant="h1"> </Typography>
                        </Box>)
                  }
                </Grid>
              </Grid>
            </Container>
          );
        })}
    </>
  );
}

export default App;
