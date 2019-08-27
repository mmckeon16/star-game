import React, { Component } from 'react';
import './main-game.css';
import PlayNumber from "./PlayNumber";
import utils from './math.js';
import StarsDisplay from "./StarsDisplay";
import PlayAgain from "./PlayAgain";
import { reset } from 'ansi-colors';

class App extends Component {
    state = {
        stars: utils.random(1,9),
        availableNums: utils.range(1,9),
        candidateNums: [],
    };
    
    render() {
        const candidatesAreWrong = utils.sum(this.state.candidateNums) > this.state.stars;
        const gameIsDone = this.state.availableNums.length ===0;

        const resetGame = () => {
            this.setState({
                stars: utils.random(1,9),
                availableNums: utils.range(1,9),
                candidateNums :[],
            });
        }

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
            if(currentStatus === 'used') {
                return;
            }

            //candidate num
            const newCandidateNums = 
                currentStatus === 'available' ? 
                this.state.candidateNums.concat(num)
                : this.state.candidateNums.filter(cn => cn !== num);
            if(utils.sum(newCandidateNums) !== this.state.stars) {
                this.setState({candidateNums: newCandidateNums});
            } else {
                const newAvailableNums = this.state.availableNums.filter(
                    n => !newCandidateNums.includes(n)
                );
                this.setState({
                    stars: utils.randomSumIn(newAvailableNums, 9),
                    availableNums: newAvailableNums,
                    candidateNums: []
                });
            }
        }

        return(
            <div className="game">
                <div className="help">
                    Pick 1 or more numbers that sum to the number of stars
                </div>
                <div className="body">
                    <div className="left">
                        {gameIsDone ?
                            (<PlayAgain onClick={resetGame}/>)
                            : (<StarsDisplay count={this.state.stars} />
                        )}
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