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


export default function DenseTable() {
    const users = useSelector((state) => state.users.users);
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

    const deleteUser = (id) => {
        dispatch(removeUser(id));
    }
    const styles = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: '200px'
    }
    const sortItemByAge = () => {
        const arr = users.concat().sort((a, b) => +a.age < +b.age ? 1 : -1).reverse()
            .map((item) => item);
        setSortedItems(true);

        setViewItems(sortedItems?arr:users);
    }
    const sortItemByName = () => {
        const arr = users.concat().sort((a, b) => a.name > b.name ? 1 : -1).reverse()
            .map((item) => item);
        console.log(arr)
    }
    const sortItemByName1 = () => {
        const arr = users.concat().sort((a, b) => a.name < b.name ? 1 : -1).reverse()
            .map((item) => item);
        console.log(arr)
    }

    if (users.length === 0) {
        return <div style={styles}><h1>В таблице еще нет пользователей. Давайте добавим?</h1>
            <Link to='/addUser'><Button sx={{mb: 1,}} variant="contained" color="success">Добавить</Button></Link>
        </div>
    }
    return (
        <>
            <Link to='/addUser'><Button sx={{mb: 1,}} variant="contained" color="success">Добавить пользователя</Button></Link>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 1200}} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>№ п/п</TableCell>
                            <TableCell align="center" onClick={sortItemByName1}>Аватар</TableCell>
                            <TableCell align="center" onClick={sortItemByName}>Имя</TableCell>
                            <TableCell align="center" onClick={sortItemByAge}>Возраст</TableCell>
                            <TableCell align="center">Статус</TableCell>
                            <TableCell align="center">Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(users&&viewItems).map((item, index) => (
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
