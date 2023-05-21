import './App.css'
import { useEffect, useState } from 'react'
import SingleCard from './components/SingleCard'
const cardImages=[
  {src: "./imgs/ff1.jpeg", id: 1, matched: false},
  {src: "./imgs/ff2.jpeg", id: 2, matched: false},
  {src: "./imgs/ff3.jpeg", id: 3, matched: false},
  {src: "./imgs/ff4.jpeg", id: 4, matched: false},
  {src: "./imgs/ff5.webp", id: 5, matched: false},
  {src: "./imgs/ff6.webp", id: 6, matched: false}
]


function App() {
  const [cards, setCards]=useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne]=useState(null)
  const [choiceTwo, setChoiceTwo]=useState(null)
  const [disabled, setDisabled]=useState(false)

  const shuffleCards=()=>{
    const shuffledCards=[...cardImages, ...cardImages]
      .sort(() => Math.random()-0.5)
      .map((card) => ({...card, id: Math.random() * 1000}))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice =(card)=>(
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

  )

  useEffect(()=>{
    
    if(choiceOne&&choiceTwo){
      setDisabled(true)
      if(choiceOne.src===choiceTwo.src){
        
        setCards(prevCards=>{
          return prevCards.map(card => {
            if(card.src===choiceOne.src){
              return {...card, matched: true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      }
      else{
        console.log("Match not found")
        setTimeout(()=>resetTurn(), 1000)
      }
    }

  }, [choiceOne, choiceTwo])

    const resetTurn = (card) => {
      setChoiceOne(null)
      setChoiceTwo(null)
      setTurns(prevTurns => prevTurns+1)
      setDisabled(false)
    }

    //start new game automatically
    useEffect(()=>{
      shuffleCards()
    }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard 
            key={card.id} 
            card={card} handleChoice={handleChoice} 
            flipped={card===choiceOne || card===choiceTwo || card.matched}
            disabled={disabled}/>
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App