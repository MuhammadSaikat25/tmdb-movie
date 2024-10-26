import { z } from "zod";

const MovieDetailsSchema = z.object({
  title: z.string(),
  overview: z.string(),
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
  release_date: z.string(),
  poster_path: z.string(),
  id: z.number(),
});

export default MovieDetailsSchema;
