import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useDispatch, useSelector} from "react-redux";
import {setSortType} from "../redux/userSlice";

export default function SelectSmall() {
    const dispatch = useDispatch();
    const typeOfSort = useSelector((state) => state.users.sortType);

    return (
        <FormControl sx={{ml: 2, pb: 1, minWidth: 220}} size="small" variant='standard'>
            <InputLabel id="demo-select-small">Сортировать по:</InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={typeOfSort}
                label="Age"
                onChange={(event) => dispatch(setSortType(event.target.value))}
            >
                <MenuItem value="default">
                    <em>Дате создания</em>
                </MenuItem>
                <MenuItem value='name'>Имени</MenuItem>
                <MenuItem value='age'>Возрасту</MenuItem>
            </Select>
        </FormControl>
    );
}
