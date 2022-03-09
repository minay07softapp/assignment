import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MetricSelector from './MetricSelector';
import ApolloProvider from './ApolloProvider';

const useStyles = makeStyles({
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
  },
});

const RealTimeChart: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.box}>
      <MetricSelector />
      <h1>Chart</h1>
    </div>
  );
};

export default () => (
  <ApolloProvider>
    <RealTimeChart />
  </ApolloProvider>
);
