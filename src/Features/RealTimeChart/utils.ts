import { gql } from '@apollo/client';

export const matricsQuery = gql`
query ($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      at
      value
      metric
      unit
    }
  }
}
`;

export const SUB_QUERY = gql`
  subscription {
    newMeasurement {
      metric
      at
      value
      unit
    }
  }
`;

export const allowedMetrics = ['waterTemp', 'flareTemp', 'oilTemp'];

// eslint-disable-next-line max-len
export const flatMetrics = (graphData:any) => [].concat(...graphData.getMultipleMeasurements.map((d: { measurements: any; }): any => d.measurements));

export function getConfig(data: any) {
  const metrics = flatMetrics(data);
  const wData = metrics.map((d: any) => ({
    at: d.at, [d.metric]: d.value, value: d.value, unit: d.unit,
  }));
  return wData;
}
