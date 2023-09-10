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
<main>
    <h1>Create Reservation</h1>

</main>
);



}

export default CreateReservation;