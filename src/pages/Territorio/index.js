import { useParams } from "react-router-dom";

function Territorio() {

    const { id } = useParams();
    return (
      <div>
  
        <h1>
            Territoório é {id}
            </h1>
  
      </div>
    );
  }
  
  export default Territorio;
  