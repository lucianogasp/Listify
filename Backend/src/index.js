import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import usersRoute from '#routes/users.routes.js';
import listsRoute from '#routes/lists.routes.js';
import itemsRoute from '#routes/items.routes.js';
import { errorMiddleware } from '#middlewares/error.middleware.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors({
  "origin": "http://localhost:5173"
}));
app.use(usersRoute);
app.use(listsRoute);
app.use(itemsRoute);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});