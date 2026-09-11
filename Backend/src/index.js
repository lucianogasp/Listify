import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import usersRoute from '#routes/users.routes.js';
import listsRoute from '#routes/lists.routes.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors({
  "origin": "http://localhost:3000/"
}));
app.use(usersRoute);
app.use(listsRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});