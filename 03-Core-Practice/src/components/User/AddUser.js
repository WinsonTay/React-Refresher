import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";
import Button from "../UI/Button";
const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error,setError] = useState();
  const addUserHandler = (e) => {
    e.preventDefault();
    //Validation
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
        setError({
            title:"Invalid Input",
            message:"Please Enter a valid name and age"
        })
      return;
    }
    if (+enteredAge < 1) {
        setError({
            title:"Invalid Age",
            message:"Please Enter valid age (>0)"
        })
      return;
    }
    props.onAddUser(enteredUsername, enteredAge);
    setEnteredUsername("");
    setEnteredAge("");
  };
  const userNameChangeHandler = (e) => {
    setEnteredUsername(e.target.value);
  };
  const ageChangeHandler = (e) => {
    setEnteredAge(e.target.value);
  };
  const errorHandler = () =>{
    setError(null)
  }
  return (
    <div>
      { error && <ErrorModal onConfirm={errorHandler} title={error.title} message={error.message} />}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label>Username</label>
          <input
            value={enteredUsername}
            onChange={userNameChangeHandler}
            id="user"
            type="text"
          ></input>
          <label>Age</label>
          <input
            value={enteredAge}
            onChange={ageChangeHandler}
            id="age"
            type="text"
          ></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};
export default AddUser;
