import React from 'react';
import {render} from 'react-dom';

const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
};

const getRandomItem = (items) => {
    return items.splice(getRandomArbitrary(0, (items.length - 1)), 1)[0];
};

class BingoSquare extends React.Component {

    constructor() {
        super();
        this.stages = {
            TEXT: 'text',
            INIT: 'init',
            CAM: 'cam',
            PIC: 'pic'
        };
        this.state = {
            stage: this.stages.TEXT,
            width: 0,
            height: 0,
            mediaStream: null,
            streamUrl: null
        };
        this.squareRef = null;
        this.videoRef = null;
        this.canvasRef = null;

        this.handleClick = this.handleClick.bind(this);
        this.setSquareRef = this.setSquareRef.bind(this);
        this.setVideoRef = this.setVideoRef.bind(this);
        this.setCanvasRef = this.setCanvasRef.bind(this);
        this.startVideo = this.startVideo.bind(this);
        this.stopVideo = this.stopVideo.bind(this);
        this.captureImage = this.captureImage.bind(this);
    }

    render() {
        let content = null;
        switch(this.state.stage) {
            case this.stages.TEXT:
                content = this.props.name;
            break;

            case this.stages.INIT:
            case this.stages.CAM:
                content = (
                    <video
                        ref={this.setVideoRef}
                        width={this.state.width}
                        height={this.state.height}
                        src={this.state.streamUrl}
                        autoplay />
                );
            break;
        }

        return (
            <div key={this.props.key} className="bingo--square" ref={this.setSquareRef} onClick={this.handleClick}>
                {content}
                <canvas
                    ref={this.setCanvasRef}
                    width={this.state.width}
                    height={this.state.height}
                    style={{
                        visibility: this.state.stage === this.stages.PIC ? 'visible' : 'hidden'
                    }} />
            </div>
        );
    }

    componentDidUpdate() {
        if (this.state.stage === this.stages.CAM) {
            this.videoRef.play();
        }
    }

    handleClick() {
        console.log('click!');
        switch(this.state.stage) {
            case this.stages.TEXT:
                this.startVideo();
                this.setState({
                    stage: this.stages.INIT
                });
            break;

            case this.stages.CAM:
                this.captureImage();
            break;
        }
    }

    setSquareRef(node) {
        this.squareRef = node;
        this.setState({
            width: this.squareRef.offsetWidth,
            height: this.squareRef.offsetHeight
        });
    }

    setVideoRef(node) {
        this.videoRef = node;
    }

    setCanvasRef(node) {
        this.canvasRef = node;
    }

    startVideo() {
  
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({
            video: {
              width: this.state.width,
              height: this.state.height
            }
          }).then((mediaStream) => {
              this.setState({
                  mediaStream,
                  stage: this.stages.CAM,
                  streamUrl: window.URL.createObjectURL(mediaStream)
              });
          }).catch((err) => {
            console.log('somethin is wrong');
            console.log(err);
          });
        }
    }

    stopVideo() {
        this.videoRef.pause();
        this.videoRef.srcObject = null;
        this.state.mediaStream.getTracks()[0].stop();
    }

    captureImage() {
        const ctx = this.canvasRef.getContext('2d');
        ctx.drawImage(this.videoRef, 0, 0, this.state.width, this.state.height);
        this.stopVideo();
        this.setState({
            stage: this.stages.PIC
        });
    }
}

const BingoSheet = (props) => {
    const {items} = props;
    const itemsCopy = items.slice();
    const squares = new Array(25);
    for(let i = 0; i < squares.length; i++) {
        if (i === 12) {
            squares[i] = (<BingoSquare key={i} name="FREE"/>);
        }
        else {
            // squares[i] = (<BingoSquare key={i} name={getRandomItem(itemsCopy)} />);
            squares[i] = (<BingoSquare key={i} name={items[i]} />);
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
