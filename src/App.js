import React, { Component } from 'react';
import shuffle from 'lodash.shuffle';
import './App.css';
import GuessCount from './GuessCount'
import Card from './Card'
import HallOfFame, { FAKE_HOF } from './HallOfFame'
import Damien from './users/damien.jpg'
import Hugo from './users/hugo.jpg'
import Thibaut from './users/thibaut.png'

import Julien from './users/julien.jpg'
import memorylogo from './users/memory-board-games.svg'
const SIDE = 4
const SYMBOLS = [Damien,Hugo,Julien,Thibaut,Damien,Julien,Thibaut,Damien]
const VISUAL_PAUSE_MSECS = 750



class App  extends Component {
  
  state = {
    cards: this.generateCards(),
    currentPair: [],
    guesses: 0,
    matchedCardIndices: [],
  }
  handleNewPairClosedBy(index) {
    const { cards, currentPair, guesses, matchedCardIndices } = this.state

    const newPair = [currentPair[0], index]
    const newGuesses = guesses + 1
    const matched = cards[newPair[0]] === cards[newPair[1]]
    this.setState({ currentPair: newPair, guesses: newGuesses })
    if (matched) {
      this.setState({ matchedCardIndices: [...matchedCardIndices, ...newPair] })
    }
    setTimeout(() => this.setState({ currentPair: [] }), VISUAL_PAUSE_MSECS)
  }

  generateCards() {
    const result = []
    const size = SIDE * SIDE
    const candidates = shuffle(SYMBOLS)
    while (result.length < size) {
      console.log("candidates : "+candidates)
      console.log("results : "+ result)
      const card = candidates.pop()
      result.push(card, card)
    }
    return shuffle(result)
  }
  
  // Arrow fx for binding
handleCardClick = index => {
  const { currentPair } = this.state

  if (currentPair.length === 2) {
    return
  }

  if (currentPair.length === 0) {
    this.setState({ currentPair: [index] })
    return
  }

  this.handleNewPairClosedBy(index)
}

  getFeedbackForCard(index) {
    const { currentPair, matchedCardIndices } = this.state
    const indexMatched = matchedCardIndices.includes(index)
  
    if (currentPair.length < 2) {
      //return (indexMatched === currentPair[0] || index === currentPair[0]) ? 'visible' : 'hidden'
      return indexMatched  || index === currentPair[0] ? 'visible' : 'hidden'
    }
  
    if (currentPair.includes(index)) {
      return indexMatched ? 'justMatched' : 'justMismatched'
    }
  
    return indexMatched ? 'visible' : 'hidden'
  }
  

  render() {
    const { cards, guesses, matchedCardIndices } = this.state
    const won = matchedCardIndices.length === cards.length
    

    return (
      <div className="memory text-center bg-dark  ">

        <h1 className =  "text-light mb-5 pt-3">Bienvenue dans IG Memories  </h1>
        
        <h3 >  <GuessCount guesses={"Votre score : "+ guesses} /></h3> 
        
        <div className ="container">
          
          <div className ="row">
            
            {cards.map((card, index) => (
              
              <div className = "col-4 col-sm-4 col col-md-3 mb-2 ">
                <Card
                  
                  {...console.log(index%3)}
                  card={card}
                  feedback= {this.getFeedbackForCard(index)}
                  index={index}
                  key={index}
                  onClick={this.handleCardClick}
                />
               </div>
              
            ))}

          </div>
            
            
        </div>
        {won && <HallOfFame entries={FAKE_HOF} />}
      </div>
    );
    }
   
  
 
}

export default App;
