const express = require('express');
const app = express();
const dotenv = require('dotenv');
const userRoutes = require('./routes/User');
const connect = require('./database/connect');
const cookieParser = require('cookie-parser');
const cors = require('cors');
dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(cookieParser());
app.use(
	cors({
		origin:"http://localhost:5173",
		credentials:true,
	})
)

app.use(express.json());

// User routes
app.use('/api/v1/auth', userRoutes);

//sample routes    
app.get('/api', (req, res) => {
   return  res.json({ success: true,
    message: 'Hello from server!' });
    }
);

// connect to database
connect();

// listen to port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);