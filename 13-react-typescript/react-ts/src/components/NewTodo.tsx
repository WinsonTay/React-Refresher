import React , {useRef , useContext} from "react"
import { TodosContext } from "../store/todos-context"
import styles from "./NewTodo.module.css"

const NewTodo: React.FC = () => {
 const todoTextInputRef =  useRef<HTMLInputElement>(null)
 
 const todosCtx = useContext(TodosContext)

 const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    const enteredText = todoTextInputRef.current!.value;   

    if(enteredText.trim().length === 0){
        return
    }
    todosCtx.addTodo(enteredText)

    // props.onAddToDo(enteredText)

}
    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <label htmlFor='text'>Todo Text</label>
            <input type='text' id='text' ref={todoTextInputRef}></input>
            <button>Add Todo</button>
        </form>
    )
}

export default NewTodo