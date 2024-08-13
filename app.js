import express from 'express';
import categoryRoutes  from './routes/category_routes.js';
import entryRoutes from './routes/entry_routes.js';
import cors from 'cors'

const app = express();

// Middleware
// TODO: Prod: Add origin restriction to cors call
app.use(cors())

app.use(express.json())


app.get('/', (request, response) => response.send({ info: 'Journal API!!' }));

app.use(categoryRoutes);

app.use(entryRoutes);

export default app