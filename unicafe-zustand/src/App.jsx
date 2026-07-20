import {
  useUnicafeGood,
  useUnicafeNeutral,
  useUnicafeBad,
  useUnicafeActions,
} from "./store";

const App = () => {
  const good = useUnicafeGood();
  const neutral = useUnicafeNeutral();
  const bad = useUnicafeBad();
  const {
    good: incGood,
    neutral: incNeutral,
    bad: incBad,
    reset,
  } = useUnicafeActions();

  const total = good + neutral + bad;
  const average = total === 0 ? 0 : (good - bad) / total;
  const positive = total === 0 ? 0 : (good / total) * 100;

  return (
    <div>
      <h1>Unicafe</h1>
      <h2>give feedback</h2>
      <button onClick={incGood}>good</button>
      <button onClick={incNeutral}>neutral</button>
      <button onClick={incBad}>bad</button>
      <button onClick={reset}>reset stats</button>

      <h2>statistics</h2>
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <tr>
              <td>good</td>
              <td>{good}</td>
            </tr>
            <tr>
              <td>neutral</td>
              <td>{neutral}</td>
            </tr>
            <tr>
              <td>bad</td>
              <td>{bad}</td>
            </tr>
            <tr>
              <td>all</td>
              <td>{total}</td>
            </tr>
            <tr>
              <td>average</td>
              <td>{average}</td>
            </tr>
            <tr>
              <td>positive</td>
              <td>{positive} %</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
