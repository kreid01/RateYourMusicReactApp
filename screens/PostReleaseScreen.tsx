import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Formik } from "formik";
import {
  Input,
  Button,
  Radio,
  View,
  Text,
  ScrollView,
  TextArea,
} from "native-base";
import { usePostReleaseMutation } from "../generated/graphql";

export const PostreleaseScreen = () => {
  const queryClient = useQueryClient();

  type PostRelease = {
    born: string;
    name: string;
    recorded: string;
    type: string;
    cover: string;
  };

  type MultiValues = {
    genres: string[];
    singleGenre: string;
    relatedArtists: string[];
    singleArtist: string;
    tracks: string[];
    singleTrack: string;
  };

  const [multiValues, setMultiValues] = useState<MultiValues>({
    genres: [],
    singleGenre: "",
    relatedArtists: [],
    singleArtist: "",
    tracks: [],
    singleTrack: "",
  });

  const removeGenre = (index: number) => {
    const changeArr = [...multiValues.genres];
    changeArr.splice(index, 1);
    setMultiValues((prevState) => ({
      ...prevState,
      ingredients: changeArr,
    }));
  };

  const removeRelatedArtist = (i: number) => {
    const changeArr = [...multiValues.relatedArtists];
    changeArr.splice(i, 1);
    setMultiValues((prevState) => ({
      ...prevState,
      steps: changeArr,
    }));
  };

  const { mutate } = usePostReleaseMutation;

  const initialValues = {
    title: "",
    ingredients: "",
    steps: "",
    isVegetarian: "",
    creatorId: 1,
    imageUrl: "",
  };

  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) =>
          postRelease({
            variables: {
              ...values,
            },
          })
        }
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <ScrollView
            keyboardShouldPersistTaps="always"
            paddingTop="6"
            automaticallyAdjustKeyboardInsets={true}
          >
            <View className="mx-10   overflow-y-scroll">
              <Input
                my={2}
                focusOutlineColor="#9D14FF"
                placeholder="Recipe Title"
                className="h-10"
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                value-={values.title}
              />
              <Input
                focusOutlineColor="#9D14FF"
                my={2}
                placeholder="Ingredients"
                onBlur={handleBlur("ingredients")}
                value={multiValues.singleIngredient}
                onChangeText={(text) =>
                  setMultiValues((prevState) => ({
                    ...prevState,
                    singleIngredient: text,
                  }))
                }
                InputRightElement={
                  <Button bgColor="#9D14FF" onPress={() => addIngredient()}>
                    Add
                  </Button>
                }
              />
              <View>
                {multiValues?.ingredients.map((ingredient, index) => {
                  if (ingredient.length > 3) {
                    return (
                      <View
                        className="flex flex-row justify-between"
                        key={index}
                      >
                        <Text className="text-black font-semibold w-[70%] text-md mx-2 my-2 border-b-[1px] border-gray-200">
                          - {ingredient}
                        </Text>
                        <Button
                          variant="ghost"
                          className="-mt-1"
                          onPress={() => removeIngredient(index)}
                        >
                          Remove
                        </Button>
                      </View>
                    );
                  }
                })}
              </View>
              <TextArea
                autoCompleteType="auto-complete"
                focusOutlineColor="#9D14FF"
                placeholder="Steps"
                onBlur={handleBlur("steps")}
                value={multiValues.singleStep}
                my={2}
                onChangeText={(text) =>
                  setMultiValues((prevState) => ({
                    ...prevState,
                    singleStep: text,
                  }))
                }
                InputRightElement={
                  <Button h={20} bgColor="#9D14FF" onPress={() => addStep()}>
                    Add
                  </Button>
                }
              />
              <View>
                {multiValues?.steps.map((step, i) => {
                  return (
                    <View className="flex flex-row justify-between" key={i}>
                      <Text className="text-black font-semibold text-md mx-2 my-2  max-w-[70%]">
                        {i + 1}. {step}
                      </Text>
                      <Button
                        variant="ghost"
                        className="-mt-1"
                        onPress={() => removeStep(i)}
                      >
                        Remove
                      </Button>
                    </View>
                  );
                })}
              </View>
              <Input
                focusOutlineColor="#9D14FF"
                placeholder="Image URL"
                className="h-10 w-[100vw]"
                my={2}
                onChangeText={handleChange("imageUrl")}
                onBlur={handleBlur("imageUrl")}
                value-={values.imageUrl}
              />
              <Radio.Group
                className=" text-sm"
                name="isVegetarian"
                my={2}
                accessibilityLabel="Is Vegetarian"
                value={values.isVegetarian}
                onChange={handleChange("isVegetarian")}
              >
                <Radio colorScheme="indigo" value={"true"} my={1}>
                  Is Vegetarian
                </Radio>
                <Radio colorScheme="indigo" value={"false"} my={1}>
                  Is Not Vegetarian
                </Radio>
              </Radio.Group>

              <Button
                spinnerPlacement="end"
                bgColor="#9D14FF"
                isLoadingText="Submitting"
                onPress={() => handleSubmit()}
              >
                Create
              </Button>
            </View>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
};
