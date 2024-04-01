const express = require('express');
const journalRouter = express.Router();

const { getJournals, createJournal, editJournal, deleteJournal } = require("../controller/journal-controller");

journalRouter.get("/", getJournals);
journalRouter.post("/add", createJournal);
journalRouter.put("/update/:id", editJournal);
journalRouter.delete("/delete/:id", deleteJournal);

module.exports = journalRouter;