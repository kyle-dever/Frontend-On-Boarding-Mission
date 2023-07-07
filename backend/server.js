import express from "express";
import connection from "./database.js";
const app = express();
const port = 3000;

app.get("/api/", (req, res) => {
    connection.query("SELECT * FROM User", (err, data) => {
        res.send(data);
      });
});


app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});