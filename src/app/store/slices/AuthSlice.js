import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
export const login = createAsyncThunk('login', async ({ email, password }) => {
    try {
        const res = await axios.post('https://xyz/login/', JSON.stringify({ email: email, password: password }))
        if (res.data.error)
            return false
        else {
            return res.data
        }
    } catch (e) {
        console.log('something went wrong')
    }
})
export const fetchUserData = createAsyncThunk('fetchUserData', async ({ uid }) => {
    try {
        const res = await axios.post('https://xyz/fetch-user-data/', JSON.stringify({ uid: uid }))
        if (res.data.error)
            return false
        else {
            return res.data
        }
    } catch (e) {
        console.log('something went wrong')
    }
})

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        userData: { id: 3, name: 'rohit' },
        isLoggedIn: true,
        isLoading: false,
        error: false
    },
    reducers: {
        getLocalUser(state, action) {
            console.log('getlocaluser running')
            let user = localStorage.getItem('user')
            state.userData = user
        },
        logOut(state, action) {
            state.isLoggedIn = false
            state.userData = null
        }
    },
    extraReducers: builder => {
        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true
        });
        builder.addCase(login.fulfilled, (state, action) => {
            if (action.payload == false)
                state.error = true
            else {
                state.userData = action.payload
                state.isLoggedIn = true
            }
        });
        builder.addCase(login.rejected, (state, action) => {
            state.error = true
        });
    }
})

export const { logOut, getLocalUser } = AuthSlice.actions
export default AuthSlice.reducer