import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/slices/authanticationSlice";
import { fetchTodos } from "../redux/slices/todoSlice";


const DropdownList=()=>{

	const dispatch=useDispatch();
	const handelLogout=()=>{

		console.log("logout")
		dispatch(logout());
	}


	return(<div className='z-10  w-[150px] absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 border-2 '>
	<ul
		className='py-2 text-sm text-gray-700 '
		aria-labelledby='dropdownHoverButton'
	>
		<li>
			<Link
				to='/edituser'
				className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
			>
				Edit Profile
			</Link>
		</li>
		<li>
			<Link
				to='/changepassword'
				className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
			>
				Change Password
			</Link>
		</li>
		<li>
			<button 
				onClick={handelLogout}
				className='block px-4 curson-pointer w-[100%] text-left py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
			>
				Sign out
			</button>
		</li>
	</ul>
</div>)
}


function UserInfo({email,name,photo}) {
const [showMenu,setShowMenu] =useState(false)
const dispatch = useDispatch();

useEffect(() => {
	dispatch(fetchTodos());
}, []);

	return (
		<>
			<div className='relative h-10 w-10' onMouseOver={()=>setShowMenu(true)} onMouseOut={()=>setShowMenu(false)}>
				<img
					className='h-full w-full rounded-full object-cover object-center'
					src={photo}
					alt='user image'
				/>
				<span className='absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white'></span>
			</div>
			<div className='text-sm relative' onMouseOver={()=>setShowMenu(true)} onMouseOut={()=>setShowMenu(false)}>
				<div className='font-medium text-gray-700'>{name}</div>
				<div className='text-gray-400'>{email}</div>
				{showMenu && <DropdownList />}
			</div>
		</>
	);
}

export default UserInfo;
