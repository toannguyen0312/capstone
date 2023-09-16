import React from "react";

function ListReservations({ reservations }) {
    const reservationsList =  reservations.map((reservation, index) => {
        return (
            <tr key={index} className="res-text table-row">
              <td>{reservation.reservation_id}</td>
              <td>{reservation.first_name}</td>
              <td>{reservation.last_name}</td>
              <td>{reservation.mobile_number}</td>
              <td>{reservation.reservation_date}</td>
              <td>{reservation.reservation_time}</td>
              <td>{reservation.people}</td>
            </tr>
        );
    });
return (
    <div>
        <table className="table table-striped table-bordered">
            <thead className="thread-dark">
                <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Mobile Number</th>
                <th>Date of reservation</th>
                <th>Time of reservation</th>
                <th>Number of people in the party</th> 
                </tr>
            </thead>
            <tbody>{reservationsList}</tbody>
        </table>
    </div>
);
}

export default ListReservations;