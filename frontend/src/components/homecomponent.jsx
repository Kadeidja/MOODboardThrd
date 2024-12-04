import React from 'react';
//import {getUser} from '../futils/dbapi'
import { useParams } from 'react-router-dom'; // Import useParams hook

import useFetch from '../hooks/dataFetcher';

export default function HomeComp(){
   // const userId = localStorage.getItem('userId');
   //const userId = 
    const { id: userId } = useParams();
    
        const {data, error, loading } = useFetch(`/user/${userId}`,'GET');
        if(loading){
            return <p>Loading...</p>
            }
        if(error){
            console.log('Console:')
            console.log(data?.ulemail)
            return <p>Error: {error}</p>
            
        };
    
   // console.log(data.getOneUser._id)
    //console.log(data.ulname)

    
return(

    <h1> Hello, {data?.ulname}</h1>
)
};


