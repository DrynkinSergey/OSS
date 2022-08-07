import React, {useEffect, useState} from 'react';
import '../styles.scss'
import {Link, useParams} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {editUser, getUser} from "../redux/userSlice";
import styles from "./AddUser/AddUser.module.scss";
import {ReactComponent as Logo} from "../img/osSystemLogo.svg";
import {ReactComponent as Arrow} from "../img/arrow.svg";

const EditUser = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [visibleForm, setVisibleForm] = useState(false);
    let {id} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser(id));
    }, [])

    const user = useSelector((state) => state.users.singleUser);

    useEffect(() => {
        if (user)
         {
            setName(user[0].name)
            setAge(user[0].age)
        }
    }, [user])


    const handleSubmit = () => {
        const avatar = `https://avatars.dicebear.com/api/adventurer/${age}.svg`
            dispatch(editUser({id, name, age, avatar}))
    }
    const btnClickHandler = () => {
        setVisibleForm(!visibleForm)
    }

    return (
        <div className={styles.wrapper}>

            <div className={!visibleForm ? styles.formText : `${styles.formText} ${styles.expand}`}>
                <Logo width='140px' height='45px' className={styles.logo}/>

                <button onClick={btnClickHandler}
                        className={!visibleForm ? `${styles.cta} ${styles.arrowDown}` : `${styles.cta} ${styles.arrowUp}`}>
                    <Arrow className={styles.arrowDown}/>
                </button>
                <div className={!visibleForm ? styles.text : `${styles.text} ${styles.show}`}>
                    <form className='addForm'>
                        <TextField value={name} onChange={(e) => setName(e.target.value)} id="standard-required"
                                   label="Имя"
                                   variant="standard"/>
                        <TextField value={age} type='number' onChange={(e) => setAge(e.target.value)}
                                   id="standard-required"
                                   label="Возраст" variant="standard"/>

                        {name && age ? <Link to='/'>
                                <Button onClick={handleSubmit} sx={{mb: 1,}} className={styles.access} variant="contained" color="success">Изменить</Button>
                            </Link>
                            :
                            <Button disabled onClick={handleSubmit} sx={{mb: 1,}} className={styles.access} variant="contained" >Изменить</Button>
                        }

                        <Link to='/'>
                            <Button sx={{mb: 1,}} variant="contained" color="error">Отмена</Button>
                        </Link>
                    </form>
                </div>
            </div>
            <div className={styles.callText}>
                <h1>Изменить пользователя: {user?user[0].name:''}</h1>
            </div>

        </div>

    );
};

export default EditUser;
