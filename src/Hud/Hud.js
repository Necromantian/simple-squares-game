import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../stores';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import './Hud.css';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
    button: {
        margin: theme.spacing.unit,
  },
});

class Hud extends Component {

    constructor(props) {
        super(props);
        this.state={
            cols: this.props.cols,
            rows: this.props.rows,
            fieldSize: this.props.fieldSize
        }
    }
    handleChange(event) {
        switch(event.target.name){
            case 'cols':
                this.setState({cols: event.target.value})
            break;

            case 'rows':
                this.setState({rows: event.target.value})
            break;

            case 'fieldSize':
                this.setState({fieldSize: event.target.value})
            break;
        }
        //this.setState({value: event.target.value.toUpperCase()});
    }

    render() {
        const { classes } = this.props;
        return (
        <div className='hud-container'>
            <div className={'start-button-container'}>  
                <Button className='start-button' size="medium" color='primary' variant="contained" onClick={()=>this.props.startClick()}>
                    Start!
                </Button>
            </div>  
            <div className='settings-container'>
                <form className={classes.container}>     
                    <TextField className={classes.textField} margin="normal" type="number" label="Liczba wierszy" name="rows" value={this.state.rows} onChange={this.handleChange.bind(this)} />   
                    <TextField className={classes.textField} margin="normal" className='single-input' type="number" label="Liczba kolumn" name="cols" value={this.state.cols} onChange={this.handleChange.bind(this)} />              
                    <Button className={classes.button+ " hud-button"} variant="outlined" onClick={()=>this.props.setDimension(this.state.rows,this.state.cols)}>
                        Ustaw rozmiar planszy
                    </Button>
                </form>
                <form className={classes.container}>  
                    <TextField className={classes.textField} margin="normal" type="number" label="Rozmiar jednego pola" name="size" value={this.state.fieldSize} onChange={this.handleChange.bind(this)} />
                    <Button className={classes.button + " hud-button"} name ='fieldSize' variant="outlined" onClick={()=>this.props.setFieldSize(this.state.fieldSize)} onChange={this.handleChange.bind(this)}>
                        Ustaw rozmiar jednego pola
                    </Button>
                </form>  
            </div>
        </div>);
    }

}

export default withStyles(styles)(Hud);