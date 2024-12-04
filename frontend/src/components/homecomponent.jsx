import React, { useState } from 'react';
//import {getUser} from '../futils/dbapi'
import useFetch from '../hooks/dataFetcher';

export default function HomeComp(){
        const {data, error, loading } = useFetch('http://localhost:5000/user');
        if(loading){
            return <p>Loading...</p>
            }
        if(error){
            return <p>Error: {error}</p>
        };
    
    console.log(data.getOneUser._id)
    
return(

    <h1 key={data.getOneUser._id}> Hello {data.getOneUser.ulname} </h1>
)
};


