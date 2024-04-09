import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createReservation } from "../../utils/api";

function ReservationForm({
  emptyReservationData,
  newReservation,
  setNewReservation,
}) {
  const history = useHistory();

  function handleChange(event) {
    setNewReservation({
      ...newReservation,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await createReservation(newReservation);
      setNewReservation(emptyReservationData);
      history.push(`/dashboard`);
    } catch (error) {
      throw error;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label for="first_name">First Name</label>
        <input
          id="first_name"
          value={newReservation.first_name}
          name="first_name"
          placeholder="First Name"
          className="form-control"
          onChange={handleChange}
        ></input>
      </div>
      <div className="form-group">
        <label for="last_name">Last Name</label>
        <input
          id="last_name"
          value={newReservation.last_name}
          name="last_name"
          placeholder="Last Name"
          className="form-control"
          onChange={handleChange}
        ></input>
      </div>
      <div className="form-group">
        <label for="mobile_number">Mobile Number</label>
        <input
          id="mobile_number"
          value={newReservation.mobile_number}
          name="mobile_number"
          placeholder="Mobile Number"
          className="form-control"
          onChange={handleChange}
        ></input>
      </div>
      <div className="form-group">
        <label for="reservation_date">Reservation Date</label>
        <input
          id="reservation_date"
          value={newReservation.reservation_date}
          name="reservation_date"
          placeholder="Reservation Date"
          className="form-control"
          onChange={handleChange}
        ></input>
      </div>
      <div className="form-group">
        <label for="reservation_time">Reservation Time</label>
        <input
          id="reservation_time"
          value={newReservation.reservation_time}
          name="reservation_time"
          placeholder="Reservation Time"
          className="form-control"
          onChange={handleChange}
        ></input>
      </div>
      <div className="form-group">
        <label for="people">Number of Guests</label>
        <input
          id="people"
          value={newReservation.people}
          name="people"
          placeholder="Number of Guests"
          className="form-control"
          onChange={handleChange}
        ></input>
      </div>

      <div>
        <Link>
          <button className="btn btn-secondary mr-1">Cancel</button>
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReservationForm;
