import express from 'express';
import bibliotecaRoutes from './routes/bibliotecaRoutes';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', bibliotecaRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

export default app;