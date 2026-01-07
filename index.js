const express = require("express");
const moviesData = require("./movies.json");

const app = express();
app.use(express.json());

app.post("/movie", (req, res) => {
  const movieName =
    req.body.queryResult?.parameters?.movie ||
    req.body.movie;

  if (!movieName) {
    return res.json({
      fulfillmentText: "Sorry 😕 I didn't understand the movie name."
    });
  }

  const movie = moviesData.movies.find(
    m => m.title.toLowerCase() === movieName.toLowerCase()
  );

  if (!movie) {
    return res.json({
      fulfillmentText: `Sorry 😕, I don’t have any idea about ${movieName}.`
    });
  }

  const reply = `🎬 *${movie.title}* (${movie.release_year})
Director: ${movie.director}
Cast: ${movie.cast.join(", ")}
Languages: ${movie.languages.join(", ")}
Genre: ${movie.genre.join(", ")}
Budget: ${movie.budget_crore || "N/A"} cr
Box Office: ${movie.box_office_crore || "N/A"} cr

Summary: ${movie.summary}`;

  return res.json({
    fulfillmentText: reply
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
