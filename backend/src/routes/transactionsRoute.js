import express from "express";
import { sql } from "../config/db.js"; // Adjust the path as necessary
const router = express.Router()
import { createTransactions, getTransactionsByUserId, deleteTransactionById, getTransactionsSummaryByUserId  } from "../controllers/transactionsController.js"; // Adjust the path as necessary

router.post("/", createTransactions);

router.get("/:userid", getTransactionsByUserId  );


router.delete("/:id", deleteTransactionById);


router.get("/summary/:userid", getTransactionsSummaryByUserId)


export default router