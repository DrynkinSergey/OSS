import React, {useEffect, useState} from 'react';
import '../styles.scss'
import {Link, useParams} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {editUser, getUser} from "../redux/userSlice";

const EditUser = () => {
    let {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser(id));
        console.log('dispatch')
    }, [])

    const user = useSelector((state) => state.users.singleUser);

    useEffect(() => {
        if (!user) {
            console.log('не загрузилось')
        } else if (user) {
            setName(user[0].name)
            setAge(user[0].age)
        }
    }, [user])
    const [name, setName] = useState('');
    const [age, setAge] = useState('');


    const handleSubmit = () => {
        const avatar = `https://avatars.dicebear.com/api/adventurer/${age}.svg`
        dispatch(editUser({id, name, age,avatar}))
    }

    return (
        <form className='addForm'>
            <h1>Изменить пользователя: {name}</h1>
            <TextField value={name} onChange={(e) => setName(e.target.value)} id="standard-required" label="Name"
                       variant="standard"/>
            <TextField value={age} type='number' onChange={(e) => setAge(e.target.value)} id="standard-required"
                       label="Age" variant="standard"/>

            <Link to='/'>
                <Button onClick={handleSubmit} sx={{mb: 1,}} variant="contained" color="success">Сохранить</Button>
            </Link>

            <Link to='/'>
                <Button sx={{mb: 1,}} variant="contained" color="error">Отмена</Button>
            </Link>
        </form>
    );
};

export default EditUser;
