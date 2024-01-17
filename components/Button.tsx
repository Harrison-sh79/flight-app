import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Animated, {
  FlipInXDown,
  FlipOutXUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  showFlyInfo: boolean;
  onPress: () => void;
}

const Button = ({ showFlyInfo, onPress }: Props) => {
  const buttonScale = useSharedValue(1);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handlePress = (press: string) => {
    buttonScale.value = withTiming(press === "pressIn" ? 0.9 : 1, {
      duration: 80,
    });
  };

  return (
    <Animated.View
      entering={FlipInXDown.duration(600)}
      exiting={FlipOutXUp}
      style={buttonAnimatedStyle}
      className="w-full items-center absolute bottom-[40px] z-[9999]"
    >
      <TouchableOpacity
        activeOpacity={1}
        className="w-1/2"
        style={{
          shadowOffset: { width: 0, height: 8 },
          shadowRadius: 6,
          shadowColor: "#9bc3fb",
        }}
        onPress={onPress}
        onPressIn={() => handlePress("pressIn")}
        onPressOut={() => handlePress("pressOut")}
      >
        <LinearGradient
          colors={["#6E8DFF", "#4995FE"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="w-full h-[45px] items-center justify-center rounded-[20px]"
          style={{
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 10,
            shadowColor: "#4995fe",
          }}
        >
          <Text className="text-white text-[16px] font-bold">
            {showFlyInfo ? "Go to Home screen" : "Confirm $1,536.00"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};
export default Button;
