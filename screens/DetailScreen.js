import React from 'react';
import { StyleSheet, ScrollView, Text, Image } from 'react-native';

const articles = [
  {
    title: '今年初の真夏日100地点以上　石川県で33.8℃　全国の今年最高気温を更新',
    content: `今日5日(日)こどもの日は、本州付近は広く晴れて、気温が上昇。真夏日(最高気温30℃以上)地点は今年初めて100地点以上となっています。また、14時までの最高気温は石川県加賀市加賀中津原では33.8℃まで上がるなど、全国で今年これまでの最高気温を更新しています。熱中症にご注意ください。

真夏日地点　今年初めて100地点以上
今日5日こどもの日は、本州付近は広く晴れています。たっぷりの日差しと季節先取りの暖気が流れ込み、気温がグングン上がっています。 14時までの最高気温は、石川県加賀市加賀中津原では33.8℃まで気温が上がり、全国の今年これまでの最高気温を更新しています。福島県伊達市で33.7℃、群馬県桐生市で32.8℃、福島市で32.7℃、長野市で32.2℃、熊谷市で31.7℃、富山市で31.3℃などと広く真夏日となり、今年これまでで一番の暑さとなっています。 真夏日(最高気温30℃以上)地点は今年初めて100地点以上となっています。真夏日100地点以上となるのは過去10年で最も早くなりました。
※気温の値は全て14時までの速報値`,
    imageUrl: require('../assets/news.png')
  }
];

const DetailScreen = ({ route }) => {
  const { keyword } = route.params;

  const highlightText = (text, keyword) => {
    const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <Text key={index} style={styles.highlight}>
          {part}
        </Text>
      ) : (
        <Text key={index}>{part}</Text>
      )
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {articles.map((article, index) => (
        <React.Fragment key={index}>
          <Text style={styles.title}>{article.title}</Text>
          <Image
            source={article.imageUrl}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.content}>
            {highlightText(article.content, keyword)}
          </Text>
        </React.Fragment>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 16,
  },
  highlight: {
    backgroundColor: 'yellow',
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 16,
  },
});

export default DetailScreen;