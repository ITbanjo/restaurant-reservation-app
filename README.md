
# Periodic Tables (restaurant-reservation-app)

Periodic Tables is a restaurant reservation application that enables users to create, edit, look-up, fulfill, and cancel reservations.

This is the final capstone project that I completed during my enrollment at the Chegg Skills (Thinkful) coding bootcamp. 

Built using React, Bootstrap, Node.js, Knex.js, and Express.js. 

## Links

[Deployment](https://restaurant-reservation-app-front-end-ja43.onrender.com) - If the dashboard page throws a fetch error, please allow a minute or two for the back-end server to spin up. 

[Back-End Server](https://restaurant-reservation-app-back-end-reua.onrender.com)

## Screenshots

### Dashboard

The Dashboard screen lists all reservations for the given date that is selected. By default, the Dashboard shows the current date. 

Additionally, the Dashboard shows a list of all of the restaurant tables, their capacity, and availability.

Dashboard buttons:

- Previous Day: Decrements the viewed date by 1 day
- Next Day: Increments the viewed date by 1 day
- Today: Resets the viewed date to the current date

Reservation buttons:
- Seat: Takes you to the Seat Reservation screen, in order to seat the reservation at a table
- Finish: (Appears after reservation has been seated) Changes table's status from occupied to free, and removes the reservation from the dashboard
- Edit: Takes you to the Edit Reservation screen, where the info can be altered
- Cancel: Changes the reservation's status to "cancelled" and removes it from the dashboard screen

![](./src/img/dashboard.png)

![](./src/img/dashboard-finish.png)

## Seat Reservation

The Seat Reservation screen contains a dropdown list of restaurant tables, where the user may assign a table to the selected. Clicking submit will seat the reservation at the selected table and return the user to the Dashboard screen.

(The Seat Reservation screen is accessed by clicking the "seat" button on a reservation at the Dashboard screen.)

![](./src/img/seat.png)

## Search

The Search screen gives the user the option to search for reservations by phone number. Partial and complete phone numbers are both valid input.

When the "Find" button is clicked matching reservations will appear below. If no match is found, the message "No reservations found" will display.

This screen shows all matching reservations, regardless of status.

![](./src/img/search.png)

## New Reservation

The New Reservation screen presents the user with an empty form, in which reservation info can be entered.

When the "Submit" button is clicked, the new reservation will be saved, and the user will be taken to the dashboard screen for the date of the new reservation.

Clicking cancel will take the user back to the previous page.

![](./src/img/new-reservation.png)

## Edit Reservation

The Edit Reservation screen is accessed by clicking the "Edit" button on a reservation at either the Dashboard or Search screens, and presents the user with a reservation form filled in with the current data for that reservation.

When the "Submit" button is clicked the edited info will be saved to the reservation in question, and the user will be taken to the Dashboard screen for the date of that reservation.

Clicking cancel will take the user back to the previous page.

![](./src/img/edit-reservation.png)

## New Table

The New Table screen presents the user with an empty form, in which a table name and capacity can be entered.

When the "Submit" button is clicked, the new table will be saved, and the user will be taken to the Dashboard screen. 

Clicking cancel will take the user back to the previous page.

![](./src/img/new-table.png)

### Install

```sh
npm install
```

### Usage

```sh
npm start
```

### Run tests

- `npm test` runs all tests.
- `npm run test:backend` runs all backend tests.
- `npm run test:frontend` runs all frontend tests.

