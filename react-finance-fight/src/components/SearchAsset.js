import SingleAsset from "./SingleAsset";
import SearchForm from "../forms/SearchForm";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Card from "@mui/material/Card";

export default function SearchAsset(){
    const {asset} = useContext(AppContext)

    return(
        <Card sx={{p:2, mt:'-64px'}}>
            <SearchForm/>
            {asset ?
            <SingleAsset asset={asset}/>
            :
            ''
            }
        </Card>
        
    )
}