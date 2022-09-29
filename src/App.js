import { useEffect, useState } from 'react'
import './App.css'
import { SingleCard } from './components/singleCard'

const cardImages = [
  { "src": "/img/David_Ben-Gurion.png", matced: false},
  { "src": "/img/Benjamin_Netanyahu.png", matced: false},
  { "src": "/img/Yitzhak_Shamir.png", matced: false},
  { "src": "/img/Golda_Meir.png", matced: false},
  { "src": "/img/menachem_begin.png", matced: false},
  { "src": "/img/Moshe_Sharett.png", matced: false},
]
function App() {
const [cards, setCards]= useState([])
const [choiceOne, setChoiceOne] = useState(null)
const [choiceTwo, setChoiceTwo] = useState(null)
const [disabled, setdisabled] = useState(false)
// shoffle cards
const shuffleCards = () => {
  const shuffleCards = [...cardImages, ...cardImages]
  .sort(() => Math.random() - 0.5)
  .map((card) => ({...card, id: Math.random() }))

  setCards(shuffleCards)
}

// handle a choice
const handleChoice = (card) =>{
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
}

// compare 2 selected cards
useEffect(()=> {
  if (choiceOne && choiceTwo){
    setdisabled(true)
    if (choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card =>{
            if (card.src === choiceOne.src){
              return {...card, matched: true}
            } else {
              return card
            }
          })  
        })
      resetTurn()
    } else {

      setTimeout(()=> resetTurn(), 1000)
    }
  }
}, [choiceOne,choiceTwo])

//reset hoices and increase turn
const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setdisabled(false)
}

  return (
    <div className="App">
      <h1>משחק הזכרון, ממשלת ישראל</h1>
      <h2>התאם את תמונותם של ראשי הממשלות</h2>
      <button onClick={shuffleCards}>New Game</button>
      
      <div className='card-grid'>
      {cards.map(card =>(
        <SingleCard key={card.id} card={card} handleChoice={handleChoice}  flipped={card === choiceOne || card === choiceTwo || card.matched} disabled={disabled}/>
        ))}
      </div>
    </div>
    
  );
}

export default App