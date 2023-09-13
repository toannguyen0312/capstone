import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

function CreateReservation () {
const initialReservationForm = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
};
const [reservation, setReservation] = useState({...initialReservationForm});
const [error, setError] = useState(null);

const handleChange = ({ target }) => {
    setReservation({
        ...reservation,
        [target.name]: target.value,
    });
};

const handleSubmit = (event) => {
    event.prevenDefault();
    
}

return (
<div>
    <form>
        <label htmlFor="first_name">
            First name
        </label>
        <input
            id="first_name"
            name="first_name"
            type="text"
            onChange={handleChange}
            value={reservation.name}
            require={true}
        />
        <label htmlFor="last_name">
            Last name
        </label>
        <input
            id="last_name"
            name="last_name"
            type="text"
            onChange={handleChange}
            value={reservation.last_name}
            require={true}
        />
        <label htmlFor="mobile_number">
            Mobile number
        </label>
        <input 
            id="mobile_number"
            name="mobile_number"
            type="number"
            onChange={handleChange}
            value={reservation.mobile_number}
            require={true}
        />
        <label htmlFor="reservation_date">
            Date of reservation
        </label>
        <input 
            id="reservation_date"
            name="reservation_date"
            type="date"
            onChange={handleChange}
            value={reservation.reservation_date}
            require={true}
        />
        <label htmlFor="reservation_time">
            Time of reservation
        </label>
        <input 
            id="reservation_time"
            name="reservation_time"
            type="time"
            onChange={handleChange}
            value={reservation.reservation_time}
            require={true}
        />
        <label htmlFor="people">
            Number of people in the party
        </label>
        <input 
            id="people"
            name="people"
            type="number"
            min="1"
            onChange={handleChange}
            value={reservation.people}
            require={true}
        />
    </form>
</div>
);



}

export default CreateReservation;