import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import apiRequest from "../../utils/apiRequest";


//fetch all the todos according to user =========================================================
export const fetchTodos = createAsyncThunk(
	"fetchtodos/todos",
	async () => {
		const result = await apiRequest.get('/todo/fetch')
		if (result.success) {
			return result.todos;
		} else {
			return false;
		}
	}
);


//Create new todo =========================================================
export const createTodo = createAsyncThunk(
	"createTodo/todos",
	async (todo) => {

        const data={
            todo,
            status:"pending",
            id: uuidv4()
        }
        const result = await apiRequest.post('/todo/create',data)
        return {success:result.success,message:result.message,data};
		
	}
);

//Update todo =========================================================
export const updateTodo = createAsyncThunk(
	"update/todos",
	async (data) => {
        const result = await apiRequest.post('/todo/update',data);
        return {success:result.success,message:result.message,data};
	}
);

const todoSlice = createSlice({
	name: "auth",
	initialState:[],
	reducers: {},
    extraReducers:(builder)=>{
		builder.addCase(fetchTodos.fulfilled,  (state, {payload}) => {
            console.log(payload)
            payload.map(todo=>state.push(todo))
        });

        builder.addCase(createTodo.fulfilled,(state, {payload}) => {
            if(payload.success){
                state.push(payload.data)
                toast.success(payload.message);
            }
        });

        builder.addCase(updateTodo.fulfilled, (state, {payload}) => {
            console.log(payload)
            if(payload.success){
                state.forEach((items)=>{
                    if (items.id===payload.data.id) {
                      items.status=payload.data.status
                    }
                   })
                   toast.success(payload.message);
            }
        });
    }
})

export default todoSlice.reducer;