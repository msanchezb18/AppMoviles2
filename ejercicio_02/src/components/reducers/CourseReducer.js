import { ADD_COURSE, REMOVE_COURSE } from "../actions/CourseActionTypes";

const INITIAL_STATE = {
  availableCourses: [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
  ],
  selectedCourses: [],
};

const CourseReducer = (state = INITIAL_STATE, action) => {
  const { availableCourses, selectedCourses } = state;
  let updatedAvailable, updatedSelected;

  switch (action.type) {
    case ADD_COURSE:
      updatedAvailable = availableCourses.filter(
        (course) => course !== action.payload
      );
      updatedSelected = [...selectedCourses, action.payload];
      return {
        availableCourses: updatedAvailable,
        selectedCourses: updatedSelected,
      };

    case REMOVE_COURSE:
      updatedSelected = selectedCourses.filter(
        (course) => course !== action.payload
      );
      updatedAvailable = [...availableCourses, action.payload];
      return {
        availableCourses: updatedAvailable,
        selectedCourses: updatedSelected,
      };

    default:
      return state;
  }
};

export default CourseReducer;
