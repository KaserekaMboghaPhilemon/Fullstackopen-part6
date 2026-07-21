import { useAnecdoteActions } from "../store";
import { useNotificationActions } from "../notificationStore";

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions();
  const { showNotification } = useNotificationActions();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    await add(content);
    showNotification(`you created '${content}'`);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
