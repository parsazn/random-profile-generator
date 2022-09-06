import { Card , CardMedia ,CardContent,Typography,CardActions  , Button} from "@mui/material"
import { useEffect, useState } from "react";

function SocialMediaCard(){

    const API_QUOTE = "https://api.kanye.rest/";
    const [quote, setQuote] = useState(null);
    const [fetchError, setFetchError] = useState(null);

    const copyHandler = () => {
        navigator.clipboard.writeText(quote ? quote : 'll');
        alert("Copied the text: " + quote);
    }

    useEffect(() => {
        const fetchItems = async () => {
          //as we only use this to fetch items we can define the function here
          try {
            const responseQuote = await fetch(API_QUOTE);
            if (!responseQuote.ok)
              throw new Error("Did not recieve expected profile");
            const RecievedQuote = await responseQuote.json();
            console.log(RecievedQuote);
            setQuote(RecievedQuote.quote);
    
            setFetchError(null);
          } catch (err: any) {
            setFetchError(err.message);
            console.log(err.message);
          } 
        }
    
        fetchItems();
        }, [])
        
    return(
        <Card sx={{  }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        //image="https://picsum.photos/700/200"
        image="https://random.imagecdn.app/700/200"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {quote}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={copyHandler}>Copy</Button>
      </CardActions>
    </Card>
    )
}

export default SocialMediaCard