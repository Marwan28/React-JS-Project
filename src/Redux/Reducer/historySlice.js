import { createSlice } from '@reduxjs/toolkit';

const historySlice = createSlice({
    name: 'history',
    initialState: {
        viewedProperties: []
    },
    reducers: {
        addToHistory: (state, action) => {
            const exists = state.viewedProperties.some(p => String(p.id) === String(action.payload.id));
            if (!exists) {
                state.viewedProperties.push(action.payload);
            }
        }
    }
});

export const { addToHistory } = historySlice.actions;
export default historySlice.reducer;