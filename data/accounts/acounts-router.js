const express = require("express");

const db = require("../dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
	db("accounts")
		.then(accounts => res.status(200).json(accounts))
		.catch(error => {
			res.status(500).json({ message: "Could not process request" });
		});
});

router.get("/:id", (req, res) => {
	db("accounts")
		.where({ id: req.params.id })
		.first()
		.then(account => {
			account
				? res.status(200).json(account)
				: res.status(404).json({ message: "Account not found" });
		});
});

router.post("/", (req, res) => {
	if (req.body) {
		db("accounts")
			.insert(req.body, "id")
			.then(([id]) => id)
			.then(id => {
				db("accounts")
					.where({ id })
					.first()
					.then(account => {
						res.status(201).json(account);
					});
			})
			.catch(error =>
				res.status(500).json({ message: "Could not add account" })
			);
	} else {
		res.status(400).json({
			message:
				"Please fill enter a number greater than or equal to 0 for the budget"
		});
	}
});

router.delete("/:id", (req, res) => {
	db("accounts")
		.where({ id: req.params.id })
		.del()
		.then(() => res.status(200).json("account deleted"))
		.catch(error =>
			res.status(500).json({ message: "could not remove account" })
		);
});

router.put("/:id", (req, res) => {
	db("accounts")
		.where({ id: req.params.id })
		.update(req.body)
		.then(account => {
			account
				? res.status(200).json({ message: "updated account" })
				: res.status(404).json({ message: "account not found" });
		})
		.catch(error => {
			res.status(500).json({ message: "failed to update account" });
		});
});

module.exports = router;
