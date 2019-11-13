import React from 'react'
import PropTypes from 'prop-types'

import Mystere from './users/myster.png'
import './Card.css'

//const HIDDEN_SYMBOL = '❓'

const Card = ({ card, feedback, index, onClick , imgUrl }) => (
    <div className={`card ${feedback}`} onClick={() => onClick(index)}>
      <span className="symbol">
        {feedback === 'hidden' ? <img src = {Mystere} alt ={Mystere} className="img-thumbnail  width: 80% height: 80%"></img> : <img src = {card} alt ={card} className="img-thumbnail  width: 80% height: 80%"></img>}
      </span>
    
    </div>
  )
  
  Card.propTypes = {
    card: PropTypes.string.isRequired,
    feedback: PropTypes.oneOf([
      'hidden',
      'justMatched',
      'justMismatched',
      'visible',
    ]).isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
  }
  export default Card