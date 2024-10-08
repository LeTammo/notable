const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const wikiRoutes = require('./routes/wiki');
const preferencesRoutes = require('./routes/preferences');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/wiki', wikiRoutes);
app.use('/preferences', preferencesRoutes);

app.get('/', (req, res) => {
    console.log("Default route");
    res.send('Welcome to the Personal Wiki API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});