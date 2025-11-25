import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import communityRoutes from './routes/communityRoutes';
import chatRoutes from './routes/chatRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/community', communityRoutes);
app.use('/api/chat', chatRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});