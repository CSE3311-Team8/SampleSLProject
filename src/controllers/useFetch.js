import { useState } from "react";
import { useEffect } from "react";

const useFetch = (repository, word) =>{
  const pageLimit = 40;
  const pageLimitAll = 40;
  const [page, setPage] = useState(1);
  const [datas, setItems] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const url = `https://sampleslproject-storage-53775c4755905-staging.s3.amazonaws.com/GitHub_Projects.json/items?q=${word}&_page=${page}&_limit=${pageLimit}`;
  const url2 = `http://localhost:5000/items2?q=${word}&_page=${page}&_limit=${pageLimit}`;
  
  //will execute function when data is updated
  useEffect(async() => {
    //console.log(repository);
    setLoading(false);
    if(repository === 'GitHub')
    {
      setLoading(true);

      const response = await fetch(url,{

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      console.log(response);
      
      const data = await response.json();
      setItems(data);
      setLoading(false);
    }
    else if(repository === 'MATC')
    {
      setLoading(true);
      const response = await fetch(url2,{
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      
      const data = await response.json();
      setItems(data);
      setLoading(false);
    }
    else if (repository === 'All')
    {
      try{//both json arrays are merged here
        var res1 = await fetch(`http://localhost:8000/items?q=${word}&_page=${page}&_limit=${pageLimitAll}`);
        var data1 = await res1.json();
        var res2 = await fetch(`http://localhost:5000/items2?q=${word}&_page=${page}&_limit=${pageLimitAll}`);
        var data2 = await res2.json();
        var res = [...data1,...data2];
        setItems(res);
      }catch(e){
          console.error(e)
      }finally{
        //setLoading(false)
      }
    }else if(repository === 'TYPE') 
    {
      alert('Select repository type to begin search...');
    }
  }, [word, repository]);
  
  
  return{datas, isLoading}

}
  

export default useFetch;