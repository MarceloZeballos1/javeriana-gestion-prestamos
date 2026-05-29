import express from 'express';
import bibliotecaRoutes from './routes/bibliotecaRoutes.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', bibliotecaRoutes);

app.listen(port, () => {
});

export default app;