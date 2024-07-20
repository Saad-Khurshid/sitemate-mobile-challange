import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import Colors from "@/constants/Colors";

const Loader = () => {
  const theme = useTheme();
  const colorScheme = theme.dark ? "dark" : "light";

  const color = colorScheme === "dark" ? Colors.dark.text : Colors.light.text;

  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "20%",
      }}
    >
      <ActivityIndicator size="large" color={color} />
    </View>
  );
};

export default Loader;
