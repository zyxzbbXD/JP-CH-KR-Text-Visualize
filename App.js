import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import LanguageSelectionScreen from './screens/LanguageSelectionScreen';
import TimeSeriesSelectionScreen from './screens/TimeSeriesSelectionScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LanguageSelection">
        <Stack.Screen name="LanguageSelection" component={LanguageSelectionScreen} options={{ title: '选择语言' }} />
        <Stack.Screen name="TimeSeriesSelection" component={TimeSeriesSelectionScreen} options={{ title: '选择需要展示的时间序列' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: '基于关系矩阵的树形图' }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: '文本详情' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;