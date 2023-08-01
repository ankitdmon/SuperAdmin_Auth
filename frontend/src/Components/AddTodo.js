import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../redux/slices/todoSlice";

function AddTodo() {
	const [newTodo, setNewTodo] = useState("");
  const dispatch=useDispatch();

	const handelSubmit = (e) => {
		e.preventDefault();

    newTodo.length && dispatch(createTodo(newTodo))

	};

  const handelChange = (e) => {
    setNewTodo(e.target.value);
  };

	return (
		<form className='w-[50%] m-5'>
			<div className='flex '>
				<div className='relative w-full rounded-lg'>
					<input
						type='search'
						value={newTodo}
						onChange={handelChange}
						id='search-dropdown'
						className='block rounded-lg p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500'
						placeholder='New Todo'
					/>
					<button
						type='submit'
						onClick={handelSubmit}
						className='absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
					>
						+
					</button>
				</div>
			</div>
		</form>
	);
}

export default AddTodo;
