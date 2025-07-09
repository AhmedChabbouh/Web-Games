
import './Card.css';
function Card(props){
return (
    <div className="card" onClick={props.onclick}>
        <img src={props.image} className="card-img-top" alt="card image" />
        <h3 className="card-title">{props.title}</h3>
    </div>


        )
}
export default Card;