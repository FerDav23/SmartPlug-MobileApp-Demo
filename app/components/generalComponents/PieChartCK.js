import React from "react";
import { 
  View, 
  StyleSheet, 
  Text, 
  TouchableOpacity 
} from "react-native";
import { PieChart } from "react-native-chart-kit";

import colors from "../../config/colors";
import textFont from "../../config/textFont";

// Define color palettes outside the component for reuse
const dailyColors = [
  "#4CAF50", // Material Green
  "#2196F3", // Material Blue
  "#FFC107", // Material Amber
  "#9C27B0", // Material Purple
  "#FF5722", // Material Deep Orange
  "#00BCD4", // Material Cyan
  "#FF9800", // Material Orange
  "#795548", // Material Brown
  "#607D8B", // Material Blue Grey
  "#E91E63"  // Material Pink
];

const weeklyColors = [
  "#6C5CE7", // Soft Purple
  "#00B894", // Mint Green
  "#FF7675", // Soft Red
  "#74B9FF", // Light Blue
  "#FDCB6E", // Warm Yellow
  "#A8E6CF", // Pale Green
  "#FF8B94", // Pink
  "#81ECEC", // Cyan
  "#FFA502", // Orange
  "#B39DFF"  // Lavender
];

function PieChartCK({ 
  isDaily, 
  onToggleTimeframe, 
  chartData, 
  totalConsumption,
  title,
  width = 320,
  height = 220,
  chartWidth = 180,
  chartHeight = 200
}) {
  return (
    <View style={styles.container}>
      {/* Chart Header with Title and Toggle Button */}
      <View style={styles.chartHeader}>
        <Text style={styles.chartTitle}>
          {title || (isDaily ? "Daily Energy Consumption" : "Weekly Energy Consumption")}
        </Text>
        <TouchableOpacity 
          style={styles.toggleButton} 
          onPress={onToggleTimeframe}
        >
          <Text style={styles.toggleButtonText}>
            Switch to {isDaily ? "Weekly" : "Daily"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Chart Container */}
      <View style={styles.chartContainer}>
        {chartData && chartData.length > 0 ? (
          <View style={styles.chartWrapper}>
            <View style={styles.chartContent}>
              <View style={styles.pieChartContainer}>
                <PieChart
                  data={chartData}
                  width={chartWidth}
                  height={chartHeight}
                  chartConfig={{
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16
                    },
                    propsForLabels: {
                      fontSize: 11,
                    }
                  }}
                  accessor="value"
                  backgroundColor="transparent"
                  paddingLeft="0"
                  absolute
                  hasLegend={false}
                  center={[50, 0]}
                  avoidFalseZero
                  style={styles.chart}
                />
              </View>
              <View style={styles.legendContainer}>
                {chartData.map((item, index) => (
                  <View key={index} style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                    <View style={styles.legendTextContainer}>
                      <Text style={styles.legendName} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text style={styles.legendValue}>
                        {item.formattedValue}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ) : (
          <Text style={styles.noDataText}>No energy consumption data available</Text>
        )}
      </View>

      {/* Total Consumption Display */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Consumption:</Text>
        <Text style={styles.totalValue}>
          {`${totalConsumption} kW`} {isDaily ? "/day" : "/week"}
        </Text>
      </View>
    </View>
  );
}

// Helper function to generate chart data (can be used by parent components)
export const generateChartData = (smartPlugs, consumptionData, isDaily) => {

  if (!smartPlugs?.length || !consumptionData?.length) {
    console.log("No data");
    return { chartData: [], totalConsumption: "0.00" };
  }


  const chartColors = isDaily ? dailyColors : weeklyColors;
  let totalEnergy = 0;
  
  // Create chart data by matching device_id with plug_id
  const newData = consumptionData.map((item, index) => {
    // Find the matching smart plug for this energy consumption entry
    const matchingPlug = smartPlugs.find(plug => plug.plug_id === item.device_id);
    
    // Add to the total energy consumption
    const energyValue = parseFloat(item.total_energy_kw || 0);
    totalEnergy += energyValue;
    
    return {
      name: matchingPlug ? matchingPlug.device_label : `Device ${index + 1}`,
      value: energyValue,
      color: chartColors[index % chartColors.length],
      legendFontColor: colors.text,
      legendFontSize: 12,
      // Add formatted value for display
      formattedValue: `${energyValue.toFixed(2)} kW`
    };
  });
  
  // Sort data by energy consumption (highest to lowest)
  newData.sort((a, b) => b.value - a.value);
  
  return { 
    chartData: newData, 
    totalConsumption: totalEnergy.toFixed(2) 
  };
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  chartHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  chartTitle: {
    ...textFont.font,
    fontSize: 16,
    fontWeight: "600",
    color: colors.title,
    flex: 1,
    marginRight: 10,
  },
  toggleButton: {
    backgroundColor: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.blue,
    elevation: 1,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  toggleButtonText: {
    ...textFont.font,
    color: colors.blue,
    fontSize: 13,
    fontWeight: "600",
  },
  chartContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    width: "100%",
    alignItems: "center",
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  chartWrapper: {
    width: "100%",
    alignItems: "center",
  },
  chartContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  pieChartContainer: {
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
  },
  chart: {
    borderRadius: 12,
    marginVertical: 5,
  },
  legendContainer: {
    width: "50%",
    paddingLeft: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 5,
    width: "100%",
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  legendName: {
    ...textFont.font,
    fontSize: 12,
    color: colors.text,
    flex: 1,
    marginRight: 4,
    textAlign: 'left',
  },
  legendValue: {
    ...textFont.font,
    fontSize: 12,
    color: colors.text,
    fontWeight: "500",
    textAlign: 'right',
  },
  noDataText: {
    ...textFont.font,
    fontSize: 14,
    color: colors.darkGrey,
    textAlign: "center",
    marginVertical: 30,
    paddingHorizontal: 20,
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: "95%",
    borderWidth: 1,
    borderColor: colors.lightGrey,
    alignSelf: "center",
  },
  totalLabel: {
    ...textFont.font,
    fontSize: 14,
    color: colors.text,
    marginRight: 8,
    fontWeight: "500",
  },
  totalValue: {
    ...textFont.font,
    fontSize: 14,
    fontWeight: "700",
    color: colors.blue,
  },
});

export default PieChartCK;
