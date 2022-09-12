import React, { useState } from 'react'
import './Todo.css'


function Todo() {
  
  const TodoInput = document.getElementById('TodoInput')
  const [ currentTodo, setCurrentTodo ] = useState('')
  const [ todoList, setTodoList ] = useState([])
  



  const handleNewTodo = () => {
    const listItem = {currentTodo, id: new Date().getTime().toString()}
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
  TodoInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      handleNewTodo()
    }
  });
  
  return (
    <>  
        <span className='cover-div'></span>
        <div className='TodoContainer'>
            <h1>T O D O</h1>
            <div className='TodoInput' id='TodoInput'>
              <i className="fa-regular fa-circle" onClick={() => handleNewTodo()}></i>
              <input 
                     value={currentTodo}
                     type='text' 
                     id='currentTodo'
                     name='currentTodo'
                     onChange={(e) => setCurrentTodo(e.target.value) } 
                     placeholder=' Create a new todo...' 
              />
              
            </div>
            <form className='newTodosContainer' id='newTodosContainer'>
                {todoList.map((todo) =>{
                  const {currentTodo, id} = todo;
                  return (
                    <div className='newTodos' key={id}>
                        <i className="fa-regular fa-circle"></i>
                        <p >
                          {currentTodo}
                        </p>
                        <i class="fa-solid fa-trash" onClick={()=> handleClearTodo(id)}></i>
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