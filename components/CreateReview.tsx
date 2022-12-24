import { Formik } from "formik";
import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  TextArea,
  View,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { boolean, object, string } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { usePostReviewMutation } from "../generated/graphql";
import { RootState } from "../store/store";

interface Props {
  releaseId: number;
}

export const CreateReview: React.FC<Props> = ({ releaseId }) => {
  const currentUser = useSelector((state: RootState) => state.user.value);
  const [postResult, postReview] = usePostReviewMutation();

  const initialValues = {
    title: "",
    description: "",
    rating: 0,
  };

  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };

  const reviewSchema = object({
    description: string()
      .min(10, "Review must be atleast 10 character")
      .max(1500, "Review cannot be over 1500 characters long."),
  });

  return (
    <View>
      <Button
        onPress={() => handleClick()}
        bgColor="blue.400"
        className="w-32 m-5"
      >
        Review
      </Button>
      {open ? (
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            postReview({
              ...values,
              releaseId: releaseId,
              posterId: currentUser?.id as number,
            }).then((result) => {
              if (result.error) {
                console.debug(result.error.message);
              } else if (result.data) {
                handleClick();
              }
            });
          }}
          validationSchema={toFormikValidationSchema(reviewSchema)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <Center
              w="90%"
              marginX={"auto"}
              marginBottom={10}
              className="h-[50vh]  bg-slate-700"
            >
              <Box safeArea p="2" w="90%" maxW="320">
                <VStack space={3}>
                  <FormControl>
                    <FormControl.Label _text={{ color: "coolGray.100" }}>
                      Title (optional)
                    </FormControl.Label>
                    <Input
                      selectionColor={"white"}
                      className="text-white"
                      backgroundColor="#475569"
                      borderColor="#475569"
                      focusOutlineColor="#475569"
                      onChangeText={handleChange("title")}
                      onBlur={handleBlur("title")}
                      value={values.title}
                    />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label _text={{ color: "coolGray.100" }}>
                      Review{" "}
                    </FormControl.Label>

                    <TextArea
                      h="70%"
                      color={"white"}
                      autoCompleteType="auto-complete"
                      backgroundColor="#475569"
                      borderColor="#475569"
                      focusOutlineColor="#475569"
                      onChangeText={handleChange("description")}
                      onBlur={handleBlur("description")}
                      value={values.description}
                    />
                  </FormControl>
                </VStack>
                <View className="flex justify-between -mt-8 flex-row">
                  <Button onPress={() => handleClick()} bgColor="blue.400">
                    Cancel
                  </Button>
                  <Button onPress={() => handleSubmit()} bgColor="blue.400">
                    Post Review
                  </Button>
                </View>
              </Box>
            </Center>
          )}
        </Formik>
      ) : null}
    </View>
  );
};
