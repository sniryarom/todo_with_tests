import React from 'react';
import classNames from 'classnames/bind';
import styles from '../style/list.css';

const cx = classNames.bind(styles);

class TodoApp extends React.Component {
 constructor(props){
    super(props);
    var newArray = [];
    this.props.data.map((item) => (
       newArray.push({text: item.text, completed: item.completed})
   ))

    this.state = {text: '', textList: newArray}
    this.update = this.update.bind(this)
    this.addItem = this.addItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.checkItem = this.checkItem.bind(this);
  }

  update(e){
     this.setState({text: e.target.value})
  }

  addItem(){
   if (this.state.text !== '') {
     let newArray = this.state.textList.slice();
     newArray.push({text: this.state.text, completed: false});
     this.setState({textList: newArray, text: ''})
   }

 }

 handleKeyPress (event) {
 if(event.key == 'Enter'){
  this.addItem();
 }
}

checkItem(e, index){
     let array = this.state.textList;
     if (e.target.checked) {
       array[index].completed = true;
     }
     else {
      array[index].completed = false;
     }

     this.setState({textList: array});
  }

removeItem(e, index) {
   let array = this.state.textList;
   array.splice(index, 1);
   this.setState({textList: array});
 }

 render(){
    return (
      <div className={cx('todo')}>
        <form >
          <input type="text" className={cx('taskEntry')} value={this.state.text} onChange={this.update} onKeyPress={this.handleKeyPress} />
          <button onClick={this.addItem} >Add Todo</button>
        </form>
       <hr/>
       <div>
        <h1>Todo List</h1>
         <TodoFilter list={this.state.textList} checkItem={this.checkItem} removeItemFunc={this.removeItem} />
       </div>
      </div>
    )
  }
}

class TodoFilter extends React.Component {
 constructor(props){
   super(props);
   this.state = {filter: 'all'}
   this.handleRemoveItem = this.handleRemoveItem.bind(this);
   this.checkItem = this.checkItem.bind(this);
   this.handleFilter = this.handleFilter.bind(this);
 }

 handleRemoveItem(e, index) {
   this.props.removeItemFunc(e, index);
 }

 checkItem(e, index){
     this.props.checkItem(e, index);
  }

 handleFilter(appliedFilter) {
   this.setState({filter: appliedFilter})
 }

 render(){
   let filter = this.state.filter;

   const renderFilter = (filter, currentFilter) => {
     return (filter === currentFilter ? <span className={cx('filterItem')}>{filter}</span> : <a href="#"  className={cx('filterItem')} onClick={() => this.handleFilter(filter)}>{filter}</a>)
   };
   return (
     <div>
       <div>
         Show:
         {" "}
         {renderFilter('all',  filter)}
         {", "}
         {renderFilter('active', filter)}
         {", "}
         {renderFilter('completed', filter)}
       </div>
       <TodoList list={this.props.list} filter={this.state.filter} checkItem={this.checkItem} removeItemFunc={this.handleRemoveItem} />
     </div>
     )
 }

}

class TodoList extends React.Component {
  constructor(props){
    super(props);
    this.checkItem = this.checkItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  handleRemoveItem(e, index) {
    this.props.removeItemFunc(e, index);
  }

  checkItem(e, index){
    this.props.checkItem(e, index);
 }
  render() {
    var filteredList = [];
    for (var i = 0; i < this.props.list.length; i++) {
      let item = this.props.list[i];
      switch(this.props.filter) {
        case 'active':
          if (!(item.completed)) {
            filteredList.push(item);
          }
          break;
        case 'completed':
          if (item.completed) {
            filteredList.push(item);
          }
          break;
        case 'all':
        default:
          filteredList.push(item);
      }
    }
    const numOfItems = filteredList.length;

    return (
      <div>
        <ul id="todoList" className={cx('todolist')}>
        {
            filteredList.map((item, index) => (
                <TodoItem key={index+item.text} index={index} text={item.text} checked={item.completed} checkItem={this.checkItem} removeItemFunc={this.handleRemoveItem}/>
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

// todolist__todoDetails___2EAmo todolist__spanTextStrikeThroughStyle___J4Wfe
class TodoItem extends React.Component {
   constructor(props){
     super(props);
     this.checkItem = this.checkItem.bind(this);
     this.handleRemoveItem = this.handleRemoveItem.bind(this);
   }

   checkItem(e){
      this.props.checkItem(e, this.props.index)
   }

   handleRemoveItem(e) {
    this.props.removeItemFunc(e, this.props.index);
  }

   render(){
     return (
       <li>
            <input className={cx('todoToggle')} type="checkbox" defaultChecked={this.props.checked} onClick={this.checkItem} />
            <span className={cx('todoDetails', {'isCompleted': this.props.checked})}>{this.props.text}</span>
            <a href='#' className={cx('todoDelete')} onClick={this.handleRemoveItem}>delete</a>
       </li>
     )
   }
 }

export default TodoApp;
