import React,{useState, useEffect} from 'react';
import './style.css'
import Form from './components/Form'

function App(){

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
      <header>
        <strong>Hey</strong>
      </header>
      
      {territories.map((item)=>{
        return(
          <article key={item.id} className='content'>
            <strong className="nome">{item.name}</strong>
            <p>{item.content1}</p>
          </article>
        )
      })}
    </div>
  );
}
export default App;