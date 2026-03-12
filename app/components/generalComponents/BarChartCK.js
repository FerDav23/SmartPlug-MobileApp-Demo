import React from 'react';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions, StyleSheet, View, Text, ScrollView } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const BarChartCK = ({ chartData, xLabel, yLabel }) => {
  // Check if chartData has valid structure and data
  const hasData = chartData && 
                  chartData.datasets && 
                  chartData.datasets[0] && 
                  chartData.datasets[0].data && 
                  chartData.datasets[0].data.length > 0;

  if (!hasData) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No consumption data available</Text>
      </View>
    );
  }

  // Calculate chart width based on data points
  // Make chart more compact but still ensure minimum width is reasonable
  const chartWidth = Math.max(
    screenWidth - 64, // Reduced width to make it more compact
    chartData.labels.length * 50 // Reduced from 80 to 50 for more compact bars
  );

  return (
    <ScrollView 
      horizontal={true}
      showsHorizontalScrollIndicator={true}
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContentContainer}
    >
      <BarChart
        data={chartData}
        width={chartWidth}
        height={220}
        yAxisLabel={yLabel}
        xAxisLabel={xLabel}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 1, // Changed to 1 decimal place for energy values
          color: (opacity = 1) => `rgba(0, 80, 150, ${opacity})`, // Better color for visibility
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          barPercentage: 0.9, // Increased from 0.7 to make bars wider relative to spacing
          propsForLabels: {
            fontSize: 10 // Smaller font for labels
          },
          propsForVerticalLabels: {
            fontSize: 10 // Smaller font for vertical labels
          },
          spacing: 0.05, // Reduced spacing between bars (was 0.2)
          yAxisInterval: 1, // Ensures y-axis labels are not too crowded
          yAxisSide: 'left', // Ensures y-axis is on the left
          formatYLabel: (value) => value, // Simple formatter
          horizontalLabelRotation: 0,
          fromZero: true,
          withInnerLines: true,
          useShadowColorFromDataset: false,
          propsForBackgroundLines: {
            strokeDasharray: '', // Solid lines
            strokeWidth: 0.5,
          },
          yAxisMargin: 5, // Reduced margin between y-axis and chart (default is higher)
          style: {
            borderRadius: 10,
            paddingLeft: 0, // Minimize left padding
            paddingRight: 0, // Minimize right padding
          }
        }}
        style={{
          marginVertical: 5,
          marginHorizontal: -30, // Remove horizontal margin
          borderRadius: 5,
          paddingLeft: 0, // Reduce left padding
        }}
        verticalLabelRotation={30}
        showValuesOnTopOfBars={true}
        withHorizontalLabels={true}
        segments={5} // Reduce number of horizontal grid lines
      />
    </ScrollView>
  );
};

export const generateChartData = (consumptionData) => {
  if (!consumptionData.energyConsumption.length) {
    console.log("No consumption data available");
    return { chartData: [], totalConsumption: "0.00" };
  }

  let totalEnergy = 0; // Initialize totalEnergy

  // Create chart data by matching device_id with plug_id
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
    totalConsumption: totalEnergy.toFixed(2) 
  };
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 0,
    paddingLeft: 0, // Remove left padding
  },
  scrollContentContainer: {
    paddingLeft: 0, // Remove left padding in content
    paddingRight: 5, // Minimal right padding
  },
  noDataContainer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eaeaea',
    margin: 8,
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
  }
});

export default BarChartCK; 