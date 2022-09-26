import { useContext } from "react";
import Todo from "../types/todo";
import TodoItem from "./TodoItem";
import styles from "./Todos.module.css"
import { TodosContext } from "../store/todos-context";
const Todos: React.FC = (props) => {
    const todosCtx = useContext(TodosContext)
    return (
    <ul className={styles.todos}>
      {todosCtx.items.map((item) => (
        <TodoItem onClick={todosCtx.removeTodo.bind(null, item.id)} key={item.id}  item={item} />
      ))}
    </ul>
  );
};
export default Todos;
