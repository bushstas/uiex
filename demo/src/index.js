import React from 'react';
import {render} from 'react-dom';
import App from './App';

const box = document.createElement('div');
box.id = 'root';
document.body.appendChild(box);
render(<App/>, box);