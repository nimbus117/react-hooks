import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

/*
  Instructions:
    You're given an array of `postIds` and a `fetchPost` function.
    When you invoke `fetchPost`, you'll need to pass it an `id` from
    the `postIds` array. `fetchPost` returns a promise that will resolve
    with a post shaped like this

    {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }

    The UI should show `Loading` if the request is still being made,
    an error message if there was an error, or the post title, body,
    and a button to fetch the next post on a successful request.
*/

const postIds = [1, 2, 3, 4, 5, 6, 7, 8];

function fetchPost(id) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) =>
    res.json()
  );
}

function App() {
  const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);

    fetchPost(postIds[index])
      .then((post) => {
        setPost(post);
        setLoading(false);
        setError(null);
      })
      .catch((e) => {
        console.log(e);
        setError("Error getting post.");
        setLoading(false);
      });
  }, [index]);

  const nextPost = () => {
    setIndex((i) => (i === postIds.length - 1 ? i : i + 1));
  };

  const prevPost = () => {
    setIndex((i) => (i === 0 ? i : i - 1));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <h1>{`${postIds[index]}. ${error ? error : post.title}`}</h1>
      {error ? null : <p>{post.body}</p>}
      <div>
        <button disabled={index === 0} onClick={prevPost}>
          previous
        </button>
        <button disabled={index >= postIds.length - 1} onClick={nextPost}>
          next
        </button>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
