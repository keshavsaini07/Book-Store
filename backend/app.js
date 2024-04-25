import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import dbConnect from './dbConnect.js';
import bookRoute from './routes/bookRoute.js';

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;

const start = async () => {
  try {
    // console.log(process.env.MONGO_URL);
    await dbConnect(process.env.MONGO_URL);
    console.log("Database Connected");
    app.listen(PORT, ()=> console.log("Server is Running") );
  } catch (error) {
    console.log("Internet not Connected!") 
  }
}

start();


app.get("/", (req, res) => {
  res.send("you have contacted the server");
});

app.use(bookRoute);


// app.post("/book", (req, res) => {
//   res.send("New Book added");
// });

// app.get("/book/:id", (req, res) => {
//   res.send("Get A Particular Book");
// });

// app.put("/book/:id", (req, res) => {
//   res.send("Added this particular Book");
// });

// app.delete("/book/:id", (req, res) => {
//   res.send("Deleted this Particular Book");
// });




