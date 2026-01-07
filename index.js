const express = require("express");
const moviesData = require("./movies.json");

const app = express();
app.use(express.json());

app.post("/movie", (req, res) => {
  try {
    console.log("Incoming body:", req.body);

    const movieName =
      req.body.movie ||
      req.body.queryResult?.parameters?.movie;

    if (!movieName) {
      return res.json({
        response: "Please tell me a movie name 🙂"
      });
    }

    const userMovie = movieName.toLowerCase();

    const movie = moviesData.movies.find(
      m => m.title.toLowerCase() === userMovie
    );

    if (!movie) {
      return res.json({
        response: "Sorry 😕, I don’t have any idea about this movie."
      });
    }

    return res.json({
      response: `🎬 *${movie.title}* (${movie.release_year})
Director: ${movie.director}
Cast: ${movie.cast.join(", ")}
Languages: ${movie.languages.join(", ")}
Genre: ${movie.genre.join(", ")}
Budget: ${movie.budget_crore || "N/A"} cr
Box Office: ${movie.box_office_crore || "N/A"} cr

Summary: ${movie.summary}`
    });

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ response: "Server error 😵" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

