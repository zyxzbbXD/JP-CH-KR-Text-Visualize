import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import Svg, { G, Rect, Text as SvgText } from 'react-native-svg';
import * as d3Hierarchy from 'd3-hierarchy';
import { scaleLinear } from 'd3-scale';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

const Treemap = ({ width, height, data }) => {
  const navigation = useNavigation();

  const root = d3Hierarchy.hierarchy(data).sum(d => d.value);

  const treemap = d3Hierarchy
    .treemap()
    .size([width, height])
    .padding(1)
    .tile(d3Hierarchy.treemapBinary);
  treemap(root);

  const color = scaleLinear().domain([0, 17]).range(['#ffcccc', '#ff0000']);

  const leaves = root.descendants().filter(d => d.depth === 1);

  return (
    <Svg width={width} height={height}>
      <G>
        {leaves.map((leaf, i) => (
          <TapGestureHandler
            key={i}
            onHandlerStateChange={(event) => {
              if (event.nativeEvent.state === State.ACTIVE) {
                navigation.navigate('Detail', { keyword: leaf.data.keyword });
              }
            }}
          >
            <G transform={`translate(${leaf.x0},${leaf.y0})`}>
              <Rect
                width={leaf.x1 - leaf.x0}
                height={leaf.y1 - leaf.y0}
                fill={color(leaf.value)}
                strokeWidth={1}
                stroke="black"
                pointerEvents="box-none"
              />
              <SvgText
                x={(leaf.x1 - leaf.x0) / 2}
                y={(leaf.y1 - leaf.y0) / 2}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={10}
                fill="black"
                fontFamily="Arial"
                pointerEvents="none"
              >
                {leaf.data.name}
              </SvgText>
              {leaf.children && leaf.children.map((child, j) => (
                <SvgText
                  key={j}
                  x={(leaf.x1 - leaf.x0) / 2}
                  y={(leaf.y1 - leaf.y0) / 2 + (j + 1) * 12}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={8}
                  fill="black"
                  fontFamily="Arial"
                  pointerEvents="none"
                >
                  {child.data.name}
                </SvgText>
              ))}
            </G>
          </TapGestureHandler>
        ))}
      </G>
    </Svg>
  );
};



const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { language } = route.params;
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = () => {
      try {
        const jsonData = require('../assets/now_data.json');
        setData(jsonData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>加载中...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>语言: {language}</Text>
      <Treemap width={screenWidth - 20} height={500} data={data} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Detail', { keyword: 'example' })}
      >
        <Text style={styles.buttonText}>跳转到详情页</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomeScreen;