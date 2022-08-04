import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addUser} from "../redux/userSlice";

const AddUser = () => {

    const initial =
        {
            id: Date.now(),
            name:'Вася',
            age:Date.now(),
            status: '-',
            avatar: '',
        }
    const dispatch = useDispatch();
    return (
        <div style={{display:'flex',
        flexDirection:'column'}}>
          <h1>Add</h1>
           <Button onClick={()=> dispatch(addUser(initial))} sx={{mb: 1,}} variant="contained" color="success">Add</Button>
            <Link to='/'><Button sx={{mb: 1,}} variant="contained" color="error">Back</Button></Link>

        </div>
    );
};

export default AddUser;
