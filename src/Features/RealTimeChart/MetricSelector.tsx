import React from 'react';
import Select from 'react-select';
import { useQuery, gql } from '@apollo/client';
import { LinearProgress, Typography } from '@material-ui/core';

const query = gql`
  query {
    getMetrics
  }
`;

const MetricSelector = (props: { handleSelect: (arg0: any) => void }) => {
  const { loading, error, data } = useQuery<any>(query);

  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  const metrics = data.getMetrics;
  const options = metrics.map((metric: String) => ({ label: metric, value: metric }));
  const onSelct = (values: any) => {
    props.handleSelect(values);
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
        onChange={onSelct}
      />
    </div>
  );
};

export default MetricSelector;
