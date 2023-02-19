import { data } from 'autoprefixer';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const SignUp = () => {
    const { register, formState: {errors}, handleSubmit } = useForm();
    const {createUser,  updateUser} = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();

    if(token){
      navigate('/');
    }
    const handleSignup = (data) =>{
      setSignUpError('');
      createUser(data.email, data.password)
      .then(result =>{
        const user = result.user;
        toast('register success');
        const userInfo = {
          displayName: data.name
        }
        updateUser(userInfo)
        .then(() =>{
            saveUser(data.name, data.email);
        })
        .catch(err => console.log(err));
      })
      .catch(err => {
        console.log(err)
        setSignUpError(err.message)
      });
    }

    const saveUser = (name, email) =>{
      const user = {name, email};
      fetch('https://doctors-portal-server-olive-kappa.vercel.app/users', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(user)

      })
      .then(res => res.json())
      .then(data =>{
        setCreatedUserEmail(email);
       
      })
    }

   
    return (
        <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-xl text-center">Sign Up</h2>
        <form onSubmit={handleSubmit (handleSignup)}>

        <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>   
            </label>
            <input type="text" {...register("name", {
                required: "Please type your amazing name"
            })}
             className="input input-bordered w-full max-w-xs"/>
              {errors.name && <p className="text-red-600">{errors.name?.message}</p>}       
            </div>
         
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>   
            </label>
            <input type="text"
             {...register("email", {
              required: "Email id needed"
            })} 
             className="input input-bordered w-full max-w-xs"/>
             {errors.email && <p className="text-red-600">{errors.email?.message}</p>}  
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>   
            </label>
            <input type="password" 
            {...register("password", {
              required: 'please type your interesting password',
              minLength: {value: 6, message: "Password must  6 or longer than"}
            })} 
            className="input input-bordered w-full max-w-xs"/> 
            
            {errors.password && <p className="text-red-600">{errors.password?.message}</p>}   
          </div>
          <input className="btn btn-accent w-full mt-6" value='Sign Up' type="submit" />
          {signUpError && <p className='text-red-600'>{signUpError}</p>}
        </form>
        <p>All ready have an account <Link className="text-secondary" to="/login">Go to Login</Link> </p>
        {/* <div className="divider">OR</div>
        <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button> */}
      </div>
    </div>
    );
};

export default SignUp;