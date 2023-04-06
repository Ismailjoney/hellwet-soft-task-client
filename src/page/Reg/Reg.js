import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/ContextProvider';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Reg = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [singupError, setSingUpError] = useState('')
    const {  createUser, updateUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const imageKey = process.env.REACT_APP_imagebb;
    
 
    const handdleSingIn = data => {
        setSingUpError('')
        const image = data.image[0]
        const formData = new FormData();

        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageKey}`
        

        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(imgData => { 
                if (imgData.success) {
                    createUser(data.email, data.password)
                        .then(res => {
                            const user = res.user;
                            const userInfo = {
                                displayName: data.name,
                                image : imgData.data.url
                            }
                            updateUser(userInfo)
                                .then(() => {
                                    saveUserAccountInfo(data.name, data.email.toLowerCase(), imgData.data.url)
                                })
                                .catch(err => console.Log(err))
                            navigate('/alltask')
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            })
        }
    //save user info in database
    const saveUserAccountInfo = (name, email,image) => {
            const user = { name, email, image }
            fetch(`http://localhost:5000/users`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.acknowledged) {
                        toast('login sucessfull')
                    }
                })
        }


        return (
            <div className='h-[600px] w-full flex'>
                <div className='w-96 p-7'>
                    <h2 className='text-3xl text-center font-bold'>SingUp</h2>
                    <form onSubmit={handleSubmit(handdleSingIn)}>
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">Image</span>
                            </label>
                            <input
                                {...register('image', { required: true })}
                                type="file" className="file-input w-full max-w-xs  " required />
                            {errors.image && <span className='mx-2'>This field is required</span>}
                            <p className='text-sm my-1'>Please Upload 1:1 aspect Ratio Image</p>
                        </div>




                        <div className="form-control justify-start w-full max-w-xs">
                            <label htmlFor="name">Name</label>
                            <input id="name" {...register('name', { required: true, maxLength: 30 })} className="input input-bordered w-full max-w-xs" />
                            {errors.name && errors.name.type === "required" && <span className='text-red-600'>This is required</span>}
                            {errors.name && errors.name.type === "maxLength" && <span className='text-red-600'>Max length exceeded</span>}
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Email</span></label>
                            <input type="text"
                                {...register("email", {
                                    required: "Email Address is required",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "Entered value does not match email format"
                                    }
                                })}
                                className="input input-bordered w-full max-w-xs" ></input>
                            {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label"> <span className="label-text">Password</span></label>
                            <input type="password"
                                {...register("password", {
                                    required: "Password required",
                                    minLength: {
                                        value: 6,
                                        message: "password must be minmum length is 6"
                                    },
                                    pattern: {
                                        value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters'
                                    }
                                })}
                                className="input input-bordered w-full max-w-xs" ></input>
                            {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        </div>
                        <div>
                            {
                                singupError && <p className='text-red-600'>{singupError}</p>
                            }
                        </div>
                        <input className='btn  btn-outline  w-full mt-4' value="Login" type="submit" />
                    </form>

                    <p>Already have an account <Link className='text-secondary' to="/login">Please Login</Link></p>
                    <div className="divider">OR</div>
                    <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
                </div>
            </div>
        );
    };

    export default Reg;