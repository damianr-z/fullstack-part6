import { useRatingStore } from './store';

const Statistics = () => {
  const { good, neutral, bad } = useRatingStore();
  const all = good + neutral + bad || 0;
  const average = all ? ((good - bad) / all).toFixed(2) : 0;
  const positive = all ? `${((good / all) * 100).toFixed(0)} %` : '0 %';

  return (
    <div>
      <h2>statistics</h2>
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
            <td>{all}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{average}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{positive}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
