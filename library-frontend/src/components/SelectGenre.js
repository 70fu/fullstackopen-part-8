import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const SelectGenre = ({ selectedGenre, setSelectedGenre }) => {
  const books = useQuery(ALL_BOOKS, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      console.error(messages);
    },
  });

  if (books.loading) {
    return <div>loading genres...</div>;
  }

  const onGenreClicked = (genre) => {
    setSelectedGenre(selectedGenre === genre ? null : genre);
  };

  //unique set of genres
  const genres = [
    ...new Set(books.data.allBooks.flatMap((book) => book.genres)),
  ];
  genres.sort();
  return (
    <div className="tag-list">
      {genres.map((genre) => (
        <div
          onClick={() => onGenreClicked(genre)}
          className={`tag-list-tag ${
            genre === selectedGenre ? "tag-selected" : ""
          }`}
          key={genre}
        >
          {genre}
        </div>
      ))}
    </div>
  );
};

export default SelectGenre;
