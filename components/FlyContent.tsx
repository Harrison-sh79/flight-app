import React, { useEffect } from "react";
import {
  StatusBar,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import Animated, {
  FlipInXDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Entypo } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

const FlyContent = () => {
  const headertranslateY = useSharedValue(-320);
  const headerContentTranslateY = useSharedValue(320);
  const headerContentopacity = useSharedValue(0);

  const headerAnimatedStyled = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: headertranslateY.value,
      },
    ],
  }));

  const headerContentAnimatedStyled = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY: headerContentTranslateY.value,
        },
      ],
    })
  );

  useEffect(() => {
    headertranslateY.value = withTiming(0, {
      duration: 700,
    });
    headerContentTranslateY.value = withTiming(0, {
      duration: 900,
    });
    headerContentopacity.value = withTiming(1, {
      duration: 700,
    });
  }, []);

  return (
    <View className="flex-1 w-full items-center absolute top-0">
      <StatusBar barStyle="light-content" />
      <Animated.View
        style={headerAnimatedStyled}
        className="w-full h-[320px] items-center bg-['#0438ae']"
      >
        <Animated.Text className="text-white text-[16px] mt-[50px] opacity-50">
          Swipe down to see options
        </Animated.Text>
      </Animated.View>
      <Animated.View
        style={headerContentAnimatedStyled}
        className="w-[85%] h-[200px] rounded-[20px] mt-[-220px] items-center 
        pt-[10px] hidden bg-white bg-opacity-10"
      >
        <Image
          source={require("../assets/images/logo.png")}
          resizeMode="contain"
          className="h-[33px] w-[100px] mb-[10px]"
        />
        <Text className="text-white text-[16px] font-bold opacity-100">
          Your order has submited
        </Text>
        <Text className="text-white text-[16px] font-semibold opacity-70">
          We are waiting for booking confirmation
        </Text>
      </Animated.View>
      <Animated.View
        entering={FlipInXDown.duration(900).delay(100)}
        className="w-['85%] hidden rounded-tl-[20px] rounded-tr-[20px] mt-[-85px]"
      >
        <BlurView
          intensity={70}
          className="w-full h-full p-5"
        >
          <View className="w-full flex-row justify-between">
            <View className="items-end">
              <Text className="text-white mt-0 font-semibold opacity-80">
                Los Angeles
              </Text>
              <Text className="text-white text-[35px]">
                LAS
              </Text>
              <Text className="text-white mt-0 font-semibold opacity-80">
                24 Apr, 16:30
              </Text>
            </View>
            <View className="items-center justify-end pb-2">
              <Entypo
                name="chevron-right"
                size={30}
                color="white"
              />
              <Text className="text-white mt-[10px] font-bold opacity-80">
                4h 15m
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-white mt-0 font-semibold opacity-80">
                New York
              </Text>
              <Text className="text-white text-[35px]">
                NYC
              </Text>
              <Text className="text-white mt-0 font-semibold opacity-80">
                20:45
              </Text>
            </View>
          </View>
          <View className="w-full h-[80px] flex-row items-center mt-[150px]">
            <View className="flex-1 h-full justify-start pt-[15px]">
              <Text className="text-gray-600 mb-[3px]">
                Flight
              </Text>
              <Text className="text-black">AR 580</Text>
            </View>
            <View className="flex-1 h-full justify-start pt-[15px]">
              <Text className="text-gray-600 mb-[3px]">
                Class
              </Text>
              <Text className="text-black">Premium</Text>
            </View>
            <View className="flex-1 h-full justify-start pt-[15px]">
              <Text className="text-gray-600 mb-[3px]">
                Possibilty
              </Text>
              <Text className="text-black">AR 580</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            className="flex-row items-center w-full mt-[20px]"
          >
            <View className="flex-1">
              <Text className="text-black">
                Jessie J.{"\n"}
                <Text className="text-gray-600 mb-[3px]">
                  jessy@gmail.com
                </Text>
              </Text>
            </View>
            <Image
              source={require("../assets/images/profile.jpeg")}
              className="h-[50px] w-[50px] rounded-[25px]"
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            className="flex-row items-center w-full mt-[20px]"
          >
            <View className="flex-1">
              <Text className="text-black">
                Jessie J.{"\n"}
                <Text className="text-gray-600 mb-[3px]">
                  jessy@gmail.com
                </Text>
              </Text>
            </View>
            <Image
              source={require("../assets/images/profile.jpeg")}
              className="h-[50px] w-[50px] rounded-[25px]"
            />
          </TouchableOpacity>
          <Text className="text-gray-600 w-full text-left mt-[40px]">
            Total price
          </Text>
          <Text className="text-gray-600 w-full text-left text-[18px] font-bold mt-[5px]">
            $ 1,536.00
          </Text>
        </BlurView>
      </Animated.View>
    </View>
  );
};

{
  /*
c color: gray;
  width: 100%;
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;

*/
}

export default FlyContent;
