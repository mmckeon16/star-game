import React, { Component } from 'react';
import './main-game.css';
import PlayNumber from "./PlayNumber";
import utils from './math.js';
import StarsDisplay from "./StarsDisplay";


// Color Theme
const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
  };


class App extends Component {
    state = {
        stars: utils.random(1,9),
    };
    
    render() {
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
                                <PlayNumber key={number} number={number} />
                            )}
                    </div>
                </div>
                <div className="timer">Time Remaining: 10</div>
            </div>
        );
    }
}

export default App;