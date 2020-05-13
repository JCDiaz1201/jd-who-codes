const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 5000;

const mongoPromise = require("./db/mongoPromises");

app.use(cors())
app.use(bodyParser.json())

app.get("/getVideos", (request, response) => {
    mongoPromise.getVideos()
        .then(res => {
            // console.log("Server log: ", res)
            response.send(res)
        })
        .catch(error => {
            console.log(error);
            response.sendStatus(404)
        })
})


app.listen(process.env.PORT || port, function () {
    console.log(`Listening on port ${port}`)
})