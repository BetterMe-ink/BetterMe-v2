import { createSlice } from '@reduxjs/toolkit';

let biscuit;

if (localStorage.getItem('theme')) biscuit = localStorage.getItem('theme');

export const themeSlice = createSlice({
    name: 'Theme',
    initialState: {
        theme: biscuit || 0
    },
    reducers: {
        changeTheme: (state, action) => {
            state.theme === 0 ? state.theme = 1 : state.theme = 0;
            
            localStorage.setItem('theme', state.theme);
        }
    }
})

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;