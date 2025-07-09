import './Square.css'

const Square=(props)=>{

    
return(
    
    <div id ={props.id} className={`${props.value=='X'? "Red":"Blue" } square ${props.position}`} onClick={props.handleClick}>
        {props.value}
    </div>
)

}
export default Square;