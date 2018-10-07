import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../stores';
import './LevelGrid.css';
import Field from './Field';
class LevelGrid extends Component {

    getWidth(){
        return this.props.cols * (Number(this.props.fieldSize) + 2);
    }

    updateGrid() {
        let grid = [];
        const gameObjects=[...this.props.gameObjects];
        console.log('gameObjects',gameObjects);
        for (let i = 0; i < this.props.rows; i++) {
            for (let j = 0; j < this.props.cols; j++) {
                let object = gameObjects[j][i] !== null ? gameObjects[j][i] : null;
                grid.push(<Field key={i + '_' + j} id={i + '_' + j} fieldSize={this.props.fieldSize} type={object} userClick={this.props.userClick}/>)
            }
        }
        return grid;
    }

    render() {
        return (
            <div className='whole-grid' style={{ width: this.getWidth(), lineHeight: '0', margin: 'auto' }}>
                {this.updateGrid()}
            </div>
        )
    }

}

export default LevelGrid;