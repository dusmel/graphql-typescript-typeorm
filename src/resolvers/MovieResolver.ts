import { Movie } from "../entity/Movie";
import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";

@InputType()
class MovieInput {
  @Field()
  title: string;

  @Field(() => Int)
  minutes: number;
}

@InputType()
class MovieUpdateInput {
  @Field({ nullable: true})
  title?: string;

  @Field(() => Int, { nullable: true })
  minutes?: number;
}

@Resolver()
export class MovieResolver {
  @Mutation(() => Movie)
  async addMovie(@Arg("data") data: MovieInput) {
    const newMovie = await Movie.create(data).save();
    console.log(newMovie);

    return newMovie;
  }

  @Mutation(() => Movie)
  async updateMovie(
    @Arg("id", () => Int) id: number,
    @Arg("data") data: MovieUpdateInput
  ) {
    const movie =  await Movie.findOne(id);
    if (movie) {
      await Movie.update({id}, data);
      return movie;
    }

    throw new Error("Id not found");
  }

  @Mutation(() => String)
  async deleteMovie(
    @Arg("id", () => Int) id: number,
  ) {
    const movie =  await Movie.findOne(id);
    if (movie) {
      await Movie.delete({id});
      return `Movie ${movie.title} deleted successfully`;
    }

    throw new Error("Id not found");
  }

  @Query(() => [Movie])
  movies() {
    return Movie.find();
  }
}
