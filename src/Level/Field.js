import React, { Component } from 'react';

const Field = props => {
    const {fieldSize, id, type, userClick} = props;
  return (
    <div onClick={userClick.bind(this)} className={type} id={id} title={id} style={{height: fieldSize,display: 'inline-block', width: fieldSize,border:'solid black thin'}}></div>
  );
};

export default Field;