import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo } from "../redux/slices/todoSlice";
import constant from "./constant";
import AddTodo from "../Components/AddTodo";

const TodoRow = ({ rowData, sn }) => {
	 const dispatch = useDispatch();

	const handelStatus=(status)=>{
		dispatch(updateTodo({id:rowData.id,status}));
	}

	return (
		<tr className='hover:bg-gray-50'>
			<td className='px-6 py-4'>{sn}</td>
			<td className='px-6 py-4 '>{rowData.todo}</td>
			<td className='px-6 py-4'>
				{constant.coloredDisplay(rowData.status)}</td>
			<td className='px-6 py-4'>
				<div className='flex gap-2'>
					{rowData.status !== constant.status.PENDING && (
						<button
							onClick={() => handelStatus(constant.status.PENDING)}
							className='inline-flex border-2 border-red-900 items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600 cursor-pointer hover:bg-red-100'
						>
							PENDING
						</button>
					)}
					{rowData.status !== constant.status.PROCESS && (
						<button
							onClick={() => handelStatus(constant.status.PROCESS)}
							className='inline-flex border-2 border-yellow-900 items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-xs font-semibold text-yellow-600 cursor-pointer hover:bg-yellow-100'
						>
							PROCESS
						</button>
					)}
					{rowData.status !== constant.status.COMPLETE && (
						<button
							onClick={() => handelStatus(constant.status.COMPLETE)}
							className='inline-flex border-2 border-green-900 items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600 cursor-pointer hover:bg-green-100'
						>
							COMPLETE
						</button>
					)}
				</div>
			</td>
		</tr>
	);
};

function TodoList() {
	const todos = useSelector((globalState) => globalState.todos);
	return (
		<>
			<AddTodo />
			<div className='overflow-hidden rounded-lg border border-gray-200 shadow-md m-5'>
				<table className='w-full border-collapse bg-white text-left text-sm text-gray-500'>
					<thead className='bg-gray-50'>
						<tr>
							<th scope='col' className='px-6 py-4 font-medium text-gray-900'>
								S.No
							</th>
							<th
								scope='col'
								className='px-6 py-4 w-[400px] font-medium text-gray-900'
							>
								To Do
							</th>
							<th scope='col' className='px-6 py-4 font-medium text-gray-900'>
								Current Status
							</th>
							<th scope='col' className='px-6 py-4 font-medium text-gray-900'>
								Change Status
							</th>
							<th
								scope='col'
								className='px-6 py-4 font-medium text-gray-900'
							></th>
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-100 border-t border-gray-100'>
						{todos.map((todo, index) => (
							<TodoRow rowData={todo} sn={index + 1} key={todo.id || index} />
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default TodoList;
