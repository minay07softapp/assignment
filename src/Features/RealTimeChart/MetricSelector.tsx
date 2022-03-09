import React from 'react';
import Select from 'react-select';

export const staticMetrics = ['tubingPressure', 'waterTemp', 'flareTemp', 'oilTemp', 'casingPressure', 'injValveOpen'];
const options = staticMetrics.map((metric) => ({ label: metric, value: metric }));

const MetricSelector = () => {
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
