import React from 'react';
import {BUTTON} from './Button.css';

const Button = ({children}) => (
  <button className={BUTTON}>
    {children}
  </button>
);

export default Button;
