import React from 'react';

// Color Theme
const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
};

const PlayNumber = props => (
    <button 
        className="number" 
        onClick={() => console.log('Num', props.number)}
        style = {{ backgroundColor: colors[props.status]}}
    >
        {props.number}
    </button>
);

export default PlayNumber;