import { useState } from "react";
import { useEffect } from "react";

const useFetch = (repository, word) =>{
  

  const pageLimit = 10;
  const [datas, setItems] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const url = `https://bkkedr0m0e.execute-api.us-east-1.amazonaws.com/items?q=${word}`;
  const url2 = 'http://localhost:9000/items2';
  
  //will execute function when data is updated
  useEffect(async() => {
    console.log(repository);
    setLoading(false);
    if(repository === 'GitHub')
    {
      setLoading(true);
      
      async function fetchData() {
        // You can await here
        const response = await fetch(url,{

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
            
          },
          mode: 'cors'
        }).then(res => res.json().then(data => setItems(data)));
        
        console.log(response);
      
        setLoading(false);
        // ...
      }
      fetchData();
    }  
    else if(repository === 'MATC')
    {
      setLoading(true);
      const response = await fetch(url2,{
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
      });
      
      const data = await response.json();
      setItems(data);
      setLoading(false);
    }
    else if (repository === 'All')
    {
      try{//both json arrays are merged here
        var res1 = await fetch(url);
        var data1 = await res1.json();
        var res2 = await fetch(url2);
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
