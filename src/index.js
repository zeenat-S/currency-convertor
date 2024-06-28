import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// old React =>
// ReactDOM.render(<App/>, document.getElementById('root'))

// new React =>
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
