import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetch(url) {
    const [data, setData] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const dataResponse = await axios.get(url);
                setData(dataResponse.data);
            } catch (error) {
                setError(error.message);

            }finally{
                setLoading(false)
            }
        };
        fetchData();
    }, [url]
);
return {data , error, loading };
}