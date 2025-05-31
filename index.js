const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
require('dotenv').config();
require('./db');

const PORT = 8000;

app.use(bodyParser.json());
app.use('/users',userRoutes);
app.use('/tasks',taskRoutes);

app.get('/', (req,res) => {
    res.json({
        message: 'Task manager API is working!'
    });
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

