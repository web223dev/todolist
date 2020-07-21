import React, { useState, useReducer } from 'react'

function reducer(state, action){
  switch(action.type){
    case "add-todo":
      return {
        todos: [...state.todos, {text: action.text, complated: false}] 
      };
    case "toggle-todo":
      return {
        todos: state.todos.map((t, i) => 
        i === action.idx ? {...t, complated: !t.complated} : t)
      };
    default: 
      return state;
  }
}

const App = () => {
  const [{todos}, dispatch] = useReducer(reducer, { todos: [] });
  const [text, setText] = useState("");
  return (
    <div>
      <form onSubmit={ e => {
        e.preventDefault();
        dispatch({type: "add-todo", text});
        setText("");
      }}>
        <input value={text} onChange={e => setText(e.target.value)} />
      </form>
      {todos && todos.map((todo, idx) => ( 
        <div 
        key={idx} 
        onClick={() => dispatch({type: "toggle-todo", idx})}
        style={{
          textDecoration: todo.complated ? 'line-through' : ''
        }}
        >
          {todo.text}
        </div>
      ))}
      <pre>{JSON.stringify(todos, null, 2)}</pre>
    </div>
  )
}

export default App



// 오늘 배운것
// 1. action.text를 쓸수 있다는것
// 2. todo list를 진행하려면 map을 써야한다는것과 키(index)가 필요하다 왜? 내가 목록을 선택했을때 어느것인지를 알아야 하니까...
//3. todolist에서 form을 쓰는 리유는 enter를 눌러서 submit가 되게하기위해서이다. 여기서 중요한것은 submit가 될때 page가 reload가 되므로 꼭 e.preventDefault()를 써주어야 한다는것
//4. action.payload에서 만일 action.text를 쓰려면 dispatch할때  dispatch({type: "add-todo", text}); 이런 형식으로 써줘야 한다.
//5. JSON형식으로 자기가 올린 목록을 보려면 <pre>{JSON.stringify(todos, null, 2)}</pre> 이렇게 해주면 된다