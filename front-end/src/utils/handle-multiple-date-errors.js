function handleDateErrors(date, backendError) {
  const todayValue = Date.parse(new Date().toUTCString().slice(0, 16));
  const resDateValue = Date.parse(new Date(date).toUTCString().slice(0, 16));
  const weekdayName = new Date(date).toUTCString().slice(0, 3);

  if (resDateValue < todayValue && weekdayName === "Tue") {
    return {
      message: `Reservation cannot be made on a Tuesday and must also be set on a future date.`,
    };
  } else {
    return backendError;
  }
}

export default handleDateErrors;
