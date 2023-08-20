import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    podcasts: [],
};

const podcastSlice = createSlice({
    name: "podcasts",
    initialState,
    reducers: {
        setPodcast: (state,action) => {
            state.podcasts = action.payload;
        },
    },
});

export const { setPodcast } = podcastSlice.actions;
export default podcastSlice.reducer;