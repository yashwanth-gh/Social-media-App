import { IUser } from "@/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "@/lib/appwrite/auth";


type IInitialStateType = {
  user: IUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  isError:boolean;
};

//^ -- this is a async thunk which handles asynchronous promises or API --

export const checkAuthUser = createAsyncThunk("checkAuthUser", async () => {
  const currentAccount = await authService.getCurrentUser();
  return currentAccount;
});

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE: IInitialStateType = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  isError:false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state, action:PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setIsAuthenticated: (state, action:PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setIsLoading: (state, action:PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkAuthUser.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(checkAuthUser.fulfilled,(state,action)=>{
        const payload = action.payload;
        // const payload = action.payload as IUser | null | undefined;

        if(payload){

          //FIXME:$ID ERROR
            state.user.id = payload.$id || '';
            state.user.name = payload.name || '';
            state.user.username = payload.username || '';
            state.user.email = payload.email || '';
            state.user.imageUrl = payload.imageUrl || '';
            state.user.bio = payload.bio || '';
            state.isAuthenticated = true;

        }
        state.isLoading = false;
    }),
    builder.addCase(checkAuthUser.rejected,(state)=>{
        state.isError = true;
    })
  },
});

export default authSlice.reducer;
export const {setUser,setIsLoading,setIsAuthenticated} = authSlice.actions;

