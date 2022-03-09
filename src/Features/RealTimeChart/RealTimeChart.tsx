import React, { FC, useEffect, useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { Typography } from '@material-ui/core';

import MetricSelector from './MetricSelector';
import ApolloProvider from './ApolloProvider';
import { useStyles } from './styles';
import {
  getConfig, matricsQuery, SUB_QUERY, allowedMetrics,
} from './utils';

const date1 = new Date();
const RealTimeChart: FC = () => {
  const [chartData, setChartData] = useState<any>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<any>([]);
  const classes = useStyles();
  const { error, data } = useQuery<any>(matricsQuery, {
    variables: {
      // eslint-disable-next-line max-len
      input: [...selectedMetrics.map((m: any) => ({ metricName: m, after: date1.valueOf() - 300000 }))],
    },
  });

  useSubscription(SUB_QUERY, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newData = subscriptionData.data.newMeasurement;
      if (allowedMetrics.includes(newData.metric)) {
        setChartData([
          ...chartData,
          {
            [newData.metric]: newData.value,
            ...newData,
          },
        ]);
      }
    },
  });

  useEffect(() => {
    if (data) {
      const data2 = getConfig(data);
      setChartData(data2);
    }
  }, [data]);

  if (error) return <Typography color="error">{error}</Typography>;
  const handleSelect = (selected: { value: any }[]) => {
    setSelectedMetrics([...selected.map((s: { value: any }) => s.value)]);
  };
  return (
    <div className={classes.box}>
      <MetricSelector handleSelect={handleSelect} />
      <h1>Chart</h1>
      <LineChart
        width={900}
        height={600}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <YAxis dataKey="value" tickCount={20} label="F" />
        <XAxis
          allowDuplicatedCategory={false}
          tickCount={10}
          dataKey="at"
          label="Time"
          tickFormatter={(val) => {
            const date = new Date(val);
            return date.toLocaleTimeString([], { timeStyle: 'short' });
          }}
        />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="flareTemp" dot={false} stroke="#8884d8" activeDot />
        <Line type="monotone" dataKey="waterTemp" dot={false} stroke="#82ca9d" activeDot />
        <Line type="monotone" dataKey="oilTemp" dot={false} stroke="red" activeDot />
      </LineChart>
    </div>
  );
};

export default () => (
  <ApolloProvider>
    <RealTimeChart />
  </ApolloProvider>
);
