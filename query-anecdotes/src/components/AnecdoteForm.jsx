import { useAddAnecdote } from "../useAnecdoteQueries";
import { useNotify } from "../context/NotificationContext";

const AnecdoteForm = () => {
  const addMutation = useAddAnecdote();
  const notify = useNotify();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    addMutation.mutate(
      { content, votes: 0 },
      {
        onSuccess: () => {
          notify(`anecdote '${content}' created`);
        },
        onError: (error) => {
          const errorMessage =
            error.response?.data?.error ||
            "too short anecdote, must have length 5 or more";

          notify(errorMessage);
        },
      },
    );
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
