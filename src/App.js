import React, { Component , Button} from 'react';
import shuffle from 'lodash.shuffle';

import './App.css';
import GuessCount from './GuessCount'
import Card from './Card'
import Damien from './users/damien.jpg'
import Hugo from './users/hugo.jpg'
import Thibaut from './users/thibaut.png'
import byebyelucas from './users/byebyelucas.jpg'
import fati from './users/teamFati.jpg'
import lucas from './users/lucasbg.jpg'
import promo from './users/promo.jpg'
import lucasmas from './users/lucasmas.jpg'
import trophy from './trophy.svg'
import vaynit from './users/vaynit.jpg'
const SIZE = 16
const SYMBOLS = [Hugo,byebyelucas,fati,Damien,Thibaut,lucas,promo,lucasmas]
const VISUAL_PAUSE_MSECS = 750



class App  extends Component {
  
  state = {
    cards: this.generateCards(),
    currentPair: [],
    guesses: 0,
    matchedCardIndices: [],
    show : false
  }
  refresh = () => {
    window.location.reload()
  };

  hideModal = () => {
    this.setState({ show: false });
  };

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
    const size = SIZE
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
    const { cards, guesses, matchedCardIndices, show } = this.state
    const won = matchedCardIndices.length === cards.length

    
  
    

    return (
      <div className="memory text-center bg-dark  ">

        <h1 className =  "text-light mb-5 pt-3"> Welcome to MemorIG ! </h1>

        {won ? (<div className = "row ">
                  <div className = "col-2 ">
                    <img src ={trophy} className ="trophy"></img>
                  </div>
                  <div className = "col-8 ">
                  
                    <h3 className =  "text-light">  <GuessCount guesses={"BRAVO tu as gagné en "+ guesses + " coups ! "} /></h3> 
                  </div>
                  <div className = "col-2 ">
                     <img src ={trophy}  className ="trophy"></img> 
                  </div>
         </div>
      ) : (
        <h5 className =  "text-light">  <GuessCount guesses={" Score : "+ guesses} /></h5> 
      )}
        
       
        
        <div className ="container  ">
          
          <div className ="row">
            
            {cards.map((card, index) => (
              
              <div className = "col-4 col-sm-4 col col-md-3 mb-2 mt-2">
                <Card
                  
                  
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
        {won && 
        
        <button type="button" class="btn btn-primary" onClick = {this.refresh}>Rejouer ! </button>
        
        
        }
              
              
      </div>
      
      
    );
    }
   
  
 
}

export default App;
