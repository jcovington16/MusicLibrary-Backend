const express = require('express');
const repoContext = require('./repository/repository-wrapper');
const cors = require('cors');
const { validateSongs } = require('./middleware/music-validation');

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

app.get('/api/music/:id', (req, res) => {
    const id = req.params.id;
    const musicId = repoContext.songs.findSongById(id);
    return res.send(musicId);
})

app.post("/api/music", (req, res) => {
  const newSong = req.body;
  const addedSongs = repoContext.songs.createSong(newSong);
  return res.send(addedSongs);
});

app.put("/api/music/:id", (req, res) => {
  const id = req.params.id;
  const songTracksToUpdate = req.body;
  const updatedSonglist = repoContext.songs.updateSong(songTracksToUpdate);
  return res.send(updatedSonglist);
});

app.delete("/api/music/:id", (req, res) => {
    const id = req.params.id;
    const updatedDataSet = repoContext.songs.deleteSong(id);
    return res.send(updatedDataSet);
});
