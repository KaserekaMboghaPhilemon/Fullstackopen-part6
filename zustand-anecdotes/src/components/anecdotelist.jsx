import { useAnecdotes, useAnecdoteActions } from "../store";
import { useNotificationActions } from "../notificationStore";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { vote, deleteAnecdote } = useAnecdoteActions();
  const { showNotification } = useNotificationActions();

  const handleVote = (anecdote) => {
    vote(anecdote.id);
    showNotification(`you voted '${anecdote.content}'`);
  };

  const handleDelete = async (anecdote) => {
    await deleteAnecdote(anecdote.id);
    showNotification(`deleted '${anecdote.content}'`);
  };

  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes);

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
            {anecdote.votes === 0 && (
              <button
                onClick={() => handleDelete(anecdote)}
                style={{ marginLeft: 5 }}
              >
                delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
