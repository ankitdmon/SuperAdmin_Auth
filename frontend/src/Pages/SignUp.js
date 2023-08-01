import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function SignUp() {

	const navigate=useNavigate();
const [form,setForm]=useState({
	name:'',
    email:'',
    password:'',
    rpassword:''
})


const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
}

const handleSubmit=async(e)=>{
    e.preventDefault()
    if(!(form.password===form.rpassword)){		
		toast.error("Password and confirm password do not match")
        return false;
	}

	const response = await fetch(
		`${process.env.REACT_APP_BACKEND_BASE_URL}/user/signup`,
		{
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({ 
				name: form.name,
                email: form.email,
                password: form.password,
				photo:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
			 }),
			credentials: "include"
		}
	);

	const result = await response.json();
	if(result.success) {
		toast.success(result.message);
		navigate('/login');
	}else toast.error(result.message);;

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
					<h1 className="text-2xl font-semibold">Sign Up</h1>
				</div>
				<div className="divide-y divide-gray-200">
					<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
						<div className="relative">
							<input autoComplete="off" onChange={handleChange} value={form.name} id="name" name="name" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Name" />
							<label htmlFor="name" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Name</label>
						</div>
						<div className="relative">
							<input autoComplete="off" onChange={handleChange} value={form.email} id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
							<label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
						</div>
						<div className="relative">
							<input autoComplete="off" onChange={handleChange} value={form.password} id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
							<label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
						</div>
						<div className="relative">
							<input autoComplete="off" onChange={handleChange} value={form.rpassword} id="rpassword" name="rpassword" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Re-Enter Password" />
							<label htmlFor="rpassword" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Re-Enter Password</label>
						</div>
						<div className="relative">
							<button onClick={handleSubmit} className="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
  )
}

export default SignUp