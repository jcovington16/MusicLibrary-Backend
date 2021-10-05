const express = require('express');
const repoContext = require('./repository/repository-wrapper');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log("Server started. Listening on port 3000");
});

app.get('/api/music', (req, res) => {
    const music = repoContext.songs.findAllSongs()
    return res.send(music);
});