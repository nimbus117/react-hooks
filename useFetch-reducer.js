import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

/*
  Instructions:
    Refactor `useFetch` to use `useReducer` instead of
    `useState`.
*/

const fetchReducer = (state, payload) => {
  switch (payload.type) {
    case "fetch":
      return {
        ...state,
        loading: true,
      };
    case "success":
      return {
        data: payload.data,
        error: null,
        loading: false,
      };
    case "error":
      return {
        ...state,
        error: "Error fetching data. Please try again.",
        loading: false,
      };
    default:
      throw new Error("fetchReducer: invalid payload type");
  }
};

function useFetch(url) {
  const [state, dispatch] = React.useReducer(fetchReducer, {
    data: null,
    error: null,
    loading: true,
  });

  React.useEffect(() => {
    const request = async () => {
      dispatch({ type: "fetch" });
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw Error(response.statusText || "Unknown");
        }
        const data = await response.json();
        dispatch({ type: "success", data });
      } catch (error) {
        console.log(url, error);
        dispatch({ type: "error" });
      }
    };
    request();
  }, [url]);

  return {
    loading: state.loading,
    data: state.data,
    error: state.error,
  };
}

const postIds = [1, 2, 3, 4, 5, 6, 7, 8];

function App() {
  const [index, setIndex] = React.useState(0);

  // https://httpstat.us/400
  const { loading, data, error } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${postIds[index]}`
  );

  const incrementIndex = () => {
    setIndex((i) => (i === postIds.length - 1 ? i : i + 1));
  };

  if (loading === true) {
    return <p>Loading</p>;
  }

  if (error) {
    return (
      <React.Fragment>
        <p>{error}</p>
        <button onClick={incrementIndex}>Next Post</button>
      </React.Fragment>
    );
  }

  return (
    <div className="App">
      <h1>{data.title}</h1>
      <p>{data.body}</p>
      {error && <p>{error}</p>}
      {index === postIds.length - 1 ? (
        <p>No more posts</p>
      ) : (
        <button onClick={incrementIndex}>Next Post</button>
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
