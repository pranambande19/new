const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const path =require("path")
dotenv.config();

const app = express();
// const __dirname = path.resolve();   
app.use(cors({
  origin: 'https://new-13vf.onrender.com',
  credentials: true
}));
app.use(express.json());
app.use('/api/users', userRoutes);
app.use(express.static(path.join(__dirname, "../frontend/build")))
// app.get('*',(_,res)=>{
//   res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
// })

mongoose.connect(process.env.mongoose_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ MongoDB connection error:", err));


const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
