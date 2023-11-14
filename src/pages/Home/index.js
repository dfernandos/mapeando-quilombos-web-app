import './style.css'
import Map from '../../components/Map';

function Home() {
  
  return(
    <div className="container" >
      <h1 tabIndex="5"> Mapa dos Quilombos de Porto Alegre</h1>
      <div aria-label="Mapa dos territórios quilombolas em Porto Alegre">
        <Map className="Map"/>
      </div>
    </div>
  );
}
  
  export default Home;
  