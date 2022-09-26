import React, {PropsWithChildren, useState} from 'react'
import Todo from '../types/todo'
type TodosContextObj = {
    items:Todo[],
    addTodo: (text: string) => void;
    removeTodo:(id: string) => void;
    
}
interface Props {
    children: React.ReactNode
}
export const TodosContext  = React.createContext<TodosContextObj>({
    items:[],
    addTodo: (text: string) => {},
    removeTodo:(id: string) => {}
})

const TodosContextProvider: React.FC<Props> = (props) => {
    const [ todos, setTodos ] = useState<Todo[]>([])
    const addTodoHandler = (textToDo: string) => {
      const newTodo = new Todo(textToDo)
      setTodos((prevState)=>{
          return prevState.concat(newTodo)
      })
   }
   const removeItemHandler = (id: string) => {
      const filteredTodo = todos.filter(d => d.id != id)
      setTodos(filteredTodo)
   }
   const contextValue: TodosContextObj = {
        items: todos,
        addTodo: addTodoHandler,
        removeTodo: removeItemHandler
   }

    return (
        <TodosContext.Provider value={contextValue}>
            {props.children}
        </TodosContext.Provider>
    )
}
export default TodosContextProvider