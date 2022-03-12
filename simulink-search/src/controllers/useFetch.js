import { useState } from "react";
import { useEffect } from "react";

const useFetch = (repository, word) =>{
  
  const [datas, setItems] = useState([]);
 
  
  const [isLoading, setLoading] = useState(false);
  const url = 'http://localhost:8000/items';
  const url2 = 'http://localhost:9000/items2';
  

    //will execute function when data is updated
    useEffect(async() => {

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
        
        const data = await response.json();
        setItems(data);
        console.log(data);
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
        console.log(data);
        setLoading(false);
      }
      else if (repository === 'All')
      {
         
        try{
          var res1 = await fetch(url);
          var data1 = await res1.json();
          var res2 = await fetch(url2);
          var data2 = await res2.json();
          
          var res = [...data1,...data2];
          setItems(res);
          console.log(res)
         }catch(e){
           console.error(e)
         }finally{
          //setLoading(false)
         }


      }
    }, [word, repository]);
    
   
    return{datas, isLoading}

}
  

export default useFetch;