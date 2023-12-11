import { useState } from "react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import { useMutation, useQuery } from "@apollo/client";

const Authors = () => {
  const [selectedName, setSelectedName] = useState("");
  const [born, setBorn] = useState(0);
  const token = localStorage.getItem("library-user-token");
  const authorsResult = useQuery(ALL_AUTHORS, {
    onCompleted: (data) => {
      console.log(data);
      if (data.allAuthors.length > 0) {
        setSelectedName(data.allAuthors[0].name);
      }
    },
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      console.error(messages);
    },
  });
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      console.error(messages);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedName);
    console.log(born);

    editAuthor({ variables: { name: selectedName, born: parseInt(born) } });
  };

  if (authorsResult.loading) {
    return (
      <div>
        <h2>authors</h2>
        loading authors...
      </div>
    );
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authorsResult.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && (
        <>
          <h2>set birthyear</h2>
          <form onSubmit={handleSubmit}>
            <select
              value={selectedName}
              onChange={(e) => {
                setSelectedName(e.target.value);
              }}
            >
              {authorsResult.data.allAuthors.map((a) => (
                <option key={a.name} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
            <div>
              born
              <input
                type="number"
                value={born}
                onChange={({ target }) => setBorn(target.value)}
              />
            </div>
            <button type="submit">update author</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Authors;
