import SingleAsset from "./SingleAsset";
import SearchForm from "../forms/SearchForm";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

export default function SearchAsset(){
    const {asset} = useContext(AppContext)

    return(
        <Card sx={{p:2, mt:'-64px'}}>
            <Typography variant='h3' sx={{width:'100%', textAlign:'center', fontWeight:'bold', mb:2}}>Asset Lookup</Typography>
            <SearchForm/>
            {asset ?
            <SingleAsset asset={asset}/>
            :
            ''
            }
        </Card>
        
    )
}