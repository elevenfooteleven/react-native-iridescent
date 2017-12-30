import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import Iridescent from 'react-native-iridescent';

const { width, height } = Dimensions.get('window');
const GRADIENT_WIDTH = height * 3;
const GRADIENT_HEIGHT = height * 3;

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Iridescent
          background={<Image
            shouldRasterizeIOS
            blurRadius={40}
            source={require('./gradient.jpg')}
            style={styles.gradient}
          />}
        >
            <Image
              style={{
                position: 'absolute',
                height: 240,
                width: width - 32,
                resizeMode: 'cover',
              }}
              source={require('./apple-pay-card.png')}
            />
        </Iridescent>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  gradient: {
    width: GRADIENT_WIDTH,
    height: GRADIENT_HEIGHT,
  },
});
