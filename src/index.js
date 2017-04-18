import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './App';

var data = [
	{ text: 'call Rony', checked: false },
  	{ text: 'get a driving license', checked: true },
  	{ text: 'open a bank account', checked: false }
];

ReactDOM.render(
  <TodoApp data={data} />,
  document.getElementById('root')
);

//console.log('Hello World!');

