import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../stores';
import LevelGrid from '../Level/LevelGrid';
import Hud from '../Hud/Hud';
import './Game.css';

import {
    setGrubosc
} from './Redux/GameAction';


const Dimentions = {
    LevelGrid: {
        height: '70%',
        position: 'relative'
    },
    Hud: {
        height: '30%',
        borderTop: 'solid black',
        position: 'relative'
    }
};

const GameStatus = Object.freeze({
    CONTINUE: Symbol("continue"),
    WIN: Symbol("win"),
    LOSE: Symbol("lose")
});

const RowsInit = 10;
const ColsInit = 10;

@connect((store) => {
    return {
        grubosc: store.GameReducer.grubosc
    };
})

class Game extends Component {

    constructor() {
        super();
        let initGameObjects = this.getEmptyGameObjects(ColsInit, RowsInit);
        this.state = {
            cols: ColsInit,
            rows: RowsInit,
            fieldSize: 30,
            objects: [],
            gameObjects: initGameObjects
        }
    }
    random = {
        getCol: () => Math.floor(Math.random() * this.state.cols),
        getRow: () => Math.floor(Math.random() * this.state.rows),
        inSpan: (from, to) => Math.floor(Math.random() * to + from),
        fromZero: (to) => Math.floor(Math.random() * to),
        evil: () => {
            let tempObjects = [...this.state.gameObjects];
            let evils = [];

            for (let i = 0; i < tempObjects.length; i++) {
                for (let j = 0; j < tempObjects[i].length; j++) {
                    if (tempObjects[i][j] == 'evil')
                        evils.push({ x: i, y: j })
                }
            }

            if (evils.length > 1)
                return evils[Math.floor(Math.random() * evils.length)]
            else
                return evils[0]
        }
    }

    setDimension(rows, cols) {
        this.setState({
            cols,
            rows
        });
        this.setState({ gameObjects: this.getEmptyGameObjects(cols, rows) });
    }

    setFieldSize(fieldSize) {
        this.setState({
            fieldSize
        })
    }

    getEmptyGameObjects(cols, rows) {
        let tempObjects = [];
        for (let i = 0; i < cols; i++) {
            let temp = [];
            for (let j = 0; j < rows; j++) {
                temp.push(null);
            }
            tempObjects.push(temp);
        }
        return tempObjects;
    }

    randomNewEvil() {
        let randomEvil = this.random.evil();
        let tempObjects = [...this.state.gameObjects];
        switch (this.random.fromZero(4)) {
            case 0:
                if (randomEvil.x + 1 < this.state.cols && tempObjects[randomEvil.x + 1][randomEvil.y] === null) {
                    return { x: randomEvil.x + 1, y: randomEvil.y }
                };
                break;
            case 1:
                if (randomEvil.y + 1 < this.state.rows && tempObjects[randomEvil.x][randomEvil.y + 1] === null) {
                    return { x: randomEvil.x, y: randomEvil.y + 1 }
                }
                break;
            case 2:
                if (randomEvil.x - 1 >= 0 && tempObjects[randomEvil.x - 1][randomEvil.y] === null) {
                    return { x: randomEvil.x - 1, y: randomEvil.y }
                }
                break;
            case 3:
                if (randomEvil.y - 1 >= 0 && tempObjects[randomEvil.x][randomEvil.y - 1] === null) {
                    return { x: randomEvil.x, y: randomEvil.y - 1 }
                }
                break;
            default:
                return this.randomNewEvil();
        }
        return this.randomNewEvil();
    }

    checkGameStatus() {
        let tempObjects = [...this.state.gameObjects];

        for (let i = 0; i < tempObjects.length; i++) {
            for (let j = 0; j < tempObjects[i].length; j++) {
                if (tempObjects[i][j] === "evil") {
                    if (i + 1 < this.state.cols && tempObjects[i + 1][j] === null)
                        return GameStatus.CONTINUE;
                    if (i - 1 >= 0 && tempObjects[i - 1][j] === null)
                        return GameStatus.CONTINUE;
                    if (j + 1 <= this.state.rows && tempObjects[i][j + 1] === null)
                        return GameStatus.CONTINUE;
                    if (j - 1 >= 0 && tempObjects[i][j - 1] === null)
                        return GameStatus.CONTINUE;
                }
            }
        }
        return GameStatus.WIN;
    }

    gameOver(status) {
        if (status === GameStatus.WIN) {
            alert('Wygrałeś ziom!');
            this.resetGame();
        }
        else if (status === GameStatus.LOSE) {
            alert('Przegrałeś ziom!');
            this.resetGame();
        }
    }
    generateEvil() {
        let tempObjects = [...this.state.gameObjects];
        if (tempObjects.some(row => row.includes("evil")) === true) { // czy istnieje zlo?
            switch (this.checkGameStatus()) {
                case GameStatus.WIN:
                    this.gameOver(GameStatus.WIN);
                    return;
                case GameStatus.LOSE:
                    this.gameOver(GameStatus.LOSE);
                    return;
                default: break;
            }
            let newEvil = this.randomNewEvil();
            tempObjects[newEvil.x][newEvil.y] = 'evil';
        } else {
            //tempObjects[this.random.getCol()][this.random.getRow()] = 'evil';
            tempObjects[9][9] = 'evil';
        }

        this.setState({ gameObjects: tempObjects });
    }

    evilInterval = "";

    startNewGame() {
        //this.resetGame();
        this.evilInterval = setInterval(this.generateEvil.bind(this), 400);
    }

    resetGame() {
        clearInterval(this.evilInterval);
        this.setState({ gameObjects: this.getEmptyGameObjects(this.state.cols, this.state.rows) });
    }

    userClick(e) {
        let userObject = e.target.id.split('_');
        let tempObjects = [...this.state.gameObjects];

        if (tempObjects[userObject[1]][userObject[0]] == null) {
            tempObjects[userObject[1]][userObject[0]] = "good";
            this.setState({ gameObjects: tempObjects });
            //this.generateEvil();
        }
        else {
            alert("To pole jest już zajęte!")
        }
    }

    render() {
        return (
            <div style={{ height: '100vh', overflow: 'hidden' }}>
                <div className='game-screen' style={Dimentions.LevelGrid}>
                    <LevelGrid userClick={this.userClick.bind(this)} gameObjects={this.state.gameObjects} cols={this.state.cols} rows={this.state.rows} fieldSize={this.state.fieldSize} />
                </div>
                <button onClick={this.resetGame.bind(this)}>RESET</button>
                <div style={Dimentions.Hud}>
                    <Hud startClick={this.startNewGame.bind(this)} cols={30} rows={15} fieldSize={30} setDimension={this.setDimension.bind(this)} setFieldSize={this.setFieldSize.bind(this)} />
                </div>
            </div>);
    }

}

export default Game;