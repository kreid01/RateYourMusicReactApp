import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { Formik } from "formik";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Icon,
  Input,
  Pressable,
  VStack,
  Text,
  View,
  WarningOutlineIcon,
} from "native-base";
import React, { useState } from "react";
import { object, string } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRegisterMutation } from "../generated/graphql";

const createUser = async (queryKey: User) => {
  const { data: response } = await axios.post(
    "http://ec2-44-203-24-124.compute-1.amazonaws.com/users/register",
    queryKey
  );
  return response.data;
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export const RegisterScreen = ({ navigation }: any) => {
  const [show, setShow] = useState<Boolean>(false);

  const [, register] = useRegisterMutation();

  const registerSchema = object({
    username: string()
      .min(1, "Username is required")
      .max(32, "Username must be less than 100 characters"),
    email: string().min(1, "Email is required").email("Email is invalid"),
    password: string()
      .min(1, "Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    passwordConfirm: string().min(1, "Please confirm your password"),
  }).refine((data: any) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
      }}
      onSubmit={(values) =>
        register({ ...values }).then(async ({ data }: any) => {
          if (data.error) {
            alert("Network error");
          } else {
            navigation.navigate("Home");
          }
        })
      }
      validationSchema={toFormikValidationSchema(registerSchema)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <Center w="100%" className="h-[100vh] -pt-10 bg-slate-800">
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading
              size="lg"
              fontWeight="600"
              color="coolGray.100"
              _dark={{
                color: "warmGray.50",
              }}
            >
              Welcome
            </Heading>

            <Heading
              mt="1"
              _dark={{
                color: "warmGray.200",
              }}
              color="coolGray.100"
              fontWeight="medium"
              size="xs"
            >
              Sign up to continue!
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Username</FormControl.Label>
                <Input
                  accessibilityLabel="register-username"
                  className="text-white"
                  backgroundColor="#475569"
                  borderColor="#475569"
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />{" "}
                {errors.username ? (
                  <View className="flex flex-row -mb-2 -mt-3 ">
                    <WarningOutlineIcon size="xs" color="red.500" />
                    <Text className="text-red-500 ml-1 -mt-1 text-sm">
                      {errors.username.toString()}
                    </Text>
                  </View>
                ) : null}
              </FormControl>

              <FormControl variant="outlined">
                <FormControl.Label>Email Adress</FormControl.Label>
                <Input
                  accessibilityLabel="register-email"
                  className="text-white"
                  backgroundColor="#475569"
                  borderColor="#475569"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("Email")}
                  value={values.email}
                />
                {errors.email ? (
                  <View className="flex flex-row mt-2">
                    <WarningOutlineIcon size="xs" color="red.500" />
                    <Text className="text-red-500 ml-1 -mt-1 text-sm">
                      {errors.email.toString()}
                    </Text>
                  </View>
                ) : null}
              </FormControl>
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  accessibilityLabel="register-password"
                  className="text-white"
                  backgroundColor="#475569"
                  borderColor="#475569"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  type={show ? "text" : "password"}
                  InputRightElement={
                    <Pressable onPress={() => setShow(!show)}>
                      <Icon
                        as={
                          <MaterialIcons
                            name={show ? "visibility" : "visibility-off"}
                          />
                        }
                        size={5}
                        mr="2"
                        color="muted.400"
                      />
                    </Pressable>
                  }
                />
                {errors.password ? (
                  <View className="flex flex-row mt-2">
                    <WarningOutlineIcon size="xs" color="red.500" />
                    <Text className="text-red-500 ml-1 -mt-1 text-sm">
                      {errors.password.toString()}
                    </Text>
                  </View>
                ) : null}
              </FormControl>

              <FormControl variant="outlined">
                <FormControl.Label>Confirm Password</FormControl.Label>
                <Input
                  className="text-white"
                  accessibilityLabel="register-password-confirm"
                  backgroundColor="#475569"
                  borderColor="#475569"
                  onChangeText={handleChange("passwordConfirm")}
                  onBlur={handleBlur("passwordConfirm")}
                  value={values.passwordConfirm}
                  type={show ? "text" : "password"}
                  InputRightElement={
                    <Pressable onPress={() => setShow(!show)}>
                      <Icon
                        as={
                          <MaterialIcons
                            name={show ? "visibility" : "visibility-off"}
                          />
                        }
                        size={5}
                        mr="2"
                        color="muted.400"
                      />
                    </Pressable>
                  }
                />
                {errors.passwordConfirm ? (
                  <View className="flex flex-row mt-2">
                    <WarningOutlineIcon size="xs" color="red.500" />
                    <Text className="text-red-500 ml-1 -mt-1 text-sm">
                      {errors.passwordConfirm.toString()}
                    </Text>
                  </View>
                ) : null}
              </FormControl>
              <Button
                mt={5}
                onPress={() => handleSubmit()}
                isLoadingText="Submitting"
                accessibilityLabel="register-button"
                bgColor="#38bdf8"
              >
                Register
              </Button>

              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  Already have an account?{" "}
                </Text>
                <Button
                  variant="ghost"
                  mt="-10px"
                  _text={{
                    color: "#38bdf8",
                    fontWeight: "medium",
                    fontSize: "sm",
                  }}
                  onPress={() => navigation.navigate("Login")}
                >
                  Sign in
                </Button>
              </HStack>
            </VStack>
          </Box>
        </Center>
      )}
    </Formik>
  );
};
