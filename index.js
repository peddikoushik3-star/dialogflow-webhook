const express = require("express");
const moviesData = require("./movies.json");

const app = express();
app.use(express.json());

app.post("/movie", (req, res) => {
  // ✅ Get movie name from Dialogflow request
  const userMovie =
    req.body.queryResult.parameters.movie.toLowerCase().trim();

  // ✅ Find movie in dataset
  const movie = moviesData.movies.find(
    m => m.title === userMovie
  );

  // ❌ Movie not found
  if (!movie) {
    return res.json({
      fulfillmentText: "Sorry 😕, I don’t have any idea about this movie."
    });
  }

  // ✅ Movie found → Dialogflow response
  return res.json({
    fulfillmentText: `
🎬 *${movie.title.toUpperCase()}*
📅 Year: ${movie.release_year}
🎥 Director: ${movie.director}
🌐 Languages: ${movie.languages.join(", ")}
📖 Summary: ${movie.summary}
`
  });
});

app.listen(3000, () => {
  console.log("Dialogflow webhook running on port 3000");
});
