import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const CHART_HEIGHT = 180;
const BAR_COLOR = '#009FE3';
const BAR_MIN_HEIGHT = 4;
const BAR_WIDTH = 28;
const BAR_GAP = 10;
const AXIS_COLOR = '#94a3b8';
const Y_AXIS_WIDTH = 32;

const BarChartCK = ({ chartData, xLabel, yLabel }) => {
  const hasData =
    chartData?.datasets?.[0]?.data?.length > 0 &&
    chartData?.labels?.length > 0;

  if (!hasData) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No consumption data available</Text>
      </View>
    );
  }

  const values = chartData.datasets[0].data.map((v) => parseFloat(v) || 0);
  const maxVal = Math.max(...values, 0.01);
  const labels = chartData.labels;

  // Y-axis ticks: 0 and max, optionally one in the middle
  const yTicks = [0, maxVal];
  if (maxVal > 0.5) yTicks.splice(1, 0, Math.round((maxVal / 2) * 100) / 100);

  return (
    <View style={styles.wrapper}>
      <View style={styles.chartCard}>
        <View style={styles.chartRow}>
          {/* Y-axis labels */}
          <View style={styles.yAxisContainer}>
            {yTicks.slice().reverse().map((tick, i) => (
              <Text key={i} style={styles.yAxisLabel}>
                {Number(tick).toFixed(1)}
              </Text>
            ))}
          </View>
          {/* Chart plot area + x-axis labels */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={styles.scrollContent}
          >
            <View>
              {/* Plot area with axes: bars sit on x-axis (y=0) */}
              <View style={styles.plotArea}>
                {values.map((val, i) => {
                  const heightRatio = maxVal > 0 ? val / maxVal : 0;
                  const barHeight = Math.max(
                    BAR_MIN_HEIGHT,
                    heightRatio * CHART_HEIGHT
                  );
                  return (
                    <View key={i} style={styles.barColumn}>
                      <View style={styles.barSpacer} />
                      <Text style={styles.valueOnBar}>{Number(val).toFixed(2)}</Text>
                      <View
                        style={[
                          styles.bar,
                          { height: barHeight },
                        ]}
                      />
                    </View>
                  );
                })}
              </View>
              {/* X-axis labels (time) */}
              <View style={styles.xAxisRow}>
                {labels.map((label, i) => (
                  <Text
                    key={i}
                    style={styles.barLabel}
                    numberOfLines={1}
                  >
                    {label ?? ''}
                  </Text>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export const generateChartData = (consumptionData) => {
  if (!consumptionData?.energyConsumption?.length) {
    return { chartData: [], totalConsumption: '0.00' };
  }

  let totalEnergy = 0;
  const newData = consumptionData.energyConsumption.map((item) => {
    const energyValue = parseFloat(item.energy_watts) || 0;
    totalEnergy += energyValue;
    return {
      dateHour: item.time_hour,
      value: energyValue.toFixed(2),
    };
  });

  return {
    chartData: newData,
    totalConsumption: totalEnergy.toFixed(2),
  };
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  chartCard: {
    backgroundColor: '#f8fafc',
    marginHorizontal: 4,
    marginVertical: 4,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  yAxisContainer: {
    width: Y_AXIS_WIDTH,
    height: CHART_HEIGHT,
    justifyContent: 'space-between',
    paddingRight: 6,
    paddingBottom: 2,
    paddingTop: 2,
    borderRightWidth: 1,
    borderColor: AXIS_COLOR,
    marginRight: 4,
  },
  yAxisLabel: {
    fontSize: 9,
    color: '#64748b',
  },
  scrollContent: {
    paddingRight: 16,
  },
  plotArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: CHART_HEIGHT,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: AXIS_COLOR,
    gap: BAR_GAP,
  },
  barColumn: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: BAR_WIDTH + BAR_GAP,
    height: CHART_HEIGHT,
  },
  barSpacer: {
    flex: 1,
    minHeight: 2,
  },
  valueOnBar: {
    fontSize: 9,
    color: '#1e293b',
    fontWeight: '600',
    marginBottom: 2,
  },
  bar: {
    width: BAR_WIDTH,
    backgroundColor: BAR_COLOR,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    minHeight: BAR_MIN_HEIGHT,
  },
  xAxisRow: {
    flexDirection: 'row',
    gap: BAR_GAP,
    marginTop: 6,
    paddingLeft: 1,
  },
  barLabel: {
    fontSize: 9,
    color: '#64748b',
    width: BAR_WIDTH + BAR_GAP,
    textAlign: 'center',
  },
  noDataContainer: {
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    marginVertical: 8,
  },
  noDataText: {
    fontSize: 15,
    color: '#64748b',
  },
});

export default BarChartCK;
