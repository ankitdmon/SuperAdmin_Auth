import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { changePassword } from '../redux/slices/authanticationSlice';


function ChangePassword() {
	const dispatch=useDispatch();
	const [error,setError]=useState({error:false,message:""})
	const [form,setForm]=useState({
		oldPassword:'',
        newPassword:'',
        confirmPassword:''
	});
	const handleChange=(e)=>{
		setForm({...form,[e.target.name]:e.target.value});
		setError({error:false,message:""})
	}




	
	const handleSubmit=async()=>{
		if(!(form.newPassword===form.confirmPassword)){
			return setError({error:true,message:"Passwords do not match"})
		}

		if(form.newPassword===form.oldPassword){
		return	setError({error:true,message:"New password cannot be same as old password"})
		}
	
		dispatch(changePassword(form))
		
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
					<h1 className="text-2xl font-semibold">Change Password</h1>
				</div>
				<div className="divide-y divide-gray-200">
					<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
						<div className="relative">
							<input autoComplete="off" onChange={handleChange} value={form.oldPassword} id="oldPassword" name="oldPassword" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Old Password" />
							<label htmlFor="oldPassword" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Old passwords</label>
						</div>
						<div className="relative">
							<input autoComplete="off"  onChange={handleChange} value={form.newPassword} id="newpassword" name="newPassword" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="New Password" />
							<label htmlFor="newpassword" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"> New Password</label>
						</div>
						<div className="relative">
							<input autoComplete="off" id="confirmPassword"  onChange={handleChange} value={form.confirmPassword} name="confirmPassword" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Confirm Password" />
							<label htmlFor="confirmPassword" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"> Confirm Password</label>
						</div>
						{error.error&& <p className="text-sm text-red-500">{error.message}</p>}
						<div className="relative">
							<button  onClick={handleSubmit} className="bg-blue-500 text-white rounded-md px-2 py-1">Change</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
  )
}

export default ChangePassword