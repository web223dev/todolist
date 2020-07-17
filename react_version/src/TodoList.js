import React, { Component } from 'react'
import './App.css';

class TodoList extends Component {
  constructor(props){
    super(props);
    this.state = {
        value: '',
        id: 0,
        lists: [{
            id: 0,
            content: [],
            toggle_finish: false
        }],
        
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleTaskStatus = this.handleTaskStatus.bind(this);
  }
  handleChange(e){
    this.setState({
      value: e.target.value
    })
  }
  handleAddItem(){
    let { value, id } = this.state;
    console.log(id);
    this.setState(state => ({
        id: id + 1,
        lists: [...state.lists, {id: id, content: value}]
    }))
  }
  handleTaskStatus(index){
    this.setState(state => ({
        lists:[...state.lists, {...state.lists[index], toggle_finish: !this.state.lists.toggle_finish}]
    }))
  }

  render() {
    const { value, lists, toggle_finish } = this.state; console.log(lists);
    return (
      <div>
        <input type="text" onChange={this.handleChange} />
        <button onClick={this.handleAddItem}>Add</button>
        <p>{value}</p>       
        <ul className="todolist">
            {
            lists.length>0 && 
            lists.map((list, key) =>  
                <li 
                    key={key} 
                    onClick={() => this.handleTaskStatus(key)}
                    style={{textDecoration: toggle_finish === true ? 'line-through' : 'none'}}
                >{list.content}</li>
            )
            }
        </ul>
      </div>
    )
  }
}

export default TodoList;