import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Rect, G, Text as SvgText } from 'react-native-svg';
import * as d3Hierarchy from 'd3-hierarchy';
import * as d3Scale from 'd3-scale';

const data = {
  name: 'root',
  children: [
    { name: '真夏日 (17)', value: 17 },
    { name: '气温 (14)', value: 14 },
    { name: '地点 (12)', value: 12 },
    { name: '今年 (8)', value: 8 },
    { name: '最高气温 (6)', value: 6 },
    { name: '100 (6)', value: 6 },
    { name: '33.8°C (5)', value: 5 },
    { name: '初 (4)', value: 4 },
    { name: '石川县 (4)', value: 4 },
    { name: '广 (3)', value: 3 },
    { name: '14 时 (3)', value: 3 },
    { name: '晴 (2)', value: 2 },
  ],
};

const Treemap = ({ width, height }) => {
  const treemap = d3Hierarchy.treemap()
    .size([width, height])
    .padding(1);

  const root = d3Hierarchy.hierarchy(data)
    .sum(d => d.value);

  treemap(root);

  const color = d3Scale.scaleLinear()
    .domain([0, 17])
    .range(['#ffcccc', '#ff0000']);

  return (
    <Svg width={width} height={height}>
      {root.leaves().map((leaf, i) => (
        <G key={i} transform={`translate(${leaf.x0},${leaf.y0})`}>
          <Rect
            width={leaf.x1 - leaf.x0}
            height={leaf.y1 - leaf.y0}
            fill={color(leaf.value)}
          />
          <SvgText
            x={4}
            y={14}
            fontSize={12}
            fill="black"
          >
            {leaf.data.name}
          </SvgText>
        </G>
      ))}
    </Svg>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <Treemap width={400} height={400} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});