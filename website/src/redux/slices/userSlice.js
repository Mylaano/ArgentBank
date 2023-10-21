import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: null,
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    token: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            return state;
        },
        setUser: (state, action) => {
            state = { ...action.payload };
            return state;
        },
        clearUser: (state) => {
            state.id = null;
            state.firstName = '';
            state.lastName = '';
            state.userName = '';
            state.email = '';
            state.token = null;
            return state;
        },
        updateUser: (state, action) => {
            state.userName = action.payload;
            return state;
        }
    }
})

export const { setToken, setUser, clearUser, updateUser } = userSlice.actions
export default userSlice.reducer