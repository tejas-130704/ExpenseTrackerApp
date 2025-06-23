import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const SIZE = 300; // Size of the Sharingan
const TOMOE_SIZE = SIZE / 6.5;

export default function SharinganLoader() {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1400,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.sharingan}>
        <View style={styles.pupil} />
        <View style={styles.iris} />
        <Animated.View style={[styles.tomoes, { transform: [{ rotate: rotateInterpolate }] }]}>
          {[0, 120, -120].map((angle, index) => (
            <View
              key={index}
              style={[
                styles.tomoeArea,
                {
                  transform: [
                    { translateX: -100 },
                    { translateY: -100 },
                    { rotate: `${angle}deg` },
                  ],
                },
              ]}
            >
              <View style={styles.tomoe}>
                <View style={styles.tomoeBefore} />
              </View>
            </View>
          ))}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  sharingan: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: 'hsl(0,100%,36%)',
    borderWidth: SIZE / 30,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 50,
    elevation: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  pupil: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 80,
    height: 80,
    backgroundColor: '#000',
    borderRadius: 40,
    transform: [{ translateX: -40 }, { translateY: -40 }],
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
  },
  iris: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#000',
    transform: [{ translateX: -100 }, { translateY: -100 }],
  },
  tomoes: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  tomoeArea: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  tomoe: {
    position: 'absolute',
    width: TOMOE_SIZE,
    height: TOMOE_SIZE,
    backgroundColor: '#000',
    borderRadius: TOMOE_SIZE / 2,
    left: '50%',
    top: -TOMOE_SIZE * 0.5,
    transform: [{ translateX: -TOMOE_SIZE / 2 }],
    justifyContent: 'center',
    alignItems: 'center',
  },
  tomoeBefore: {
    position: 'absolute',
    top: -TOMOE_SIZE * 0.303,
    left: TOMOE_SIZE * 0.031,
    width: TOMOE_SIZE * 1.51,
    height: TOMOE_SIZE * 1.69,
    borderRadius: TOMOE_SIZE,
    borderTopWidth: TOMOE_SIZE / 2.6,
    borderLeftWidth: TOMOE_SIZE / 9.7,
    borderColor: '#000',
    borderLeftColor: 'transparent',
    borderTopColor: '#000',
    backgroundColor: 'transparent',
    transform: [{ rotate: '-35deg' }],
  },
});
