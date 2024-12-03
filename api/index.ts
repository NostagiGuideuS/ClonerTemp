const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(3006, () => console.log("Server ready on port 3006."));

module.exports = app;