import Notification from "./components/Notification";
import AnecdoteForm from "./components/AnecdoteForm";
import { useAnecdotes, useVoteAnecdote } from "./useAnecdoteQueries";
import { useNotify } from "./hooks/useNotification";

const App = () => {
  const result = useAnecdotes();
  const voteMutation = useVoteAnecdote();
  const notify = useNotify();

  if (result.isLoading) return <div>loading data...</div>;
  if (result.isError)
    return <div>anecdote service not available due to problems in server</div>;

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    voteMutation.mutate(
      { ...anecdote, votes: anecdote.votes + 1 },
      {
        onSuccess: () => {
          notify(`anecdote '${anecdote.content}' voted`);
        },
      },
    );
  };

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
