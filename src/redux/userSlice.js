import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    users: [],
    singleUser: null
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users = [...state.users, action.payload]
        },
        getUser: (state, action) => {
            state.singleUser = {...state.users.filter(obj => obj.id === action.payload)}
        },
        removeUser: (state, action) => {
            if (window.confirm('Вы действительно хотите удалить пользователя?')) {
                state.users = state.users.filter(obj => obj.id !== action.payload)
            }
        },
        editUser: (state, action
        ) => {
            const findItem = state.users.find(obj => obj.id === action.payload.id);
            if (findItem) {
                findItem.name = action.payload.name;
                findItem.age = action.payload.age;
                findItem.avatar = action.payload.avatar;
            }
        },
        loadUsers: (state, action) => {
            state.users = action.payload;
        }
    },
})
export const {addUser, removeUser, editUser, loadUsers, getUser} = usersSlice.actions;

export default usersSlice.reducer