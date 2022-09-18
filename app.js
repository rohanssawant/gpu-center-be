import dotenv from "dotenv";
dotenv.config();
import express from "express";
import users from "./users.json" assert { type: "json" };
import bodyParser from "body-parser";
import { tokenController } from "./middleware/token.js";

const app = express();
app.use(bodyParser.json());
const port = 3000;

app.get("/", (req, res) => {
  console.log('inside "/"');
  res.status(200).json({ msg: "hi" });
});

app.post("/token", (req, res) => {
  try {
    let token = tokenController.generateJwt(req.body);
    console.log("--in /token", token);
    res.status(200).json({ token });
  } catch (error) {
    throw error;
  }
});

// params username,password, token
app.post("/login", (req, res) => {
  try {
    console.log("req.body", req.body);

    let decoded = tokenController.verifyJwt(req.body.token);
    console.log("--decoded", decoded);
    if (!decoded.token) throw new Error("Not authenticated", 401);

    console.log("--users", users);
    let loggedInUser = users.filter(
      (user) => user.username == req.body.username
    );
    if (
      loggedInUser.length > 0 &&
      loggedInUser[0].password == req.body.password
    ) {
      res.status(200).json({ msg: `Hello ${loggedInUser[0].name}` });
    } else {
      throw new Error(`username ${req.body.username} not found`);
    }
  } catch (error) {
    console.log({ error: error.status });
    res.status(404).json({ msg: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
