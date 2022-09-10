import { Movie } from "../entity/Movie";
import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";



@InputType()
class MovieInput {
  @Field()
  title: string;
  
  @Field(() => Int)
  minutes: number;
}

@Resolver()
export class MovieResolver {
  @Mutation(() => Movie)
  async addMovie(
    @Arg("data") data: MovieInput,
  ) {
    const newMovie = await Movie.create(data).save();
    console.log(newMovie);

    return newMovie;
  }

  @Query(() => [Movie])
  movies() {
    return Movie.find();
  }
}
