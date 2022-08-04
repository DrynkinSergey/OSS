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
import { loadUsers, removeUser} from "../redux/userSlice";
import {useEffect} from "react";


export default function DenseTable() {
    const users = useSelector((state) => state.users.users);
    const dispatch = useDispatch();
    useEffect(() => {
        if(users.length>0){
            window.localStorage.setItem('data', JSON.stringify(users));
        }
    }, [users]);

    useEffect(() => {
        if(localStorage.getItem('data'))


                dispatch(loadUsers(JSON.parse(localStorage.getItem('data'))))

    }, []);

    const deleteUser = (id) => {
        dispatch(removeUser(id));
        localStorage.clear()

    }
    const styles = {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            paddingTop: '200px'
        }


    if (users.length === 0) {
        return <div style={styles}><h1>Users is not added yet. You can do it!</h1>
            <Link to='/addUser'><Button sx={{mb: 1,}} variant="contained" color="success">Add user</Button></Link>
        </div>
    }
    return (
        <>
            <Link to='/addUser'><Button sx={{mb: 1,}} variant="contained" color="success">Add user</Button></Link>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 1200}} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell align="center">Avatar</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Age</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((item, index) => (
                            <TableRow
                                key={item.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell component="th" scope="row">{index + 1}</TableCell>
                                <TableCell align="center">{item.avatar}</TableCell>
                                <TableCell align="center">{item.name}</TableCell>
                                <TableCell align="center">{item.age}</TableCell>
                                <TableCell align="center">{item.status}</TableCell>
                                <TableCell align="center" >
                                    <Link to='/editUser'><Button sx={{mr: 1,}} variant="contained" color="success">Edit</Button></Link>
                                    <Button onClick={() => deleteUser(item.id)} variant="contained"
                                            color='error'>Delete</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
