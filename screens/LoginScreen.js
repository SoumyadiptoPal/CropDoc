import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
  Image,
} from "react-native";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import Header from "../components/Header";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [validpassword, setValidPassword] = useState(true);
  const [isValid, setIsValid] = useState(true);

  const validateEmail = () => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const flag = emailRegex.test(email);
    // Test the email against the regular expression
    setValidEmail(flag);
    return flag;
  };
  const handleSubmit = () => {
    if (validEmail == true && password.length > 5) onLogin(email, password);
  };
  const onLogin = async (email, password) => {
    try {
      // await setPersistence(auth, browserLocalPersistence);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Firebase login Successful ", email, password);
          navigation.navigate("HomeScreen");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert("Invalid Credentials", errorMessage, [
            {
              text: "OK",
              onPress: () => {},
              style: "cancel",
            },
            {
              text: "Sign Up",
              onPress: () => navigation.push("SignupScreen"),
            },
          ]);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Header screen="LOGIN" />
      <View style={styles.container}>
        <Image
          source={require("../assets/favicon.png")}
          style={{ width: 100, height: 100 }}
        />
        <View style={styles.wrapper}>
          <View style={[styles.inputField]}>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#444"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoFocus={true}
              onChangeText={(text) => {
                setEmail(text);
              }}
              onBlur={() => {
                validateEmail();
              }}
              value={email}
            />
          </View>
          <View style={[styles.inputField]}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#444"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              textContentType="password"
              onChangeText={(text) => {
                setPassword(text);
              }}
              // onBlur={handleBlur('password')}
              value={password}
            />
          </View>
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
          <View style={styles.signupContainer}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignupScreen")}
            >
              <Text style={{ color: "#6BB0F5" }}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "rgb(236,236,236)",
  },
  inputField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#FAFAFA",
    marginBottom: 10,
    borderWidth: 1,
  },
  wrapper: {
    width: "100%",
    marginTop: 50,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
  button: {
    backgroundColor: "#43C89C",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 4,
    width: "100%",
  },
  buttonText: {
    fontWeight: "800",
    fontSize: 20,
    color: "#fff",
  },
});

export default LoginScreen;
