import React from 'react';
import {render} from 'react-dom';

const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
};

const getRandomItem = (items) => {
    return items.splice(getRandomArbitrary(0, (items.length - 1)), 1)[0];
};

const BingoSheet = (props) => {
    const {items} = props;
    const itemsCopy = items.slice();
    const squares = new Array(25);
    for(let i = 0; i < squares.length; i++) {
        if (i === 12) {
            squares[i] = (<div key={i} className="bingo--square">FREE</div>);
        }
        else {
            squares[i] = (<div key={i} className="bingo--square">{getRandomItem(itemsCopy)}</div>);
        }
    }
    return (
        <div className="bingo--container">
            {squares}
        </div>
    );
};
const bingoItems = [
    'Batman',
    'Superman',
    'Rick',
    'Arrow',
    'Link',
    'Mario',
    'Deadpool',
    'Spiderman',
    'Wonder Woman',
    'Captain America',
    'Ironman',
    'Pokemon Trainer',
    'Power Ranger',
    'Starlord',
    'Eleven',
    'Storm Trooper',
    'Daenerys',
    'Sailor Moon',
    'The Joker',
    'TARDIS',
    'Black Panther',
    'Member of Starfleet',
    'Darth Vader',
    'Harry Potter',
    'The Doctor',
    'Princess Peach'
];

render(<BingoSheet items={bingoItems} />, document.getElementById('app'));
