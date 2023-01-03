import { MaterialIcons } from "@expo/vector-icons";
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
  Link,
  Pressable,
  Text,
  View,
  VStack,
} from "native-base";
import * as React from "react";
import { useSelector } from "react-redux";
import { useLoginMutation } from "../generated/graphql";
import { RootState } from "../store/store";
import { setAccessToken } from "../utils/accessToken";
import { setRefreshToken } from "../utils/refreshToken";
import { UserScreen } from "./UserScreen";

export type Login = {
  email: string;
  password: string;
};

export const LoginScreen = ({ navigation }: any) => {
  const [show, setShow] = React.useState<Boolean>(false);
  const currentUser = useSelector((state: RootState) => state.user.value);
  const [, login] = useLoginMutation();

  return currentUser === null || currentUser === undefined ? (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values) =>
        login({ ...values }).then(async ({ data }: any) => {
          if (data.login.accessToken.length > 1) {
            const { refreshToken, accessToken } = data.login;
            await setRefreshToken(refreshToken);
            setAccessToken(accessToken);
            navigation.navigate("Home");
          } else {
            alert("Login failed");
          }
        })
      }
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <Center w="100%" className="h-[100vh] -mp-10 bg-slate-800">
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
                color: "coolGray.100",
              }}
              color="coolGray.300"
              fontWeight="medium"
              size="xs"
            >
              Sign in to continue!
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  accessibilityLabel="login-email"
                  className="text-white"
                  backgroundColor="#475569"
                  borderColor="#475569"
                  focusOutlineColor="#475569"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label color="coolGray.100">
                  Password
                </FormControl.Label>
                <Input
                  className="text-white"
                  backgroundColor="#475569"
                  accessibilityLabel="login-password"
                  borderColor="#475569"
                  focusOutlineColor="#475569"
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
                <Link
                  _text={{
                    fontSize: "xs",
                    fontWeight: "500",
                    color: "#38bdf8",
                  }}
                  alignSelf="flex-end"
                  mt="1"
                >
                  Forget Password?
                </Link>
              </FormControl>
              <Button
                accessibilityLabel="login-button"
                onPress={() => handleSubmit()}
                mt="2"
                bgColor="#38bdf8"
              >
                Sign in
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  I'm a new user.{" "}
                </Text>
                <Button
                  variant="ghost"
                  mt="-10px"
                  _text={{
                    color: "#38bdf8",
                    fontWeight: "medium",
                    fontSize: "sm",
                  }}
                  onPress={() => navigation.navigate("Registration")}
                >
                  Sign up
                </Button>
              </HStack>
            </VStack>
          </Box>
        </Center>
      )}
    </Formik>
  ) : (
    <UserScreen />
  );
};
