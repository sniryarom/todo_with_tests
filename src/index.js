import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './App';

var data = [
	{ text: 'call Rony', completed: false },
	{ text: 'get a driving license', completed: true },
	{ text: 'open a bank account', completed: false }
];

ReactDOM.render(
  <TodoApp data={data} />,
  document.getElementById('root')
);

//console.log('Hello World!');
