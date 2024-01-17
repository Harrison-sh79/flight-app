import { View, Text, useWindowDimensions } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Props {
  confirmed: boolean;
  size?: "lg" | "md";
  zIndex?: number;
  delay?: number;
  bottom: number;
  noShadow?: boolean;
}

const Cloud = ({
  size = "md",
  delay = 0,
  bottom,
  zIndex,
  confirmed,
  noShadow,
}: Props) => {
  const { width } = useWindowDimensions();
  const sizeValue =
    size === "lg"
      ? { height: 1500, width: 2000 }
      : { height: 1000, width: 800 };
  const offeset = sizeValue.width / 3 + width;
  const translateX = useSharedValue(offeset);
  useEffect(() => {
    if (confirmed) {
        console.log("🚀 ~ file: Cloud.tsx:36 ~ useEffect ~ confirmed:", confirmed)
        
      setTimeout(
        () =>
          (translateX.value = withTiming(-offeset, {
            duration: 6000,
            easing: Easing.linear,
          })),
        8000 + delay
      );
    }
  }, [confirmed]);

  const cloudAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    ...sizeValue,
    bottom,
    zIndex,
  }));

  return (
    <Animated.Image
      source={require("../assets/images/clouds.png")}
      className="h-[400px] w-[400px] absolute self-center bottom-[40px] z-[9999]"
      style={[
        {
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 10,
          shadowColor: "black",
          shadowOpacity: noShadow ? 0 : 0.08,
        },
        cloudAnimatedStyle,
      ]}
      resizeMode={'contain'}
    />
  );
};

export default Cloud;
