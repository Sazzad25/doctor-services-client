import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from '../../../Pages/Shared/Loading/Loading';


const AddDoctor = () => {
  const {register, handleSubmit, formState: { errors } } = useForm();

  const imageHostKey = process.env.REACT_APP_imgbb_key;
  const navigate = useNavigate();

  const {data: specialties, isLoading} = useQuery({
    queryKey: ['specialty'],
    queryFn: async () =>{
      const res = await fetch('https://doctors-portal-server-olive-kappa.vercel.app/appointmentSpecialty');
      const data = await res.json();
      return data;
    }
  })

  const handleAddDoctor = data => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
    fetch(url, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(imgData => {
      if(imgData.success){
          console.log(imgData.data.url);
          const doctor = {
            name: data.name,
            email: data.email,
            specialty: data.specialty,
            image: imgData.data.url
          }

          fetch('https://doctors-portal-server-olive-kappa.vercel.app/doctors', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              authorization: `bearer${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(doctor)
          })
          .then(res => res.json())
          .then(result =>{
            console.log(result);
            toast.success(`${data.name} is added successfully`);
            navigate('/dashboard/managedoctors');
          })
      }
    })
  }

  if(isLoading){
    return <Loading></Loading>
  }

  return (
    <div className="w-96 p-7">
      <h2 className="text-4xl">Doctor</h2>
      <form onSubmit={handleSubmit(handleAddDoctor)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            {...register("name", {
              required: "Please type your amazing name",
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.name && (
            <p className="text-red-600">{errors.name?.message}</p>
          )}
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            {...register("email", {
              required: "Email id needed",
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.email && (
            <p className="text-red-600">{errors.email?.message}</p>
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Specialty</span>
          </label>
          <select
           {...register('specialty')}
           className="select input-bordered w-full max-w-xs">
                 
            {
              specialties.map(specialty => <option
              key={specialty._id}
              value={specialty.name}
              >{specialty.name}</option>)
            }
            
          </select>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input
            type="file"
            {...register("image", {
              required: "Please select your amazing photo",
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.img && (
            <p className="text-red-600">{errors.img?.message}</p>
          )}
        </div>
        <input
          className="btn btn-accent w-full mt-6"
          value="Add Doctor"
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddDoctor;
