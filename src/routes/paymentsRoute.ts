import express from "express";

import PaymentController from "../controllers/paymentsController";
import { checkAuth as authenticateUser } from "../middlewares/checkAuth"
import { checkPermission as authorizePermission } from "../middlewares/checkPermission"
import { validatePaymentRequest } from "../middlewares/validatePaymentRequest";

const router = express.Router();
router.get("/",
  authenticateUser,
  authorizePermission,
  PaymentController.getAllPayments
);

router.post("/",
  validatePaymentRequest,
  authenticateUser,
  PaymentController.createPayment
);

router.get("/:paymentId",
  authenticateUser,
  authorizePermission,
  PaymentController.getOnePayment
);

router.delete("/:paymentId", 
  authenticateUser,
  authorizePermission,
  PaymentController.deletePayment
);

export default router;