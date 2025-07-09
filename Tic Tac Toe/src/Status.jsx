import './Status.css'
const Status=(props)=>{
return(<div className="status">
    <div className='turn'>{
          props.isbot
            ? (props.turn ? "It's your turn" : "It's the bot's turn, you have to wait")
            : (props.turn ? "It's Red's turn" : "It's Blue's turn")
        }</div>
    <div className='score'><label>Score:</label>
    <label >{props.score[0]}:{props.score[1]}</label></div>







</div>)
}
export default Status;