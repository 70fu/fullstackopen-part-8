import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import SelectGenre from "./SelectGenre";
import { useState } from "react";

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const books = useQuery(ALL_BOOKS, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      console.error(messages);
    },
  });

  if (books.loading) {
    return (
      <div>
        <h2>books</h2>
        loading books...
      </div>
    );
  }

  return (
    <div className="fit-container">
      <h2>books</h2>

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
      <SelectGenre
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
    </div>
  );
};

export default Books;
