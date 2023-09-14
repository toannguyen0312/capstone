import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createReservation } from "../utils/api";

function CreateReservation () {
const history = useHistory();

const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });

const [error, setError] = useState(null);

const handleChange = ( { target } ) => {
    setReservation({
        ...reservation,
        [target.name]: target.value,
    });
};

const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
<<<<<<< HEAD
    createReservation(reservation, abortController.signal).then(() => {
        history.push(`/dashboard?date=${reservation.reservation_date}`)
    })
    .catch(setError);
    return () => abortController.abort();
}
=======
    try {
      const response = await createReservation(
        reservation,
        abortController.signal
      );
      history.push(
        `/dashboard/?date=${response.reservation_date.slice(0, 10)}`
      );
    } catch (error) {
      setErrorAlert(error);
    }
  };
>>>>>>> d3af21898f5ac287d2280b987828649814059529

const cancelHandler = () => {
    history.goBack();
}

return (
<div>
    <ErrorAlert error={error} />
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
        <br />
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
        <br />
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
        <br />
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
        <br />
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
        <br />
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
        <br />
        <button type="submit" onClick={(event) => submitHandler(event)}>Submit</button>
        <br />
        <button type="button" onClick={cancelHandler}>Cancel</button>
    </form>
</div>
);



}

export default CreateReservation;