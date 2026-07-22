import useAnecdotes from "../hooks/useAnecdotes";

const AnecdoteForm = () => {
  const { createAnecdote } = useAnecdotes();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value.trim();
    event.target.anecdote.value = "";

    if (content.length >= 5) {
      createAnecdote(content);
    }
  };

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
