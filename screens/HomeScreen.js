import React from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import Svg, { G, Rect, Text as SvgText } from 'react-native-svg';
import * as d3Hierarchy from 'd3-hierarchy';
import { scaleLinear } from 'd3-scale';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');


const data = {
  name: '日本語',
  children: [
    {
      name: '真夏日 (17)',
      value: 17,
      keyword: '真夏日地点',
    },
    {
      name: '気温 (14)',
      value: 14,
      keyword: '気温',
    },
    { name: '今年 (8)', value: 8, keyword: '今年' },
    { name: '初 (4)', value: 4, keyword: '初' },
    {
      name: '最高気温 (6)',
      value: 6,
      keyword: '最高気温',
      children: [
        { name: '33.8°C (5)', value: 5, keyword: '33.8℃' },
        { name: '速報値', value: 1, keyword: '速報値' },
      ],
    },
    {
      name: '14時 (3)',
      value: 3,
      keyword: '14時',
    },
    {
      name: '地点 (12)',
      value: 12,
      keyword: '地点',
      children: [
        {
          name: '100 (6)',
          value: 6,
          keyword: '100',
          children: [
            { name: '石川県 (4)', value: 4, keyword: '石川県' },
            { name: '福島県', value: 1, keyword: '福島県' },
            { name: '群馬県', value: 1, keyword: '群馬県' },
          ],
        },
      ],
    },
    {
      name: '広 (3)',
      value: 3,
      keyword: '広',
      children: [{ name: '本州付近', value: 1, keyword: '本州付近' }],
    },
    {
      name: '晴 (2)',
      value: 2,
      keyword: '晴',
    },
    {
      name: '熱中症 (1)',
      value: 1,
      keyword: '熱中症',
    },
    {
      name: '注意 (1)',
      value: 1,
      keyword: '注意',
    },
  ],
};

const Treemap = ({ width, height }) => {
    const navigation = useNavigation();
  
    const root = d3Hierarchy.hierarchy(data).sum(d => d.value);
  
    const treemap = d3Hierarchy
      .treemap()
      .size([width, height])
      .padding(1)
      .tile(d3Hierarchy.treemapBinary);
    treemap(root);
  
    const color = scaleLinear().domain([0, 17]).range(['#ffcccc', '#ff0000']);
  
    const leaves = root.leaves();
  
    return (
      <Svg width={width} height={height}>
        <G>
          {leaves.map((leaf, i) => (
            <TapGestureHandler
              key={i}
              onHandlerStateChange={(event) => {
                console.log('手势状态变化：', event.nativeEvent.state);
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
              </G>
            </TapGestureHandler>
          ))}
        </G>
      </Svg>
    );
  };
  
  const HomeScreen = () => {
    const navigation = useNavigation();
  
    return (
      <View style={styles.container}>
        <Treemap width={screenWidth - 20} height={500} />
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