import React, { useEffect, useRef, useState } from "react";
import { FlatList, Text, View } from "react-native";
import Animated, {
  Extrapolate,
  FlipOutXUp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  ZoomIn,
  FadeInDown,
  FadeOut,
} from "react-native-reanimated";
import { Ionicons, Entypo } from "@expo/vector-icons";

const texts = ["Connected...", "Secure payment...", "Purchased"];

const StatusContent = () => {
  const buttonScale = useSharedValue(1);
  const iconOpacity = useSharedValue(0);

  const wave1Scale = useSharedValue(0);
  const wave1Opacity = useSharedValue(1);
  const wave2Scale = useSharedValue(0);
  const wave2Opacity = useSharedValue(1);

  const waveBackground = useSharedValue("#f1f1f1");

  const [icon, setIcon] = useState<any>("md-wifi");

  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    setTimeout(() => {
      let index = 0;

      iconOpacity.value = withSequence(
        withTiming(1),
        withDelay(2400, withTiming(0)),
        withTiming(1),
        withDelay(2400, withTiming(0)),
        withTiming(1),
        withDelay(2400, withTiming(0)),
        withTiming(1)
      );

      wave1Scale.value = withRepeat(
        withTiming(1, { duration: 2500, easing: Easing.linear }),
        -1,
        false
      );

      wave2Scale.value = withDelay(
        800,
        withRepeat(
          withTiming(1, { duration: 2500, easing: Easing.linear }),
          -1,
          false
        )
      );

      waveBackground.value = withDelay(
        8000,
        withTiming("rgba(241, 241, 241, 0.4)")
      );

      const interval = setInterval(() => {
        if (index < texts.length - 1) {
          index = index + 1;

          setTimeout(
            () => listRef.current?.scrollToIndex({ index, animated: true }),
            index === 2 ? 3000 : 0
          );

          if (index === 1) {
            setIcon("link-sharp");
            setTimeout(() => setIcon("shield-checkmark-outline"), 2900);
          }

          if (index === 2) {
            setTimeout(() => setIcon("check"), 2900);
          }
        } else {
          clearInterval(interval);
        }
      }, 3000);
    }, 300);
  }, []);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    opacity: iconOpacity.value,
  }));

  const wave1AnimatedStyle = useAnimatedStyle(() => {
    wave1Opacity.value = interpolate(
      wave1Scale.value,
      [0, 0.8, 1],
      [1, 1, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale: wave1Scale.value }],
      opacity: wave1Opacity.value,
      backgroundColor: waveBackground.value,
    };
  });

  const wave2AnimatedStyle = useAnimatedStyle(() => {
    wave2Opacity.value = interpolate(
      wave2Scale.value,
      [0, 0.8, 1],
      [1, 1, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale: wave2Scale.value }],
      opacity: wave2Opacity.value,
      backgroundColor: waveBackground.value,
    };
  });

  return (
    <Animated.View
      exiting={FadeOut.duration(600)}
      style={buttonAnimatedStyle}
      className="w-full h-[330px] items-center justify-center absolute bottom-10 z-[999]"
    >
      <Animated.View
        entering={FadeInDown.duration(600).delay(300)}
        className="h-[20px] w-full items-center absolute top-[60px] z-[9999]"
      >
        <FlatList
          ref={listRef}
          data={texts}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <Text className="text-[19px] text-['#c3c3c3] font-bold text-center">
              {item}
            </Text>
          )}
        />
      </Animated.View>
      <Animated.View
        entering={ZoomIn.duration(600).delay(300)}
        className="h-[100px] w-[100px] rounded-[80px] bg-['#f1f1f1] items-center justify-center z-[999]"
        style={{
          shadowOffset: { width: 0, height: 0 },
          shadowColor: "#ffffff",
          shadowOpacity: 0.15,
          shadowRadius: 8,
        }}
      >
        <View
          className="h-[80px] w-[80px] rounded-[40px] bg-white items-center justify-center"
          style={{
            shadowOffset: { width: 4, height: 15 },
            shadowColor: "#ffffff",
            shadowOpacity: 0.15,
            shadowRadius: 8,
          }}
        >
          <Animated.View style={iconAnimatedStyle}>
            {icon === "check" ? (
              <Entypo name="check" size={50} color="black" />
            ) : (
              <Ionicons name={icon} size={45} color="#d3d3d3" />
            )}
          </Animated.View>
        </View>
      </Animated.View>
      <Animated.View
        style={[
          {
            shadowOffset: { width: 0, height: 0 },
            shadowColor: "white",
            shadowOpacity: 1,
            shadowRadius: 20,
          },
          wave1AnimatedStyle,
        ]}
        className="h-[350px] w-[350px] rounded-[200px] absolute z-[10]"
      />
      <Animated.View
        style={[
          {
            shadowOffset: { width: 0, height: 0 },
            shadowColor: "white",
            shadowOpacity: 1,
            shadowRadius: 20,
          },
          wave2AnimatedStyle,
        ]}
        className="h-[350px] w-[350px] rounded-[200px] absolute z-[10]"
      />
    </Animated.View>
  );
};

{
  /*
  height: 350px;
  width: 350px;
  border-radius: 200px;
  box-shadow: 0px 0px 20px white;
  position: absolute;
  z-index: 10;
*/
}

export default StatusContent;
