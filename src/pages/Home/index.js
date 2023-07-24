import React,{useState, useEffect} from 'react';
import './style.css'

function Home() {

  const [territories, setTerritories] = useState([]);

  useEffect(()=>{

    function loadApi(){
      let url = "http://localhost:8080/api/territory-svc/territory/all";

      fetch(url)
      .then((result)=> result.json())
      .then((json)=>{
        console.log(json);
        setTerritories(json)
      })
    }

    loadApi();
  }, []);

  return(
    <div className='container'>
      
      {territories.map((item)=>{
        return(
          <article key={item.id} className='content'>
            <strong className="nome">{item.name}</strong>
            <img src={`data:image/jpeg;base64, ${item.mainImage}`} alt={"item.name"} className="capa"/>
            <p>{item.briefDescription}</p>  
            <a className="botao">Acessar</a>        
          </article>
        )
      })}
    </div>
  );
}
  
  export default Home;
  