import Card from './Card.jsx';
import React, { useState, useEffect } from 'react';  
import './App.css';
function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const[CardList, setCardList] = useState([]);
  const shuffleCards = () => {
    const shuffled = [...CardList];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setCardList(shuffled);}
  const handleClick = (e) => {
    
    if (clickedCards.includes(e)) {
      alert("You already clicked this card! Game Over!");
      setScore(0);
      setClickedCards([]);
    } else {
      setClickedCards([...clickedCards, e]);
      setScore(score + 1);
      if (score + 1 === 10) {
        alert("Congratulations! You've clicked all cards!");
        setScore(0);
        setClickedCards([]);
      }
      if (score + 1 > highScore) {
        setHighScore(score + 1);
      }
    }

    shuffleCards();
    

  };
   useEffect(() => {
  const cards = [
      {
        image: "https://comicvine.gamespot.com/a/uploads/square_small/11117/111178336/7080202-1635462455-unkno.png",
        title: "Monkey D. Luffy"
      },
      {
        image: "https://comicvine.gamespot.com/a/uploads/square_small/11117/111178336/7080194-7382724028-unkno.png",
        title: "Roronoa Zoro"
      },
      {
        image: "https://comicvine.gamespot.com/a/uploads/square_small/11117/111178336/7080201-7164581366-unkno.png",
        title: "Nami"
      },
      {
        image: "https://comicvine.gamespot.com/a/uploads/square_small/11117/111178336/7080203-3155899631-unkno.png",
        title: "Usopp"
      },
      {
        image: "https://comicvine.gamespot.com/a/uploads/square_small/4/47703/2434111-473592_sanji_time_skip_1.png",
        title: "Sanji"
      },
      {
        image: "https://comicvine.gamespot.com/a/uploads/square_small/4/47703/2434113-chopper_time_skip_2.png",
        title: "Tony Tony Chopper"
      },
      {
        image: "https://comicvine.gamespot.com/a/uploads/square_small/4/47703/2434105-render_nicorobin.png",
        title: "Nico Robin"
      },
      {
        image: "https://comicvine.gamespot.com/a/uploads/square_small/4/47703/2434115-473629_untitled_2.png",
        title: "Franky"
      },
      {
        image: "https://comicvine.gamespot.com/a/uploads/square_small/4/47703/2434117-473497_brook_timeskip1.png",
        title: "Brook"
      },
      {
        image: "https://comicvine.gamespot.com/a/uploads/square_small/4/47703/3056239-7978640494-Jinbe.png",
        title: "Jimbei"
      }
    ];
    setCardList(cards);
  }, []);
return(
<>
<div className="scoreboard">
    <h1>One Piece Memory Game</h1>
    <p>Get points by clicking on an image but don't click on any more than once!</p>
    <h2>Score: {score}</h2>
    <h2>High Score: {highScore}</h2>
  </div>
<div className="container">
  
    {CardList.map((card, index) => (
      <Card
        image={card.image}
        title={card.title}
        onclick={() => handleClick(card.title)}
      />
    ))}
  </div>  


</>
  )
  
}


export default App
