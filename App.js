import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Modal, Button } from 'react-native';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handlePress = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{modalContent}</Text>
          <Button title="关闭" onPress={() => setModalVisible(!modalVisible)} />
        </View>
      </Modal>

      <View style={styles.row}>
        <TouchableOpacity style={[styles.cell, styles.largeCell]} onPress={() => handlePress('真夏日 (17)\n今年 (8)\n初 (4)')}>
          <Text style={styles.text}>真夏日 (17)</Text>
          <Text style={styles.text}>今年 (8)</Text>
          <Text style={styles.text}>初 (4)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.cell, styles.mediumCell]} onPress={() => handlePress('气温 (14)\n33.8℃ (5)')}>
          <Text style={styles.text}>气温 (14)</Text>
          <Text style={styles.text}>33.8℃ (5)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.cell, styles.smallCell]} onPress={() => handlePress('最高气温 (6)\n14 時 (3)')}>
          <Text style={styles.text}>最高气温 (6)</Text>
          <Text style={styles.text}>14 時 (3)</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.cell, styles.largeCell]} onPress={() => handlePress('地点 (12)\n100 (6)\n石川県 (4)\n福岛县\n群马県')}>
          <Text style={styles.text}>地点 (12)</Text>
          <Text style={styles.text}>100 (6)</Text>
          <Text style={styles.text}>石川県 (4)</Text>
          <Text style={styles.text}>福岛县</Text>
          <Text style={styles.text}>群马県</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.cell, styles.mediumCell]} onPress={() => handlePress('广 (3)\n晴 (2)\n本州付近')}>
          <Text style={styles.text}>广 (3)</Text>
          <Text style={styles.text}>晴 (2)</Text>
          <Text style={styles.text}>本州付近</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.cell, styles.smallCell]} onPress={() => handlePress('速报值\n热中症\n注意\n日本語')}>
          <Text style={styles.text}>速报值</Text>
          <Text style={styles.text}>热中症</Text>
          <Text style={styles.text}>注意</Text>
          <Text style={styles.text}>日本語</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    backgroundColor: '#f88',
    borderRadius: 5,
  },
  largeCell: {
    flex: 2,
  },
  mediumCell: {
    flex: 1.5,
  },
  smallCell: {
    flex: 1,
  },
  text: {    
    fontSize: 16,
    color: '#000',
  },
});