import {useState, useEffect} from 'react';
import axios from 'axios';
//import { rapidApiKey } from '../env';

const rapidApiKey = 'dea7fecdfdmsh78a21556d136427p1ae743jsnd869217d808d'

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
          'x-rapidapi-key': rapidApiKey,
          'x-rapidapi-host': 'jsearch.p.rapidapi.com'
        },
        params: { ...query },
      };

      const fetchData = async () => {
        setIsLoading(true);

        try{
            const response = await axios.request(options);

            setData(response.data.data);
            setIsLoading(false);
            setError(null);
        } catch (error) {
            setError(error);
            alert('There is an error')
        } finally {
            setIsLoading(false);
        }
      }

      useEffect(() => {
        fetchData();
      }, []);

      const refetch = () => {
        setIsLoading(true);
         fetchData();
      }

      return {
        data,
        isLoading,
        error,
        refetch
      };
}

export default useFetch;