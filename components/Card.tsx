import { View, Text, ImageSourcePropType, Image } from "react-native";
import React from "react";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  currentCard: SharedValue<number>;
  toDown: SharedValue<boolean>;
  isScrolling: SharedValue<boolean>;
  currCardRotationX: SharedValue<number>;
  prevCardRotationX: SharedValue<number>;
  nextCardRotationX: SharedValue<number>;
  currentCardMarginBottom: SharedValue<number>;
  nextCardMarginBottom: SharedValue<number>;
  prevCardMarginBottom: SharedValue<number>;
  nextCardShadowOpacity: SharedValue<number>;
  index: number;
  card: {
    id: number;
    colors: string[];
    number: number;
    topLogo: ImageSourcePropType;
    bottomLogo: ImageSourcePropType;
  };
}

const Card = ({
  index,
  card,
  toDown,
  isScrolling,
  currentCard,
  currCardRotationX,
  prevCardRotationX,
  nextCardRotationX,
  currentCardMarginBottom,
  nextCardMarginBottom,
  prevCardMarginBottom,
  nextCardShadowOpacity,
}: Props) => {
  const cardTop = useSharedValue(400);
  const othersCardsRotationX = useSharedValue(60);

  setTimeout(() => {
    if (index === 0) {
      currCardRotationX.value = withDelay(
        450,
        withTiming(0, { duration: 600 })
      );
      cardTop.value = withDelay(300, withTiming(0, { duration: 600 }));
    } else {
      cardTop.value = withDelay(
        index * 50 + 300,
        withTiming(0, { duration: 600 })
      );
    }
  }, 100);

  const cardAnimatedStyle = useAnimatedStyle(() => {
    if (isScrolling.value) {
      if (toDown.value) {
        othersCardsRotationX.value = withTiming(50, { duration: 150 });
      }
    } else {
      othersCardsRotationX.value = withTiming(60, { duration: index * 100 });
    }
    return {
      transform: [
        { perspective: 500 },
        {
          rotateX: `${
            index === currentCard.value
              ? currCardRotationX.value
              : index === currentCard.value + 1
              ? nextCardRotationX.value
              : index < currentCard.value
              ? prevCardRotationX.value
              : othersCardsRotationX.value
          }deg`,
        },
      ],
      top: cardTop.value,
      marginBottom:
        index === currentCard.value
          ? currentCardMarginBottom.value
          : index === currentCard.value + 1
          ? nextCardMarginBottom.value
          : index < currentCard.value
          ? prevCardMarginBottom.value
          : -140,
      shadowOpacity:
        index <= currentCard.value
          ? 0.25
          : index === currentCard.value + 1
          ? nextCardShadowOpacity.value
          : 0,
      zIndex: index === currentCard.value ? 999 : 0,
    };
  });
  return (
    <Animated.View
      className="w-[71%] h-[170px] self-center mb-5"
      style={[
        {
          shadowOffset: { width: 0, height: 20 },
          shadowRadius: 8,
          shadowOpacity: 0.3,
          shadowColor: "black",
        },
        cardAnimatedStyle,
      ]}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 0 }}
        colors={card.colors}
        className="w-full h-full rounded-[10px] px-[15px] py-[20px] justify-between"
      >
        <Image
          source={card.topLogo}
          resizeMode="contain"
          className="w-[70px] h-[25px]"
        />
        <View className="w-full h-[48px] flex-row items-center justify-between">
          <View>
            <Text className="text-white font-bold text-[13px]">
              {card.number}
            </Text>
            <Text className="text-white font-bold text-[11px] mt-2">
              ANDREW MITCHEL
            </Text>
          </View>
          <Image source={card.bottomLogo} resizeMode="contain" className="w-[50px] h-[40px]"></Image>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

{
  /*
height: 40px;
  width: 50px;
*/
}

export default Card;
