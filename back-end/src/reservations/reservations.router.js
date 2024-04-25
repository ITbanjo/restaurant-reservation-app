/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/:reservation_id/status")
  .put(controller.updateReservationStatus)
  .all(methodNotAllowed);

router
  .route("/:reservation_id")
  .get(controller.read)
  .put(controller.edit)
  .all(methodNotAllowed);

router
  .route("/")
  .get(controller.listForSpecifiedDateOrPhoneNumber)
  .post(controller.create)
  .all(methodNotAllowed);

module.exports = router;
