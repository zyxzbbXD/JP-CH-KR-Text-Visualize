import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

function LanguageSelectionScreen({ navigation }) {
  const languages = [
    { code: 'ZH', label: '中文', image: require('../assets/chinese.png') },
    { code: 'JA', label: '日本語', image: require('../assets/japanese.png') },
    { code: 'KO', label: '한국어', image: require('../assets/korean.png') },
  ];

  return (
    <View style={styles.container}>
      {languages.map((language) => (
        <TouchableOpacity
          key={language.code}
          style={styles.button}
          onPress={() => navigation.navigate('TimeSeriesSelection', { language: language.code })}
        >
          <Image source={language.image} style={styles.image} />
          <Text style={styles.text}>{language.label}</Text>
        </TouchableOpacity>
      ))}
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
    button: {
      margin: 20,
      alignItems: 'center',
      width: 120,
      height: 150,
    },
    image: {
      width: 120,
      height: 120,
      resizeMode: 'contain', 
    },
    text: {
      fontSize: 18,
      marginTop: 10,
    },
  });

export default LanguageSelectionScreen;