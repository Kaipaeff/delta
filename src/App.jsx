import data from '../db.json';

function App() {
  const { indicators, current_day, last_day, this_day_week } = data;

  const handleClick = id => {
    console.log(id);
  };

  return (
    <div className="container">
      <h1 className="chart-title">Delta Charts</h1>
      <table className="table-body">
        <thead>
          <tr className="table-head_row">
            <th className="table-head_title head-title">Показатель</th>
            <th className="table-head_title">Текущий день</th>
            <th className="table-head_title">Вчера</th>
            <th className="table-head_title">Этот день недели</th>
          </tr>
        </thead>
        <tbody>
          {indicators.map(indicator => {
            const currentValue = current_day.find(item => item.id === indicator.id)?.value || '-';
            const lastValue = last_day.find(item => item.id === indicator.id)?.value || '-';
            const weekValue = this_day_week.find(item => item.id === indicator.id)?.value || '-';

            return (
              <tr key={indicator.id} className="table-head_row" onClick={() => handleClick(indicator.id)}>
                <td className="table-body_data data-title">{indicator.title}</td>
                <td className="table-body_data">{currentValue}</td>
                <td className="table-body_data">{lastValue}</td>
                <td className="table-body_data">{weekValue}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
