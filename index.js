const express = require("express");
const moviesData = require("./movies.json");

const app = express();
app.use(express.json());

app.post("/movie", (req, res) => {
  const userMovie = req.body.movie.toLowerCase();

  const movie = moviesData.movies.find(
    m => m.title === userMovie
  );

  if (!movie) {
    return res.json({
      response: "Sorry 😕, I don’t have any idea about this movie."
    });
  }

  res.json({
    title: movie.title,
    release_year: movie.release_year,
    languages: movie.languages,
    genre: movie.genre,
    director: movie.director,
    cast: movie.cast,
    budget: movie.budget_crore || "Information not available",
    box_office: movie.box_office_crore || "Information not available",
    summary: movie.summary
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
