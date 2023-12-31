import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { Link } from "react-router-dom";
import { previous, today, next } from "../utils/date-time";
import ListReservations from "./ListReservations";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <div className="container">
        <Link
          to={`/dashboard/?date=${previous(date)}`}
          className="btn btn-dark"
        >
          Previous
        </Link>
        <Link to={`/dashboard/?date=${today()}`} className="btn btn-light">
          Today
        </Link>
        <Link to={`/dashboard/?date=${next(date)}`} className="btn btn-dark">
          Next
        </Link>
      </div>
      <ErrorAlert error={reservationsError} />
      <ListReservations reservations={reservations}/>
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
