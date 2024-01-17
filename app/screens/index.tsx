import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, {
  FadeOut,
  FlipOutXUp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import Cloud from "../../components/Cloud";
import Button from "../../components/Button";
import CardSelect from "../../components/CardSelect";
import StatusContent from "../../components/StatusContent";
import FlyContent from "../../components/FlyContent";

const Main = () => {
  const backgroundColor = useSharedValue("white");

  const [confirm, setConfirm] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showFlyInfo, setShowFlyInfo] = useState(false);
  const [showCardSelect, setShowCardSelect] =
    useState(false);

  const airplaneRotateZ = useSharedValue(0);
  const airplaneShadowX = useSharedValue(0);
  const airplaneShadowY = useSharedValue(0);
  const airplaneScale = useSharedValue(1);
  const airplaneTranlateY = useSharedValue(0);

  useEffect(() => {
    if (confirm) {
      backgroundColor.value = withTiming("#EDEDED", {
        duration: 600,
      });
      setTimeout(() => {
        airplaneRotateZ.value = withSequence(
          withTiming(-10, { duration: 4000 }),
          withTiming(-10, { duration: 2000 }),
          withTiming(0, { duration: 2000 })
        );

        airplaneShadowY.value = withTiming(200, {
          duration: 8000,
        });
      }, 6000);
      setTimeout(() => {
        setShowStatus(false);
        backgroundColor.value = withTiming("white", {
          duration: 800,
        });
        setTimeout(() => setShowFlyInfo(true), 600);
      }, 14000);
    } else {
      airplaneRotateZ.value = withTiming(0, {duration: 2000});
      airplaneShadowX.value = withTiming(0, {duration: 2000});
      airplaneShadowY.value = withTiming(0, {duration: 2000});
      airplaneScale.value = withTiming(1, {duration: 2000});
      airplaneTranlateY.value = withTiming(0, {duration: 2000});
    }
  }, [confirm]);

  const backgroundAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }));

  const airplaneAnimatedStyle = useAnimatedStyle(() => {
    airplaneShadowX.value = interpolate(
      airplaneShadowY.value,
      [0, 200],
      [0, -450]
    );
    airplaneScale.value = interpolate(
      airplaneShadowY.value,
      [0, 200],
      [1, 0.8]
    );
    airplaneTranlateY.value = interpolate(
      airplaneShadowY.value,
      [0, 200],
      [0, 60]
    );

    return {
      transform: [
        { rotateZ: airplaneRotateZ.value + "deg" },
        { scale: airplaneScale.value },
        { translateY: airplaneTranlateY.value },
      ],
      shadowOffset: {
        height: airplaneShadowY.value,
        width: airplaneShadowX.value,
      },
    };
  });

  const handleConfirm = () => {
    if (showCardSelect) {
      setShowCardSelect(false);
      setConfirm(true);
      setShowStatus(true);
    } else {
      setShowCardSelect(true);
    }
    console.log(
      "🚀 ~ file: index.tsx:116 ~ handleConfirm ~ showFlyInfo:",
      showFlyInfo
    );
    if (showFlyInfo) {
      setShowCardSelect(false);
      setConfirm(false);
      setShowStatus(false);
      setShowFlyInfo(false);
    }
  };

  return (
    <>
      <Animated.View
        className="w-full h-full absolute"
        style={backgroundAnimatedStyle}
      />
      <SafeAreaView className="flex-1 items-center">
        <StatusBar barStyle={"dark-content"} />
        {!confirm && (
          <Animated.View
            className="w-full overflow-hidden rounded-tl-2xl rounded-tr-2xl h-[41%]"
            exiting={FlipOutXUp.duration(600)}
          >
            <LinearGradient
              colors={["#0438AE", "#0438AE", "#859DDF"]}
              start={{ x: 0.5, y: -0.6 }}
              end={{ x: 0.5, y: 1 }}
            >
              <Image
                source={require("../../assets/images/logo.png")}
                className="h-[30px] w-[160px] ml-10 mt-10"
                resizeMode="contain"
              />
              <View className="w-full h-full flex-row justify-between mt-[37px] px-10">
                <View className="items-start">
                  <Text className="text-white opacity-80">
                    Los Angeles
                  </Text>
                  <Text className="text-white text-4xl">
                    LAS
                  </Text>
                  <Text className="text-white opacity-80">
                    24 Apr, 16:30
                  </Text>
                </View>
                <View className="items-center pt-2">
                  <Entypo
                    name="chevron-right"
                    size={30}
                    color="white"
                  />
                  <Text className="text-white opacity-80 font-bold">
                    4h 15m
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-white opacity-80">
                    New York
                  </Text>
                  <Text className="text-white text-4xl">
                    NYC
                  </Text>
                  <Text className="text-white opacity-80">
                    20:45
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>
        )}
        <Animated.Image
          source={require("../../assets/images/airplane.png")}
          className="h-[200px] w-[360px] absolute self-center top-[27%] z-[999] overflow-visible"
          style={[
            {
              shadowOffset: { height: 0, width: 0 },
              shadowRadius: 2,
              shadowOpacity: 0.1,
              shadowColor: "black",
            },
            airplaneAnimatedStyle,
          ]}
          resizeMode={"contain"}
        />
        <Cloud
          confirmed={confirm}
          bottom={200}
          delay={2000}
        />
        <Cloud
          confirmed={confirm}
          bottom={-100}
          delay={4000}
        />
        <Cloud
          confirmed={confirm}
          size="lg"
          bottom={-600}
          zIndex={9999}
        />
        <Cloud
          confirmed={confirm}
          noShadow
          size="lg"
          bottom={-500}
          delay={4000}
          zIndex={888}
        />
        {!confirm && (
          <Animated.View
            className="w-full h-[80px] flex-row bg-white items-center mb-[30px]"
            style={{
              shadowOffset: { width: 0, height: 4 },
              shadowRadius: 20,
              shadowOpacity: 0.1,
              shadowColor: "black",
            }}
            exiting={FlipOutXUp.duration(600)}
          >
            <View className="flex-1 h-full items-center justify-start pt-[15px]">
              <Text className="text-gray-500 mb-1 w-3/5">
                Flight
              </Text>
              <Text className="text-black w-3/5">
                AR 580
              </Text>
            </View>
            <View className="flex-1 h-full items-center justify-start pt-[15px]">
              <Text className="text-gray-500 mb-1 w-3/5">
                Class
              </Text>
              <Text className="text-black w-3/5">
                Premium{"\n"}Econim
              </Text>
            </View>
            <View className="flex-1 h-full items-center justify-start pt-[15px]">
              <Text className="text-gray-500 mb-1 w-3/5">
                Aircraft
              </Text>
              <Text className="text-black w-3/5">
                AR 580
              </Text>
            </View>
            <View className="flex-1 h-full items-center justify-start pt-[15px]">
              <Text className="text-gray-500 mb-1 w-3/5">
                Possibilty
              </Text>
              <Text className="text-black w-3/5">
                AR 580
              </Text>
            </View>
          </Animated.View>
        )}
        {!confirm && (
          <Animated.View
            className="flex-1 w-['85%'] items-center"
            exiting={FadeOut.duration(600)}
          >
            <Text className="text-black">
              43h 15m
              <Text className="text-gray-500 mb-1 w-3/5">
                total duration
              </Text>
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex-row items-center w-full mt-[20px]"
            >
              <View className="flex-1">
                <Text className="text-black">
                  Harrison SH.{"\n"}
                  <Text className="text-gray-500 mb-1 w-3/5">
                    harrison@gmail.com
                  </Text>
                </Text>
              </View>
              <Image
                className="h-[50px] w-[50px] rounded-3xl"
                source={require("../../assets/images/profile.jpeg")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex-row items-center w-full mt-[20px]"
            >
              <View className="flex-1">
                <Text className="text-black">
                  Harrison SH.{"\n"}
                  <Text className="text-gray-500 mb-1 w-3/5">
                    harrison@gmail.com
                  </Text>
                </Text>
              </View>
              <Image
                className="h-[50px] w-[50px] rounded-3xl"
                source={require("../../assets/images/nopic.jpeg")}
              />
            </TouchableOpacity>
            <Text className="text-gray-500 w-full self-end mt-[40px]">
              Total you will pay
            </Text>
            <Text className="text-black w-full self-end text-[18px] mt-[5px]">
              $ 1,536.00
            </Text>
          </Animated.View>
        )}
        {(!confirm || showFlyInfo) && (
          <Button
            showFlyInfo={showFlyInfo}
            onPress={handleConfirm}
          />
        )}
        {showCardSelect && <CardSelect />}
        {showStatus && <StatusContent />}
        {showFlyInfo && <FlyContent />}
      </SafeAreaView>
    </>
  );
};

export default Main;
