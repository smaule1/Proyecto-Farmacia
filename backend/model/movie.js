import mongoose from "mongoose";

//Schema
const movieSchema = new mongoose.Schema({   
  plot: String,
  genres: [String],
  runtime: Number,  
  cast: [String],
  title: String,
  fullplot: String,
  languages: [String],
  released: Date,
  directors: [String],
  writers: [String],
  awards: {
    wins: Number,
    nominations: Number,
    text: String
  },
  lastupdated: String,
  year: Number,
  imdb: {
    rating: mongoose.Decimal128,
    votes: Number,
    id: Number
  },
  countries: [String],
  type: String
});

//Model
const Movie = mongoose.model('movies', movieSchema );

export default Movie;