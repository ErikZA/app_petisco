import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: "#f0f0f5",
  },

  main: {
    flex: 1,
    justifyContent: "center",
  },

  logo: {
    marginTop: 30,
    flexDirection: "row",
    backgroundColor: "#f0f0f5",
  },

  title: {
    color: "#323153",
    fontSize: 32,
    fontFamily: "Ubuntu_700Bold",
    maxWidth: 260,
  },

  description: {
    color: "#6c6c80",
    fontSize: 16,
    marginTop: 16,
    fontFamily: "Roboto_400Regular",
    maxWidth: 260,
    lineHeight: 24,
  },

  viewContainer: {
    color: "#6c6c80",
    fontSize: 16,
    fontFamily: "Roboto_400Regular",
    marginTop: 16,
  },

  button: {
    backgroundColor: "#34cb79",
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
  },

  footer: {
    marginTop: 40,
    backgroundColor: "#f0f0f5",
  },

  select: {},

  img: {
    maxWidth: 90,
    maxHeight: 90,
  },

  app: {
    marginTop: 30,
    color: "#323153",
    fontSize: 25,
    fontFamily: "Ubuntu_700Bold",
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: "#fff",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: "#fff",
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "#ffcc00",
    borderRadius: 4,
    color: "#323153",
    paddingRight: 30,
    marginBottom: 16,
  },
  inputAndroid: {
    backgroundColor: "#fff",
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: "#ffcc00",
    borderRadius: 8,
    color: "#323153",
    paddingRight: 30,
    marginBottom: 16,
  },
});

export { styles, pickerSelectStyles };
