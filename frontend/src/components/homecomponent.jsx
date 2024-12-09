import React from 'react';
//import {getUser} from '../futils/dbapi'
//import { useParams } from 'react-router-dom'; // Import useParams hook

import useFetch from '../hooks/dataFetcher';

export default function HomeComp(){
    const userId = sessionStorage.getItem('id');
        const {data, error, loading } = useFetch(`/user/${userId}`,'GET');
        if(loading){
            return <p>Loading...</p>
            }
        if(error){
            console.log('Console:')
            console.log(userId)
            return <p>Error: {error}</p>
            
        };
return(
    <>
    <h1> Hello, {data?.ulname}</h1>
    </>
)
};


