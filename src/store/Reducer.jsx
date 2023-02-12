import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    posts: []
}
export const Reducer = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts(state, action){
            state.posts = action.payload
        }
    }
})
export const ActionReducer = Reducer.actions
export const PostsReducers = Reducer.reducer