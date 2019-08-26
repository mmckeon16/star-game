import React, { Component } from 'react';
import './main-game.css';
import PlayNumber from "./PlayNumber";
import utils from './math.js';
import StarsDisplay from "./StarsDisplay";

class App extends Component {
    state = {
        stars: utils.random(1,9),
        availableNums: utils.range(1,9),
        candidateNums: [],
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

        const onNumberClick = (num, currentStatus) => {
            //already clicked
            if(currentStatus == 'used') {
                return;
            }

            //candidate num
            const newCandidateNums = this.state.candidateNums.concat(num);
            if(utils.sum(newCandidateNums) != this.state.stars) {
                this.setState(this.state.candidateNums, newCandidateNums);
            } else {
                const newAvailableNums = this.state.availableNums.filter(
                    n => newCandidateNums.includes(n)
                );
                this.setState(this.state.stars, utils.randomSumIn(newAvailableNums, 9));
                this.setState(this.state.availableNums, newAvailableNums);
                this.setState(this.state.candidateNums([]));
            }
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
                                number={number} 
                                onClick={onNumberClick}
                                />
                            )}
                    </div>
                </div>
                <div className="timer">Time Remaining: 10</div>
            </div>
        );
    }
}

export default App;