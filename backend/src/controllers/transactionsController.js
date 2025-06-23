import { sql } from "../config/db.js";
export async function createTransactions(req,res) {
    try {
        const {title, amount, category, user_id} = req.body;
        if (!title || amount===undefined || !category || !user_id) {
            return res.status(400).json({ error: "Missing required query parameters" });
        }

        const transactions = await sql`
        INSERT INTO transactions (user_id, title, amount, category)
        VALUES (${user_id}, ${title}, ${amount}, ${category})`;

        console.log("Transaction created:", transactions);


        return res.status(201).json({ message: "Transaction created successfully", transactions });


    } catch (error) {
        console.error("Error fetching transactions:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export async function getTransactionsByUserId(req,res) {
    console.log("Fetching transactions for user:", req.params.userid);
    try {
        const { userid } = req.params;
        const transaction = await sql`SELECT * FROM transactions WHERE user_id = ${userid} ORDER BY created_at DESC`;

        if (transaction.length === 0) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        console.log("Transactions fetched:", transaction);

        return res.status(200).json(transaction);
    } catch (error) {
        console.error("Error fetching transaction:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export async function deleteTransactionById(req,res) {
    try {
        const { id } = req.params;

        if(isNaN(parseInt(id))){
            return res.status(400).json({message:"Invalid transaction id"})
        }

        const result = await sql`DELETE FROM transactions WHERE id = ${id}`;

        if (result.count === 0) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        return res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        console.error("Error deleting transaction:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export async function getTransactionsSummaryByUserId(req, res) {
    const { userid } = req.params;
    console.log("Fetching transactions summary for user:", userid);

    if (!userid) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const result = await sql`
            SELECT
                COALESCE(SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END), 0) AS income,
                COALESCE(SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END), 0) AS expense,
                COALESCE(SUM(amount), 0) AS balance
            FROM transactions
            WHERE user_id = ${userid}
        `;

        const summary = result[0];

        if (!summary) {
            return res.status(404).json({ message: "No transactions found" });
        }

        const { balance, income, expense } = summary;

        console.log("Transactions summary fetched:", {
            balance,
            income,
            expense
        });

        return res.status(200).json({
            balance: parseFloat(balance).toFixed(2),
            income: parseFloat(income).toFixed(2),
            expense: parseFloat(expense).toFixed(2)
        });

    } catch (error) {
        console.error("Error getting the summary", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
