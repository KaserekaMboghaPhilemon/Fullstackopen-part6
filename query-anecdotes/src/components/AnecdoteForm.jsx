import { useCreateAnecdote } from "../useAnecdoteQueries";
import { useNotify } from "../hooks/useNotification";

const AnecdoteForm = () => {
  const addMutation = useCreateAnecdote();
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
