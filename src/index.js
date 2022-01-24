import React from 'react';
import ReactDOM from 'react-dom';
import QuoteGen from './randQuote.jsx';

ReactDOM.render(
  <React.StrictMode>
    <div id="wrapper">
    <QuoteGen />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
