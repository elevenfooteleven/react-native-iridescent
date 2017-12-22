import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  LayoutAnimation,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

import { Accelerometer } from 'react-native-sensors';

export default class App extends React.Component {
  x = new Animated.Value(0);
  y = new Animated.Value(0);

  componentDidMount() {
    this.gyroscopeObservable = new Accelerometer({
      updateInterval: 100,
    });

    this.gyroscopeObservable.subscribe(({ x, y, z }) => {
      Animated.timing(this.x, {
        toValue: x * 500,
        duration: 50,
        useNativeDriver: true,
      }).start();

      Animated.timing(this.y, {
        toValue: y * 500,
        duration: 50,
        useNativeDriver: true,
      }).start();
    });
  }

  componentWillUnmount() {
    this.gyroscopeObservable.stop();
  }

  render() {
    return (
      <View>
        <Animated.View
          style={{
            // top: -width / 2,
            // left: -width / 2,
            position: 'absolute',
            top: -200,
            left: -200,
            bottom: -200,
            right: -200,
            width: width * 3,
            height: height * 3,
            backgroundColor: 'transparent',
            transform: [
              {
                translateX: this.x,
              },
              {
                translateY: this.y,
              },
            ],
          }}
        >
          <LinearGradient
            colors={['red', 'blue', 'lime']}
            style={{
              // top: -width / 2,
              // left: -width / 2,
              position: 'absolute',
              top: -200,
              left: -200,
              bottom: -200,
              right: -200,
              width: width * 3,
              height: height * 3,
              transform: [
                { rotate: '45deg', }
              ],
            }}
          />
        </Animated.View>
        <Image
          style={[{ ...StyleSheet.absoluteFillObject }]}
          source={require('./dots.png')}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sensor: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
});
