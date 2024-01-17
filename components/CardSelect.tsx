import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Animated, {
  FlipInXDown,
  FlipOutXDown,
  ZoomIn,
  ZoomOut,
  interpolate,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { Entypo } from "@expo/vector-icons";
import { cards } from "../utils";
import Card from "./Card";

const CardSelect = () => {
  const prevCardRotationX = useSharedValue(60);
  const prevCardMarginBottom = useSharedValue(0);

  const currentCardMarginBottom = useSharedValue(-40);
  const currCardRotationX = useSharedValue(60);

  const nextCardMarginBottom = useSharedValue(-140);
  const nextCardRotationX = useSharedValue(60);
  const nextCardShadowOpacity = useSharedValue(0);

  const currentCard = useSharedValue(0);

  const toDown = useSharedValue(false);
  const isScrolling = useSharedValue(false);

  const cardHeight = 170;

  const scrollHandler = useAnimatedScrollHandler({
    onBeginDrag: () => (isScrolling.value = true),
    onEndDrag: () => (isScrolling.value = false),
    onScroll: (event, context: any) => {
      const newIndex = Math.floor(
        event.contentOffset.y / cardHeight
      );

      currentCard.value = newIndex;
      toDown.value =
        context.lastValue < event.contentOffset.y;

      const value = Math.abs(
        event.contentOffset.y - cardHeight * newIndex
      );

      currCardRotationX.value = interpolate(
        value,
        [0, 170],
        [0, 60]
      );
      nextCardRotationX.value = interpolate(
        value,
        [0, 170],
        [60, 0]
      );
      prevCardRotationX.value = interpolate(
        value,
        [0, 170],
        [60, toDown.value ? 60 : 0]
      );

      currentCardMarginBottom.value = interpolate(
        value,
        [0, 170],
        [-40, 0]
      );
      nextCardMarginBottom.value = interpolate(
        value,
        [0, 170],
        [-140, -40]
      );

      nextCardShadowOpacity.value = interpolate(
        value,
        [0, 170],
        [0, 0.25]
      );

      context.lastValue = event.contentOffset.y;
    },
  });
  return (
    <>
      <Animated.View
        className="absolute top-[45%] right-6 z-[9999]"
        entering={ZoomIn.delay(100).duration(1000)}
        exiting={ZoomOut.duration(600)}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          className="h-[40px] w-[40px] rounded-[20px] items-center justify-center bg-white"
          style={{
            shadowOffset: { width: 0, height: 8 },
            shadowRadius: 10,
            shadowOpacity: 0.15,
            shadowColor: "black",
          }}
        >
          <Entypo name="plus" size={26} color="#ddd" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        className="w-full h-[63%] items-center absolute bottom-0 bg-white z-[999]"
        style={{
          shadowOffset: { width: 0, height: 20 },
          shadowRadius: 20,
          shadowOpacity: 0.3,
          shadowColor: "black",
        }}
        entering={FlipInXDown.duration(600)}
        exiting={FlipOutXDown.duration(600)}
      >
        <Text className="text-black ml-7 mr-7 opacity-30 font-bold">
          SELECT PAYMENT METHO
        </Text>
        <Animated.ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          disableIntervalMomentum
          scrollEventThrottle={16}
          decelerationRate={0}
          onScroll={scrollHandler}
          snapToInterval={cardHeight}
          contentContainerStyle={{ paddingBottom: 1000 }}
        >
          {cards.map((card, index) => (
            <Card
              key={card.id}
              index={index}
              card={card}
              currentCard={currentCard}
              toDown={toDown}
              isScrolling={isScrolling}
              currCardRotationX={currCardRotationX}
              prevCardRotationX={prevCardRotationX}
              nextCardRotationX={nextCardRotationX}
              currentCardMarginBottom={
                currentCardMarginBottom
              }
              nextCardMarginBottom={nextCardMarginBottom}
              prevCardMarginBottom={prevCardMarginBottom}
              nextCardShadowOpacity={nextCardShadowOpacity}
            />
          ))}
        </Animated.ScrollView>
      </Animated.View>
    </>
  );
};

{
  /*
color: black;
  margin: 28px 0;
  opacity: 0.3;
  font-weight: 600;
*/
}

export default CardSelect;
