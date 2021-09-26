const router = require("express").Router();
let notesData = require("../db/db.json");
const fs = require("fs");

router.get("/notes", function (req, res) {
  res.json(notesData);
});

router.post("/notes", function (req, res) {
  let newNote = req.body;
  newNote.id = Math.round(Math.random() * 100000000);
  notesData.push(newNote);
  fs.writeFile(".db/db.json", JSON.stringify(notesData), function (err) {
    console.log(err);
  });
  console.log(newNote);
  res.json(notesData);
});

router.delete("/notes/:id", function (req, res) {
  let noteId = req.params.id;
  notesData = notesData.filter((note) => note.id != noteId);
  fs.writeFile("../db.json", JSON.stringify(notesData), function (err) {
    console.log("Deleted Note");
  });
  res.json(notesData);
});

module.exports = router;
