import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button} from "@mui/material";
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {loadUsers, removeUser} from "../redux/userSlice";
import {useEffect, useState} from "react";
import Select from "./Select";
import {ReactComponent as Logo} from "../img/osSystemLogo.svg";
import {ReactComponent as EditIcon} from "../img/edit.svg";


export default function DenseTable() {
    const [showScreen, setShowScreen] = useState(true)

    const {users} = useSelector((state) => state.users);
    const typeOfSort = useSelector((state) => state.users.sortType);
    const dispatch = useDispatch();
    const [sortedItems, setSortedItems] = useState(false);
    const [viewItems, setViewItems] = useState([]);
    useEffect(() => {
        if (users.length !== 0) {
            window.localStorage.setItem('data', JSON.stringify(users));
        }
    }, [users]);

    useEffect(() => {
        if (localStorage.getItem('data')) {
            dispatch(loadUsers(JSON.parse(localStorage.getItem('data'))))
        }
    }, []);
    useEffect(() => {
        setSortedItems(false);
        if (typeOfSort === 'default') {
            setSortedItems(false)
            return
        } else if
        (typeOfSort === 'age') {
            setViewItems(users
                .concat()
                .sort((a, b) => +a.age > +b.age ? 1 : -1)
                .map((item) => item));
        } else {
            setViewItems(users
                .concat()
                .sort((a, b) => a.name > b.name ? 1 : -1)
                .map((item) => item));
        }

        setSortedItems(true);
    }, [typeOfSort, users]);


    const deleteUser = (id) => {
        dispatch(removeUser(id));
    }
    const styles = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: '200px',
        textAlign: 'center'
    }
    const Show = () => {
        setTimeout(() => {
            setShowScreen(false)
        }, 3500)
        return (
            <div className='firstScreen'>
                <div>
                    <Logo width='140px' height='45px' className='logoFirstScreen'/>
                    <span className="loader"/>
                </div>

            </div>
        )
    }
    if (localStorage.getItem('data') === null) {
        return showScreen && <Show/>
            || <div style={styles}>
                <Logo width='140px' height='45px' className='logo'/>

                <h1>В таблице еще нет пользователей. Давайте добавим?</h1>
                <Link to='/OSsystem/addUser'><Button sx={{mb: 1,}} variant="contained" color="success">Добавить</Button></Link>
            </div>
    }
    return (
        <>
            <Logo width='140px' height='45px' className='logo'/>
            <div className='actions'>
                <Link to='/OSsystem/addUser'><Button variant="contained" color="success">Добавить пользователя</Button></Link>
                <Select/>
            </div>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' sx={{width: '30px'}}>№ п/п</TableCell>
                            <TableCell align="center" sx={{width: '20px'}}>Аватар</TableCell>
                            <TableCell align="center" sx={{width: '220px'}}>Имя</TableCell>
                            <TableCell align="center" sx={{width: '20px'}}>Возраст</TableCell>
                            <TableCell align="center" sx={{width: '20px'}}>Статус</TableCell>
                            <TableCell align="center" className='tableAction' sx={{width: '360px'}}>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(!sortedItems ? users : viewItems).map((item, index) => (
                            <TableRow
                                key={item.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell align='center' sx={{width: '20px'}} component="th"
                                           scope="row">{index + 1}</TableCell>
                                <TableCell align="center"><img src={item.avatar} alt=""/></TableCell>
                                <TableCell align="center">{item.name}</TableCell>
                                <TableCell align="center">{item.age}</TableCell>
                                <TableCell align="center">{item.status}</TableCell>
                                <TableCell align="center">
                                    <Link to={`/OSsystem/editUser/${item.id}`}><Button sx={{mr: 1,}} variant="contained"
                                    ><EditIcon height='24px'/></Button></Link>
                                    <Button onClick={() => deleteUser(item.id)} variant="contained"
                                            color='error'>х</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
