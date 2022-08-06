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


export default function DenseTable() {
    const users = useSelector((state) => state.users.users);
    const typeOfSort = useSelector((state) => state.users.sortType);
    const dispatch = useDispatch();
    const [sortedItems, setSortedItems] = useState(false);
    const [viewItems, setViewItems] = useState([]);
    useEffect(() => {
        if (users.length > 0) {
            window.localStorage.setItem('data', JSON.stringify(users));
        }
    }, [users]);

    useEffect(() => {
        if (localStorage.getItem('data'))
            dispatch(loadUsers(JSON.parse(localStorage.getItem('data'))))
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
    }, [typeOfSort]);


    const deleteUser = (id) => {
        dispatch(removeUser(id));
    }
    const styles = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: '200px'
    }

    if (!users.length) {
        return <div style={styles}><h1>В таблице еще нет пользователей. Давайте добавим?</h1>
            <Link to='/addUser'><Button sx={{mb: 1,}} variant="contained" color="success">Добавить</Button></Link>
        </div>
    }
    return (
        <>
            <div className='actions'>
                <Link to='/addUser'><Button variant="contained" color="success">Добавить пользователя</Button></Link>
                <Select/>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 1200}} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>№ п/п</TableCell>
                            <TableCell align="center">Аватар</TableCell>
                            <TableCell align="center">Имя</TableCell>
                            <TableCell align="center">Возраст</TableCell>
                            <TableCell align="center">Статус</TableCell>
                            <TableCell align="center">Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(!sortedItems ? users : viewItems).map((item, index) => (
                            <TableRow
                                key={item.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell component="th" scope="row">{index + 1}</TableCell>
                                <TableCell align="center"><img src={item.avatar} alt=""/></TableCell>
                                <TableCell align="center">{item.name}</TableCell>
                                <TableCell align="center">{item.age}</TableCell>
                                <TableCell align="center">{item.status}</TableCell>
                                <TableCell align="center">
                                    <Link to={`/editUser/${item.id}`}><Button sx={{mr: 1,}} variant="contained"
                                                                              color="success">Редактировать</Button></Link>
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
