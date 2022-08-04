import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   /*users:[{
       id:1,
       avatar: '-',
       name: 'Sergey',
       age: 26,
       status: '-'
   },
       {
           id:2,
           avatar: '-',
           name: 'Antonio',
           age: 36,
           status: 'active'
       },
       {
           id:3,
           avatar: '-',
           name: 'Pedro',
           age: 16,
           status: 'active'
       },
   ]*/
    users:[]
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users = [...state.users, action.payload]
        },
        removeUser: (state,action) =>{
            if(window.confirm('Вы действительно хотите удалить пользователя?')){state.users = state.users.filter(obj => obj.id !== action.payload)}
        },
        editUser: (state, action) => {
            state.users = [...state.users, action.payload]
        },
        loadUsers:(state,action) =>{
            state.users = action.payload;
        }
    },
})
export const { addUser,removeUser,editUser,loadUsers} = usersSlice.actions;

export default usersSlice.reducer