import React, { Component } from 'react';
import './main-game.css';
import PlayNumber from "./PlayNumber";
import utils from './math.js';
import StarsDisplay from "./StarsDisplay";

class App extends Component {
    state = {
        stars: utils.random(1,9),
        availableNums: [1,2,3,4,5],
        candidateNums: [2,3],
    };
    
    render() {
        const candidatesAreWrong = utils.sum(this.state.candidateNums) > this.state.stars;

        const numberStatus= (number) => {
            if(!this.state.availableNums.includes(number)) {
                return 'used';
            }
            if(this.state.candidateNums.includes(number)) {
                return candidatesAreWrong ? 'wrong' : 'candidate';
            }
            return 'available';
        }
        return(
            <div className="game">
                <div className="help">
                    Pick 1 or more numbers that sum to the number of stars
                </div>
                <div className="body">
                    <div className="left">
                        <StarsDisplay count={this.state.stars} />
                    </div>
                    <div className="right">
                        {utils.range(1,9).map(number => 
                                <PlayNumber 
                                key={number}
                                status={numberStatus(number)} 
                                number={number} />
                            )}
                    </div>
                </div>
                <div className="timer">Time Remaining: 10</div>
            </div>
        );
    }
}

export default App;