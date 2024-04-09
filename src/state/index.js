import { createSlice } from '@reduxjs/toolkit'

// Here, we created different states, the mode, the user, the token and the posts. These
// are the initial states.
const initialState = {
  mode: 'light',
  user: null,
  token: null,
  posts: []
}

// Inside the createSlice function gotten from redux, we want to update the initial states created.
// Question 1
// Where is the 'name parameter' coming from?
// What is auth?
// I understand that initialState is our prev. states(mode, user, token and posts).
// I think 'reducers parameter' is where we now update our states (I'm not quite sure).
// We used 'state' arguement because we can't modify initialState directly. This means that
// we can't say initialState.mode. This will override what we had in our initialState and
// will automatically assign mode to replace all we had in initialState. so state here
// kind of represents or is another instance of initialState.
// We updated setMode by making a conditional statement but where is setLogin, setLogout, setfriends coming from
// since they're not part of initialState.
// Explain this statement: state.user = action.payload.user;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
    // Once the logout button is clicked, it resets to initial state.
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token  = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setfriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("User friends non-existent :( ")
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPost = state.posts.map((post) => {
        if (post._id === action.payload.post_id) return action.payload.post;
        return post;
      })
      state.posts = updatedPost;
    }
  }
})

export const { setMode, setLogin, setLogout, setfriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;