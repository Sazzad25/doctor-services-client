import React from "react";
import doctor from '../../../assets/images/doctor.png';
import appointment from '../../../assets/images/appointment.png';
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import { Link } from "react-router-dom";

const MakeAppointment = () => {
  return (
    <section className="mt-16" 
    style={{
        background: `url(${appointment})`
    }}
    >
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={doctor}
            className="-mt-32 hidden md:block lg:w-1/2 rounded-lg shadow-2xl" alt=""
          />
          <div>
            <h4 className="text-lg font-bold text-primary">Appointment</h4>
            <h1 className="text-4xl font-bold text-white">Make an appointment Today</h1>
            <p className="py-6 text-white">
            Book now to get treatment from your preferred doctor.
            </p>
            <Link to="/appointment"><PrimaryButton>Appointment</PrimaryButton></Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MakeAppointment;
