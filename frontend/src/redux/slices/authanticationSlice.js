import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiRequest from "../../utils/apiRequest";

//fetch already loggedin user (by cookies) =========================================================
export const fetchLoggedInUser = createAsyncThunk(
	"fetchloggedin/user",
	async () => {
		const result = await apiRequest.post_withoutData('/user/isauth');
		if (result.success) {
			return result.user;
		} else {
			return false;
		}
	}
);

//login user =======================================================================================
export const login = createAsyncThunk("login", async (user) => {
	const { email, password } = user;
	const response = await apiRequest.post('/user/signin',{email,password});
	if (response.success) {
		toast.success(response.message);
		return response.user;
	} else {
		toast.error(response.message);
		return null;
	}
});

//update user ========================================================================================================
export const updateUser = createAsyncThunk("updateUser", async (value) => {
	const result = await apiRequest.post_formData('/user/update',value);
	if (result.success) {
		toast.success(result.message);
	} else {
		toast.error(result.message);
	}

	return result.user;
});


//Change password ========================================================================================================
export const changePassword = createAsyncThunk(
	"user/changepassword",
	async ({ oldPassword, newPassword }) => {
		const result = await apiRequest.post('/user/changepassword',{oldPassword,newPassword});
		return { success: result.success, message: result.message };
	}
);
//Change password ========================================================================================================
export const logout = createAsyncThunk("user/logout",async () => {
		const result = await apiRequest.get('/user/logout');
		return { success: result.success, message: result.message };
	}
);

// functions =====================================================================================================
const insertIntoState = (state, action) => {
	const { id, name, email, photo } = action.payload;
	state.id = id;
	state.name = name;
	state.email = email;
	state.photo = photo;
};

const clearState = (state) => {
	state.id = "";
	state.name = "";
	state.email = "";
	state.photo = "";
};

//************************ slices ************************ */
const initialState = { id: "", name: "", email: "", photo: "" };
//slice start
const Authantication = createSlice({
	name: "auth",
	initialState,
	reducers: {},

	//extra reducer use for manage async request
	extraReducers: (builder) => {
		builder.addCase(fetchLoggedInUser.fulfilled, insertIntoState);
		builder.addCase(
			fetchLoggedInUser.rejected,
			(state, action) => (state = { ...state })
		);
		builder.addCase(login.fulfilled, insertIntoState);

		builder.addCase(
			updateUser.fulfilled,
			(state, action) => action.payload && insertIntoState(state, action)
		);

		builder.addCase(changePassword.fulfilled, (state, { payload }) => {
			if (payload.success) {
				toast.success(payload.message);
				clearState(state);
			} else toast.error(payload.message);
		});

		builder.addCase(logout.fulfilled, (state, { payload }) => {
			if (payload.success) {
				toast.success(payload.message);
				clearState(state);
			} else toast.error(payload.message);
		});
	},
});
export default Authantication.reducer;
