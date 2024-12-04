import { useState, useEffect } from "react";
//import axios from "axios";

export default function useFetch(url, method = 'GET',body=null) {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const options = {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                };
                /*if (method === 'POST' && body) {
                    options.body = JSON.stringify(body);
                }*/
                const dataResponse = await fetch(url,options); //await axios.get(url);
                if (!dataResponse.ok) {
                    throw new Error ('Data fetching failed');//Help to see if fetching data works
                }
                const dataResult = await dataResponse.json();
                setData(dataResult);
            } catch (error) {
                setError(error.message);
            }finally{
                setLoading(false);
            }
        };
        fetchData();
    }, [url, method, body]);
    
return {data , error, loading };
}