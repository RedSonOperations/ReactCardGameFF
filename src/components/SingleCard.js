import React from 'react'
import './SingleCard.css'
export default function SingleCard({card, handleChoice, flipped, disabled}) {

    const handleClick=() => {
        if(!disabled){
            handleChoice(card)
        }
    }

  return (
    <div className='card'>
        <div className={flipped ? "flipped": ""}>
            <img className='front' src={card.src} alt='card front'></img>
            <img className='back' src="/imgs/cover.jpeg" alt='card back' onClick={handleClick}></img>
        </div>
    </div>
  )
}
