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
