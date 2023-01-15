import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Artboard from './artboard/Artboard';
import Nav from './nav-footer/Nav';
import reportWebVitals from './reportWebVitals';
import Panel from './panel/Panel';

// Global initial client width
export const viewportWidth = document.documentElement.clientWidth;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Nav />
    <Artboard />
    <Panel />
  </React.StrictMode>
);

reportWebVitals(console.log);
