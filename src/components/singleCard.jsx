import './singleCard.css'

export function SingleCard({card, handleChoice, flipped, disabled}) {
    
    const handleClick = () => {
      if(!disabled){
        handleChoice(card)
      }
    }

  return (
    <div className='card'>
         <div className={flipped ? 'flipped': ''}>
            <img className='front' src={card.src} alt='card front'/>
            <img className='back' src='/img/cover.png' onClick={!disabled ? handleClick : null} alt='card back'/>
        </div>
    </div>
  )
}
