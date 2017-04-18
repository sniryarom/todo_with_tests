import React from 'react';
import ReactDOM from 'react-dom';
//import styles from './AppStyles.css'; // Tell Webpack that Button.js uses these styles

const checkboxHideStyle = {
  display: 'none'
};

const inputBtnStyle = {
  marginRight: '20px'
};

const checkboxShowStyle = {
  display: 'block'
};

const todoListTypeStyle = {
  listStyleType: 'none'
};

const spanTextStrikeThroughStyle = {
  textDecoration: 'line-through'
};

const spanTextRegularStyle = {
  textDecoration: 'none'
};

const deleteBtnStyle = {
  margin: '30px'
};

const filterButtonStyle = {
  margin: '15px'
};



 class TodoApp extends React.Component {
  constructor(props){
     super(props);
     var newArray = [];
      this.props.data.map((item) => (  
                newArray.push({text: item.text, checked: item.checked})
            ))

     this.state = {text: '', textList: newArray}
     this.update = this.update.bind(this)
     this.addItem = this.addItem.bind(this)
     this.removeItem = this.removeItem.bind(this)
     this.handleKeyPress = this.handleKeyPress.bind(this)
   }

   update(e){
      this.setState({text: e.target.value})
   }

   addItem(){
    if (this.state.text !== '') {
      let newArray = this.state.textList.slice();    
      newArray.push({text: this.state.text, checked: false});   
      this.setState({textList: newArray, text: ''})
    }
    
  }

  handleKeyPress (event) {
  if(event.key == 'Enter'){
   this.addItem();  
  }
}

removeItem(e, index) {
    let array = this.state.textList;
    console.log('remove item clicked for index: ' + index)
    array.splice(index, 1);
    this.setState({textList: array});
  }
  
  render(){
     console.log('App render');
     return (
       <div className = "todo">
        <input type="text" style={inputBtnStyle} value={this.state.text} onChange={this.update} onKeyPress={this.handleKeyPress} />
        <button onClick={this.addItem} >ADD</button>
          <hr/>
          <div>
            <h1>ToDo List</h1>
            <TodoFilter list={this.state.textList} removeItemFunc={this.removeItem} />            
          </div>
       </div>
     )
   }
 } 

 /*
 *
 */
 class TodoFilter extends React.Component {
  constructor(props){
    super(props);
    this.state = {filter: 'all'}
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    // this.handleFilterAll = this.handleFilterAll.bind(this);
    // this.handleFilterOpen = this.handleFilterOpen.bind(this);
    // this.handleFilterCompleted = this.handleFilterCompleted.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleRemoveItem(e, index) {
    this.props.removeItemFunc(e, index);
  }

  // handleFilterAll() {
  //   setState({filter: 'all'})
  // }

  // handleFilterOpen() {
  //   setState({filter: 'open'};
  // }

  // handleFilterCompleted() {
  //   setState({filter: 'completed'})
  // }

  handleFilter(appliedFilter) {
    this.setState({filter: appliedFilter})
  }

  render(){
    let filter = this.state.filter;
    console.log('TodoList filter applied is: ' + filter);
    return (
      <div>
        <div>          
          <span style={filterButtonStyle}><a href="#" onClick={() => this.handleFilter('all')}>All</a></span>
          <span style={filterButtonStyle}><a href="#" onClick={() => this.handleFilter('open')}>Open</a></span>
          <span style={filterButtonStyle}><a href="#" onClick={() => this.handleFilter('completed')}>Completed</a></span>
        </div>
        <TodoList list={this.props.list} filter={this.state.filter} removeItemFunc={this.handleRemoveItem} />
      </div>
      )
  }

 }

 

/**
*
*/
 class TodoList extends React.Component {

  constructor(props){
    super(props);
    this.state = {style: spanTextRegularStyle};
    this.checkItem = this.checkItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  handleRemoveItem(e, index) {
    this.props.removeItemFunc(e, index);
  }

  checkItem(e){
      console.log('add item clicked')
      if (e.target.checked) {
        this.setState({style: spanTextStrikeThroughStyle})
      }
      else {
       this.setState({style: spanTextRegularStyle}) 
      }
   }

  render(){
    console.log('TodoList render');
    const numOfItems = this.props.list.length;
    var filteredList = [];
    for (var i = 0; i < this.props.list.length; i++) {
      let item = this.props.list[i];
      switch(this.props.filter) {
        case 'open':
          if (!(item.checked)) {
            filteredList.push(item);  
          }
          break;
        case 'completed':
          if (item.checked) {
            filteredList.push(item);  
          }
          break;
        case 'all':
        default:
          filteredList.push(item);  
      }
    }
   
    return (
      <div>
        <ul id="todoList" style={todoListTypeStyle}>
        {
            filteredList.map((item, index) => (  
                <TodoItem key={index+item.text} index={index} text={item.text} checked={item.checked} removeItemFunc={this.handleRemoveItem}/>
            ))

            
        }    
        </ul>
        {numOfItems > 0 && 
          <span>Number of items:  {numOfItems}</span>
        }
      </div>
    )
  }
}


class TodoItem extends React.Component {
   constructor(props){
     super(props);
     this.state = {style: spanTextRegularStyle};
     this.checkItem = this.checkItem.bind(this);
     this.handleRemoveItem = this.handleRemoveItem.bind(this);
   }

   checkItem(e){
      console.log('add item clicked');
      if (e.target.checked) {
        this.setState({style: spanTextStrikeThroughStyle});
      }
      else {
       this.setState({style: spanTextRegularStyle});
      }
   }

   handleRemoveItem(e) {
    this.props.removeItemFunc(e, this.props.index);
  }

   render(){
    console.log('TodoItem render');
    const itemStyle = this.props.checked ? spanTextStrikeThroughStyle : spanTextRegularStyle
     return (
       <li>
            <input type="checkbox" onClick={this.checkItem} />
            <span style={itemStyle}>{this.props.text}</span>
            <a href='#' style={deleteBtnStyle} onClick={this.handleRemoveItem}>delete</a>
       </li>
     )
   }
 }



 export default TodoApp
