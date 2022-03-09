import React from 'react';
import Select from 'react-select';
import { useQuery, gql } from '@apollo/client';
import { LinearProgress, Typography } from '@material-ui/core';

const query = gql`
  query {
    getMetrics
  }
`;

const MetricSelector = () => {
  const { loading, error, data } = useQuery<any>(query);

  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  const metrics = data.getMetrics;
  const options = metrics.map((metric: String) => ({ label: metric, value: metric }));

  const handleSelect = (selected: any) => {
    console.log({ selected });
  };
  return (
    <div style={{ width: 600 }}>
      <Select
        styles={{
          menu: () => ({
            background: '#FFF ',
          }),
        }}
        isMulti
        name="metrics"
        options={options}
        onChange={handleSelect}
      />
    </div>
  );
};

export default MetricSelector;
