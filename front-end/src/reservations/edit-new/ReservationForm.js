import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation, editReservation } from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";
import { asDateAndTimeStringObj } from "../../utils/date-time";
import formatPhoneNumber from "../../utils/format-phone-number";
import handleDateErrors from "../../utils/handle-multiple-date-errors";

function ReservationForm({
  reservationData,
  setReservationData,
  edit = false,
}) {
  const {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
    reservation_id,
  } = reservationData;
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState(null);

  function handleChange(event) {
    if (event.target.name === "people") {
      setReservationData({
        ...reservationData,
        [event.target.name]: Number(event.target.value), //people input set to int
      });
    } else if (event.target.name === "mobile_number") {
      setReservationData({
        ...reservationData,
        [event.target.name]: formatPhoneNumber(event.target.value), //phone input formatting
      });
    } else {
      setReservationData({
        ...reservationData,
        [event.target.name]: event.target.value,
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const currentDateAndTime = asDateAndTimeStringObj(new Date());
    try {
      if (edit) {
        await editReservation(reservation_id, {
          ...reservationData,
          ...currentDateAndTime,
        });
      } else {
        await createReservation({
          ...reservationData,
          ...currentDateAndTime,
        });
      }
      history.push(`/dashboard?date=${reservation_date}`);
    } catch (error) {
      // display both past-date and Tuesday errors at once if necesarry
      setErrorMessage(handleDateErrors(reservation_date, error));
    }
  }

  function handleCancel() {
    history.goBack();
  }

  return (
    <div>
      <ErrorAlert error={errorMessage} />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="first_name">First Name</label>
          <input
            id="first_name"
            value={first_name}
            name="first_name"
            className="form-control"
            onChange={handleChange}
          ></input>
        </div>
        <div className="form-group">
          <label for="last_name">Last Name</label>
          <input
            id="last_name"
            value={last_name}
            name="last_name"
            className="form-control"
            onChange={handleChange}
          ></input>
        </div>
        <div className="form-group">
          <label for="mobile_number">Mobile Number</label>
          <input
            id="mobile_number"
            value={mobile_number}
            name="mobile_number"
            type="tel"
            placeholder="xxx-xxx-xxxx"
            maxLength={14}
            className="form-control"
            onChange={handleChange}
          ></input>
        </div>
        <div className="form-group">
          <label for="reservation_date">Reservation Date</label>
          <input
            id="reservation_date"
            value={reservation_date}
            name="reservation_date"
            type="date"
            placeholder="YYYY-MM-DD"
            pattern="\d{4}-\d{2}-\d{2}"
            className="form-control"
            onChange={handleChange}
          ></input>
        </div>
        <div className="form-group">
          <label for="reservation_time">Reservation Time</label>
          <input
            id="reservation_time"
            value={reservation_time}
            name="reservation_time"
            type="time"
            placeholder="HH:MM"
            pattern="[0-9]{2}:[0-9]{2}"
            className="form-control"
            onChange={handleChange}
          ></input>
        </div>
        <div className="form-group">
          <label for="people">Number of Guests</label>
          <input
            id="people"
            value={people}
            name="people"
            type="number"
            className="form-control"
            onChange={handleChange}
          ></input>
        </div>

        <div>
          <button onClick={handleCancel} className="btn btn-secondary mr-1">
            Cancel
          </button>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
