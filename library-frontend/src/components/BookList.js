import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const BookList = ({ selectedGenre }) => {
  const books = useQuery(ALL_BOOKS, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      console.error(messages);
    },
  });

  if (books.loading) {
    return <div>loading books...</div>;
  }

  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {books.data.allBooks
          .filter(
            (book) => !selectedGenre || book.genres.includes(selectedGenre)
          )
          .map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default BookList;
