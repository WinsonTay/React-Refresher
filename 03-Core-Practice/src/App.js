import React, {useState} from 'react';
import AddUser from './components/User/AddUser'; 
import UsersList from './components/User/UsersList';

function App() {
  const [usersList, setUsersList] = useState([])
  const addUserHandler  = (username, age) =>{
    setUsersList((prevState) => {
      let updateData = [...prevState]
      updateData.push({username,age})
      return updateData
    })
  }
  return (
    <div>
        <AddUser onAddUser={addUserHandler}/>
        <UsersList users={usersList} />
    </div>
  );
}

export default App;
