import SelectGenre from "./SelectGenre";
import { useEffect, useState } from "react";
import BookList from "./BookList";
import { LOGGED_USER } from "../queries";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const Recommendations = () => {
  //TODO i could check whether there is a user token in local storage or not before doing a query
  const loggedUser = useQuery(LOGGED_USER, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      console.error(messages);
    },
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedUser.loading && !loggedUser.data.me) {
      console.warn("no user logged in, redirecting to /login");

      //redirect to login
      navigate("/login");
    }
  }, [navigate, loggedUser]);

  if (loggedUser.loading) {
    return (
      <>
        <h2>Recommendations</h2>
        loading user data...
      </>
    );
  }

  if (!loggedUser.data.me) {
    return (
      <>
        <h2>Recommendations</h2>
        redirecting to login page...
      </>
    );
  }

  return (
    <div className="fit-container">
      <h2>Recommendations</h2>
      books in your favorite genre
      <b>{` ${loggedUser.data.me.favoriteGenre}`}</b>
      <BookList selectedGenre={loggedUser.data.me.favoriteGenre} />
    </div>
  );
};

export default Recommendations;
