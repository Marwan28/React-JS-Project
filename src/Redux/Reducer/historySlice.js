import { createSlice } from '@reduxjs/toolkit';

const savedHistory = localStorage.getItem('viewedProperties') 
    ? JSON.parse(localStorage.getItem('viewedProperties')) 
    : [];

const historySlice = createSlice({
    name: 'history',
    initialState: {
        viewedProperties: savedHistory
    },
    reducers: {
        addToHistory: (state, action) => {
            const exists = state.viewedProperties.some(p => String(p.id) === String(action.payload.id));
            
            if (!exists) {
         
                state.viewedProperties = [action.payload, ...state.viewedProperties];
                
              
                localStorage.setItem('viewedProperties', JSON.stringify(state.viewedProperties));
            }
        }
    }
});

export const { addToHistory } = historySlice.actions;
export default historySlice.reducer;