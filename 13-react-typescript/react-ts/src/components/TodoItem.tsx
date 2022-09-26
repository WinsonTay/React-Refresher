import Todo from "../types/todo";
import styles from "./TodoItem.module.css";
import TodosContextProvider from "../store/todos-context";
const TodoItem: React.FC<{ item: Todo , onClick: () => void} > = (props) => { 
    const onClickHandler = () => {
        props.onClick()
    }
  return (
    <li onClick ={onClickHandler} className={styles.item}>
      {props.item.text}
    </li>
  );
};
export default TodoItem;
