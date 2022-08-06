import React, {useState} from 'react';
import '../styles.scss'
import {Link} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {addUser} from "../redux/userSlice";
import {v4 as uuid} from 'uuid';
import axios from "axios";


const AddUser = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState(false)
    const apiUrl = `https://yesno.wtf/api`;
    const unique_id = uuid().slice(0, 8);

    const handleSubmit = async () => {

        const status = await axios.get(apiUrl);
        const avatar = `https://avatars.dicebear.com/api/adventurer/${age}.svg`

        const newUser = {
            id: unique_id,
            name,
            age,
            status: status.data.answer === 'yes' ? 'Активен' : '-',
            avatar
        }
        dispatch(addUser(newUser))

    }


    const dispatch = useDispatch();
    return (
        <form className='addForm'>
            <h1>Добавить пользователя:</h1>
            <TextField required onChange={(e) => setName(e.target.value)} id="standard-basic" label="Имя"
                       variant="standard"/>
            <TextField required type='number' onChange={(e) => setAge(e.target.value)} id="standard-basic"
                       label="Возраст" variant="standard"/>

            {name && age ? <Link to='/'>
                <Button onClick={handleSubmit} sx={{mb: 1,}} variant="contained" color="success">Добавить</Button>
            </Link>
            :
                <Button disabled onClick={handleSubmit} sx={{mb: 1,}} variant="contained" color="success">Добавить</Button>
            }


            <Link to='/'>
                <Button sx={{mb: 1,}} variant="contained" color="error">Отмена</Button>
            </Link>
        </form>
    );
};

export default AddUser;
