import './style.css'
import Map from '../../components/Map';

function Home() {
  return (
    <div className="home">
      <div className="home-intro">
        <p className="eyebrow">Territórios quilombolas</p>
        <h1 tabIndex="5">Mapa dos Quilombos de Porto Alegre</h1>
        <p className="lede">
          Histórias, memórias e caminhos dos quilombos da cidade, para a sala de aula e para quem quer conhecer esses territórios.
        </p>
      </div>
      <div aria-label="Mapa dos territórios quilombolas em Porto Alegre">
        <Map />
      </div>
    </div>
  );
}

export default Home;
