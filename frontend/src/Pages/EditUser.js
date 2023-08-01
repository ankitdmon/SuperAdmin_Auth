import React from 'react';
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { updateUser } from '../redux/slices/authanticationSlice';

function EditUser() {
	const dispatch = useDispatch()
	const user = useSelector(state=>state.user)
	const [img, setImg] = useState();
	const [formData,setFormData] = useState({
		name:user.name,
        email:user.email,
        photo:user.password,
	});

	const onImageChange=(e)=>{
		setFormData({...formData,photo:e.target.files[0]});
		
		const [file]=e.target.files
		setImg(URL.createObjectURL(file));
	  }

	const handleChange = (e) => {
		setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
	}
	const handleSubmit = (e) => {
        e.preventDefault();
		
		const data={
			name:formData.name,
            email:formData.email,
            photo:formData.photo,
		}
	
		const form=new FormData();
		for (const [key, value] of Object.entries(data)) {
			console.log("loop",key, value)
			form.append(key, value);
	   }
	
		dispatch(updateUser(form))
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
					<h1 className="text-2xl font-semibold">Edit User Form</h1>
				</div>
				<div className="divide-y divide-gray-200">
					<form onSubmit={handleSubmit} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
						<div className="relative">
							<input readOnly value={user.id} disabled className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" />
							<label htmlFor="id" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Id</label>
						</div>
						<div className="relative">
							<input onChange={handleChange} value={formData.name}  autoComplete="off" id="name" name="name" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Full Name" />
							<label htmlFor="name" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Name</label>
						</div>
						<div className="relative">
							<input onChange={handleChange} value={formData.email}  autoComplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Email" />
							<label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email</label>
						</div>
         			   <input  onChange={onImageChange} className="block w-full mb-5 text-xs text-black-900 border border-gray-300 rounded-lg cursor-pointer  dark:text-gray-400 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400" id="small_size" type="file"></input>
					   <img src={img || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"} alt='selected photo' className='rounded-full border-2 rounded-full py-3 w-[150px] h-[150px]'/>
						<div className="relative"> 
							<button type='submit' className="bg-blue-500 text-white rounded-md px-2 py-1" >Submit</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
  )
}

export default EditUser