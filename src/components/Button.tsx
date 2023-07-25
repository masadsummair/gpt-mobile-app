import { Pressable, Text, StyleSheet } from "react-native";
import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { normalize } from "../styles/Style";
import Theme from "../styles/Theme";
import GoogleIcon from "./googleIcon";

const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

function CustomButton({ text, GoogleIconLeft,fontSize=18,accessoryLeft, width = "80%", color = Theme.color.white, backgroundColor = Theme.color.darkSecondary, accessoryRight, onPress }) {
  //animation
  const down = useSharedValue(0);
  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      top: down.value,
    };
  });
  const pressableOnPress = () => {
    down.value = 1;
  };
  const pressableOnPressOut = () => {
    down.value = 0;
  };
  //animation

  return (
    <ReanimatedPressable
      onPressIn={pressableOnPress}
      onPressOut={pressableOnPressOut}
      onPress={onPress}
      style={[
        { backgroundColor, width },
        Style.containerWithBackground,
        buttonAnimationStyle
      ]}
    >
      {GoogleIconLeft?<GoogleIcon />:null}
      <Text style={[Style.textWithBackground, { color,fontSize: normalize(fontSize), }]}>
        {text}
      </Text>
      {accessoryRight?accessoryRight:null}
    </ReanimatedPressable>
  );
}

const Style = StyleSheet.create({
  containerWithBackground: {
    paddingVertical: normalize(10),
    borderRadius: 10,
    shadowColor: Theme.color.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    justifyContent: "center",
    flexDirection: "row",
    gap: 5
  },
  textWithBackground: {
    fontFamily: "Nunito-Bold",
    bottom: 1
  },
});

export default CustomButton;