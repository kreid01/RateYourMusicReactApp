import { Formik } from "formik";
import {
  Box,
  Button,
  FormControl,
  Input,
  TextArea,
  View,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { object, string } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { usePostReviewMutation } from "../../generated/graphql";
import { RootState } from "../../store/store";
import Icon, { Icons } from "../Icons/Icons";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";

interface Props {
  releaseId: number;
  scrollRef: any;
  refresh: () => void;
}

export const CreateReview: React.FC<Props> = ({
  releaseId,
  scrollRef,
  refresh,
}) => {
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
    if (!open) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          y: 950,
          animated: true,
        });
      }, 100);
    }
  };

  const reviewSchema = object({
    description: string()
      .min(10, "Review must be atleast 10 character")
      .max(1500, "Review cannot be over 1500 characters long."),
  });

  const starsArr = new Array(5).fill(null);

  const [selected, setSelected] = useState(-1);

  const handleRate = (i: number) => {
    if (selected === i) {
      setSelected(-1);
    } else {
      setSelected(i);
    }
  };

  const ratingStars = starsArr.map((star, i) => {
    return (
      <TouchableOpacity onPress={() => handleRate(i)}>
        <Icon
          type={i <= selected ? Icons.FontAwesome : Icons.Feather}
          name="star"
          color="yellow"
        />
      </TouchableOpacity>
    );
  });

  return (
    <View>
      <Button
        testID="open-review"
        onPress={() => handleClick()}
        bgColor="blue.400"
        data-cy="open-review"
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
              rating: selected + 1,
            }).then((result) => {
              if (result.error) {
                console.debug(result.error.message);
              } else if (result.data) {
                refresh();
                handleClick();
              }
            });
          }}
          validationSchema={toFormikValidationSchema(reviewSchema)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <Animated.View
              entering={FadeInUp}
              exiting={FadeOutUp.duration(150)}
              className="h-[60vh] w-[90%] mx-auto mb-10  bg-slate-700"
            >
              <Box safeArea p="2" w="90%" maxW="320" marginX={"auto"}>
                <VStack space={3}>
                  <FormControl>
                    <FormControl.Label _text={{ color: "coolGray.100" }}>
                      Title (optional)
                    </FormControl.Label>
                    <Input
                      accessibilityLabel="review-title"
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
                  <View className="flex flex-row justify-around">
                    {ratingStars}
                  </View>
                  <FormControl>
                    <FormControl.Label _text={{ color: "coolGray.100" }}>
                      Review{" "}
                    </FormControl.Label>

                    <TextArea
                      h="70%"
                      color={"white"}
                      accessibilityLabel="review-description"
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
                <View className="flex justify-between -mt-10 flex-row">
                  <Button onPress={() => handleClick()} bgColor="blue.400">
                    Cancel
                  </Button>
                  <Button
                    testID="submit-button"
                    accessibilityLabel="submit-review-button"
                    onPress={() => handleSubmit()}
                    bgColor="blue.400"
                  >
                    Submit Review
                  </Button>
                </View>
              </Box>
            </Animated.View>
          )}
        </Formik>
      ) : null}
    </View>
  );
};
