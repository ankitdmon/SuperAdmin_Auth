import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { login } from '../redux/slices/authanticationSlice';
import { Link, useNavigate } from 'react-router-dom';


function Login() {
	const dispatch=useDispatch();
	const navigate=useNavigate();
	const user=useSelector((globalState)=>globalState.user)

	const [formData,setFormdata]=useState({
		email:'',
        password:''
	})
	const [error,setError]=useState({
		error:false,message:""
	})

	const handelchange=(e)=>{
		setFormdata({
            ...formData,
            [e.target.name]:e.target.value
        })

		setError({
            error:false,
            message:""
        })
	}

	useEffect(()=>{
		if(user.id && user.email) navigate("/");
	},[user])

	const handelSubmit=async(e)=>{
		e.preventDefault();
		if(!(formData.email && formData.password)) {
			return setError({
                error:true,
                message:"All fields are required"
            })
		}
		await dispatch(login({email:formData.email,password:formData.password}))
	}

  return (

<div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
	<div className="relative py-3 sm:max-w-xl sm:mx-auto">
		<div
			className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
		</div>
		<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
			<div className="max-w-md mx-auto">
				<div>
					<h1 className="text-2xl font-semibold">Login</h1>
				</div>
				<div className="divide-y divide-gray-200" >
					<form className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
						<div className="relative">
							<input onChange={handelchange} value={formData.email} id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
							<label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
						</div>
						<div className="relative">
							<input onChange={handelchange} value={formData.password} id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
							<label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
						</div>
						{error.error && <p className="text-red-500 text-sm">{error.message}</p>}
						<div className="relative">
							<button type='submit' onClick={handelSubmit} className="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
						</div>
					</form>
					<p className='className="text-green-500 text-lg"'> If You Are Not Registered <Link to='/signup'>Click Here</Link></p>
				</div>
			</div>
		</div>
	</div>
</div>
  )
}

export default Login