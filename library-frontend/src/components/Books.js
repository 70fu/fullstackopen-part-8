import SelectGenre from "./SelectGenre";
import { useState } from "react";
import BookList from "./BookList";

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState("");

  return (
    <div className="fit-container">
      <h2>books</h2>

      <BookList selectedGenre={selectedGenre} />
      <SelectGenre
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
    </div>
  );
};

export default Books;
