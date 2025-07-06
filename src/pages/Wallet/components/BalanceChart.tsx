import { Chart, useChart } from '@chakra-ui/charts';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

export const BalanceChart = () => {
  const chart = useChart({
    data: [
      { allocation: 60, type: 'seg' },
      { allocation: 45, type: 'ter' },
      { allocation: 12, type: 'qua' },
      { allocation: 4, type: 'qui' },
      { allocation: 4, type: 'sex' },
      { allocation: 4, type: 'sab' },
      { allocation: 4, type: 'dom' },
    ],
    series: [{ name: 'allocation', color: 'gray.solid' }],
  });

  return (
    <Chart.Root maxH="sm" chart={chart}>
      <BarChart data={chart.data}>
        <CartesianGrid stroke={chart.color('border.muted')} vertical={false} />
        <XAxis axisLine={false} tickLine={false} dataKey={chart.key('type')} />
        <YAxis
          axisLine={false}
          tickLine={false}
          domain={[0, 100]}
          tickFormatter={(value) => `R$${value}`}
        />
        {chart.series.map((item) => (
          <Bar
            key={item.name}
            isAnimationActive={false}
            dataKey={chart.key(item.name)}
            fill={chart.color(item.color)}
          />
        ))}
      </BarChart>
    </Chart.Root>
  );
};
