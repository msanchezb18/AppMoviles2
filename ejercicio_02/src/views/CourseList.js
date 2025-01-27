import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect, useDispatch } from "react-redux";
import { style_01 } from "../styles/style_01";
import {
  addCourseAction,
  removeCourseAction,
} from "../components/actions/CourseActions";

const CourseList = ({ Courses }) => {
  const dispatch = useDispatch();

  const onPressAvailable = (course) => {
    dispatch(addCourseAction(course));
  };

  const onPressSelected = (course) => {
    dispatch(removeCourseAction(course));
  };

  return (
    <View style={style_01.body}>
      <Text>Available Courses:</Text>
      {Courses.availableCourses.map((course, index) => (
        <TouchableOpacity
          key={index}
          style={[style_01.listItem, style_01.list1Item]}
          onPress={() => onPressAvailable(course)}
        >
          <Text>{course}</Text>
        </TouchableOpacity>
      ))}

      <Text>Selected Courses:</Text>
      {Courses.selectedCourses.map((course, index) => (
        <TouchableOpacity
          key={index}
          style={[style_01.listItem, style_01.list2Item]}
          onPress={() => onPressSelected(course)}
        >
          <Text>{course}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const mapStateToProps = ({ Courses }) => {
  return { Courses };
};

export default connect(mapStateToProps)(CourseList);
