import React, { useState } from 'react';
import data from '../db.json';
import { LineChart } from '@mui/x-charts';

function App() {
  const [selectedIndicator, setSelectedIndicator] = useState(null);
  const { indicators, current_day, last_day, this_day_week } = data;

  const handleClick = id => {
    setSelectedIndicator(prevId => (prevId === id ? null : id));
  };

  const getChartData = indicatorId => {
    if (!indicatorId) return { xAxis: [], series: [] };

    const current = current_day.find(item => item.id === indicatorId);
    const last = last_day.find(item => item.id === indicatorId);
    const week = this_day_week.find(item => item.id === indicatorId);

    const currentValue = current ? parseInt(current.value) || 0 : 0;
    const lastValue = last ? parseInt(last.value) || 0 : 0;
    const weekValue = week ? parseInt(week.value) || 0 : 0;

    return {
      xAxis: ['Вчера', 'Текущий день', 'Этот день недели'],
      series: [currentValue, lastValue, weekValue],
    };
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
            const isSelected = selectedIndicator === indicator.id;
            const chartData = getChartData(indicator.id);

            return (
              <React.Fragment key={indicator.id}>
                <tr className="table-head_row" onClick={() => handleClick(indicator.id)}>
                  <td className="table-body_data data-title">{indicator.title}</td>
                  <td className="table-body_data">{currentValue}</td>
                  <td className="table-body_data">{lastValue}</td>
                  <td className="table-body_data">{weekValue}</td>
                </tr>
                {isSelected && (
                  <tr>
                    <td colSpan="4">
                      <div className="chart-container">
                        <LineChart
                          series={[{ data: chartData.series }]}
                          xAxis={[{ scaleType: 'point', data: chartData.xAxis }]}
                          yAxis={[{ id: 'leftAxisId' }, { id: 'rightAxisId' }]}
                          width={600}
                          height={240}
                        />
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
