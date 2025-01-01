import express, { Application } from 'express';
import bodyParser from 'body-parser';
import todoRoutes from './routes/todoRoutes';

const app: Application = express();
const PORT = 4000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
