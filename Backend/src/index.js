import express from 'express';
import 'dotenv/config';
import cors from 'cors';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors({
  "origin": "http://localhost:3000/"
}));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});