import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { G, Circle, Path, Text as SvgText } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const labels = [
    "真夏日", "今年", "初", "気温", "最高気温",
    "33.8°C", "速報値", "14時", "地点", "100",
    "石川県", "福島県", "群馬県", "広", "本州付近",
    "晴", "熱中症", "注意"
  ];
  
  const data = Array.from({ length: 20 }, (_, i) => ({
    value: Math.random() * 100, // 调整数据范围以匹配图像
    color: `hsl(${(i / 20) * 360}, 100%, 50%)`,
    label: labels[i % labels.length], // 使用所有关键词作为标签
  }));

function maxDataValue(data) {
  return Math.max(...data.map(d => d.value));
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians)),
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, startAngle);
  const end = polarToCartesian(x, y, radius, endAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 1, end.x, end.y,
    'L', x, y,
    'Z',
  ].join(' ');
}

const TimeSeriesSelectionScreen = ({ route }) => {
  const navigation = useNavigation();
  const { language } = route.params;

  const handlePress = (color) => {
    let dataFile;
    if (color.includes('hsl(0') || color.includes('hsl(360')) {
      dataFile = require('../assets/now_data.json');
    } else if (color.includes('hsl(120') || color.includes('hsl(180')) {
      dataFile = require('../assets/past_data.json');
    } else if (color.includes('hsl(240') || color.includes('hsl(300')) {
      dataFile = require('../assets/future_data.json');
    }

    navigation.navigate('Home', { language, dataFile });
  };

  const radius = 50;
  const innerRadius = 10;
  const maxBarHeight = 30; // 调整柱状图的最大高度
  const maxValue = maxDataValue(data);

  return (
    <View style={styles.container}>
      <Svg height="300" width="300" viewBox="0 0 100 100">
        <G transform="translate(50, 50)">
          {data.map((d, i) => {
            const startAngle = (i / data.length) * 360;
            const endAngle = ((i + 1) / data.length) * 360;
            const barHeight = (d.value / maxValue) * maxBarHeight;
            const path = describeArc(0, 0, innerRadius + barHeight, startAngle, endAngle);
            const midAngle = (startAngle + endAngle) / 2;
            const labelPos = polarToCartesian(0, 0, innerRadius + barHeight + 5, midAngle);
            return (
              <G key={i}>
                <Path
                  d={path}
                  fill={d.color}
                  onPress={() => handlePress(d.color)}
                />
                <SvgText
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  fontSize="4"
                  transform={`rotate(${midAngle + 90}, ${labelPos.x}, ${labelPos.y})`}
                >
                  {d.label}
                </SvgText>
              </G>
            );
          })}
          <Circle cx="0" cy="0" r={innerRadius} fill="white" />
          <Circle cx="0" cy="0" r={innerRadius} fill="none" stroke="black" strokeWidth="1" />
          <SvgText
            x="0"
            y="0"
            textAnchor="middle"
            dy="0.3em"
            fontSize="6"
            fontWeight="bold"
          >
            时间
          </SvgText>
        </G>
      </Svg>
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'hsl(0, 100%, 50%)' }]} />
          <Text style={styles.legendText}>现在</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'hsl(120, 100%, 50%)' }]} />
          <Text style={styles.legendText}>之前</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: 'hsl(240, 100%, 50%)' }]} />
          <Text style={styles.legendText}>未来</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  legendContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
    color: '#333',
  },
});

export default TimeSeriesSelectionScreen;