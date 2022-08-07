import React, {useState} from 'react';
import '../../styles.scss'
import {Link} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {addUser} from "../../redux/userSlice";
import {v4 as uuid} from 'uuid';
import axios from "axios";
import styles from  './AddUser.module.scss'
import {ReactComponent as Arrow} from "../../img/arrow.svg";
import {ReactComponent as Logo} from "../../img/osSystemLogo.svg";


const AddUser = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [visibleForm, setVisibleForm] = useState(false);

    const unique_id = uuid().slice(0, 8);

    const handleSubmit = async () => {

        const status = await axios.get('https://yesno.wtf/api');
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
    const btnClickHandler = () => {
        setVisibleForm(!visibleForm)
    }

    const dispatch = useDispatch();
    return (

            <div className={styles.wrapper}>

                <div className={!visibleForm?styles.formText: `${styles.formText} ${styles.expand}`}>
                    <Logo width='140px' height='45px' className={styles.logo}/>

                    <button onClick={btnClickHandler}
                            className={!visibleForm?`${styles.cta} ${styles.arrowDown}`:`${styles.cta} ${styles.arrowUp}`}> <Arrow className={styles.arrowDown}/>
                        </button>
                    <div className={!visibleForm?styles.text:`${styles.text} ${styles.show}`}>
                        <form >
                            <TextField required onChange={(e) => setName(e.target.value)} id="standard-basic" label="Имя"
                                       variant="standard"/>
                            <TextField required type='number' onChange={(e) => setAge(e.target.value)} id="standard-basic"
                                       label="Возраст" variant="standard"/>

                            {name && age ? <Link to='/'>
                                    <Button onClick={handleSubmit} sx={{mb: 1,}} className={styles.access} variant="contained" color="success">Добавить</Button>
                                </Link>
                                :
                                <Button disabled onClick={handleSubmit} sx={{mb: 1,}} className={styles.access} variant="contained" >Добавить</Button>
                            }
                            <Link to='/'>
                                <Button sx={{mb: 1,}} variant="contained" color="error">Отмена</Button>
                            </Link>
                        </form>
                    </div>
                </div>
                <div className={styles.callText}>
                    <h1>Добавить нового <span>пользователя</span></h1>
                </div>

            </div>

    );
};

export default AddUser;
