const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/quiz/:item/questions", (req, res) => {
  fs.readFile("./src/public/rules.json", "utf8", (err, data) => {
    if (err) {
      res.status(402).send(err);
    } else {
      const questions = JSON.parse(data)
        ["items"].filter((item) => item.name == req.params.item)[0]
        .quiz.map((item) => item.question);
      res.status(200).json({ questions });
    }
  });
});

app.post("/quiz/:item/answer/:id", (req, res) => {
  fs.readFile("./src/public/rules.json", "utf8", (err, data) => {
    if (err) {
      res.status(402).send(err);
    } else {
      const answer = JSON.parse(data)["items"].filter(
        (item) => item.name == req.params.item
      )[0].quiz[req.params.id].answer;
      const userInput = req.body.answer;
      console.log(req.body, req.params, req.query);
      const isCorrect = answer == userInput ? true : false;
      console.log(isCorrect);
      res.status(200).send({ isCorrect });
    }
  });
});

app.listen(8000, () => console.log("app running on port 8000"));
