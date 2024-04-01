const express = require("express");
const cors = require("cors");
const journalRouter = require("./route/journal-route");

require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/journals", journalRouter);

app.use("/api", (req, res) => {
    res.send("Hello World");
});

app.listen(8000, () => console.log('App is running'));