import './styles.scss'
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addUser} from "./redux/userSlice";

function App() {
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const initial =
    {
        id: 1,
            name:'Вася',
        age:22,
        status: '-',
        avatar: '',
    }

    console.log(users);
    return (
    <div className="App">
        <h1>{1}</h1>
      <Button onClick={()=> dispatch(addUser(initial))} variant="text">Text</Button>
    </div>
  );
}

export default App;
