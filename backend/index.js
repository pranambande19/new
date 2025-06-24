const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use('/api/users', userRoutes);



mongoose.connect(process.env.mongoose_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ MongoDB connection error:", err));


const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
