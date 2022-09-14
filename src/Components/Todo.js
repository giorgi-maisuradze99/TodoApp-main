import React, { useState } from 'react'
import './Todo.css'
import bg from './bg-purp.jpg'

function Todo() {
  
  const TodoInput = document.getElementById('TodoInput')
  const [ isTaskCrossed, setIsTaskCrossed] = useState(false)
  const [ currentTodo, setCurrentTodo ] = useState('')
  const [ todoList, setTodoList ] = useState([])
  

/*
  const handleCrossedTask = (isTaskCrossed) =>{
    setIsTaskCrossed(!isTaskCrossed)
  }
  if(isTaskCrossed){
    console.log('task is crossed')
  }
*/
  const handleNewTodo = () => {
    const listItem = { isTaskCrossed, currentTodo, id: new Date().getTime().toString() }
    if(currentTodo !== ''){
      setTodoList((todoList) => {
        return [...todoList, listItem]
        
      })
      setCurrentTodo('')
    }
  }
  const handleClearTodo = (id) =>{
    let newToDoList = todoList.filter((listItem) => listItem.id !== id)
    setTodoList(newToDoList)
  }

  const handleClearTodos = () =>{
    setTodoList([])
  }

/*
  TodoInput.addEventListener('keydown', function (e) {
    console.log('eventlistening');
    
    
    if (e.key === 'Enter') {
      console.log('added Todo');
      handleNewTodo()
    }
  });
*/
const onKeyDown = (event) => {
  // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
  if (event.key === 'Enter') {
    event.preventDefault();
    event.stopPropagation();
    handleNewTodo();
  }
}
  return (
    <>  
    <div className='bgcontainer'>

        <img src={bg} className='background'></img>
    </div>
        <div className='TodoContainer'>
            <h1>T O D O</h1>
            <div className='TodoInput' id='TodoInput'>
             
                 <i className="fa-regular fa-circle" onClick={() => handleNewTodo()}></i>
             
              <input 
                     value={currentTodo}
                     type='text' 
                     id='currentTodo'
                     name='currentTodo'
                     onKeyDown={onKeyDown}
                     onChange={(e) => setCurrentTodo(e.target.value) } 
                     placeholder=' Create a new todo...' 
              />
              
            </div>
            <form className='newTodosContainer' id='newTodosContainer'>
                {todoList.map((todo) =>{
                  const {currentTodo, id, isTaskCrossed} = todo;
                  return (
                    <div className='newTodos' key={id}>
                        <i className="fa-regular fa-circle"></i>
                        <p >
                          {currentTodo}
                        </p>
                        <i className="fa-solid fa-trash" onClick={()=> handleClearTodo(id)}></i>
                    </div>
                  )
                })}
            </form>
              <div className='managingDiv'>
                <p>
                  {todoList.length} Items Left
                </p>
                <a onClick={() => handleClearTodos()}>Clear All</a>
              </div>
        </div>
    </>
  )
}

export default Todo