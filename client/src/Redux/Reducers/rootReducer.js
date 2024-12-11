import { combineReducers } from "redux";
import { activityReducer } from "./activityReducer";
import adminReducer from "./adminReducer";
import assignmentReducer from "./assignmentReducer";
import classAndDivisionReducer from "./classAndDivisionReducer";
import classTeacherReducer from "./classTeacherReducer";
import loaderReducer from "./LoaderReducer";
import noticeReducer from "./noticeReducer";
import schoolReducer from "./schoolReducer";
import studentReducer from "./studentReducer";
import teacherClassWorkReducer from "./teacherClassWorkReducer";
import teacherReducer from "./teacherReducer";

const rootReducer = combineReducers({
    admin: adminReducer,
    student: studentReducer,
    school : schoolReducer,
    teacher : teacherReducer,
    loader : loaderReducer,
    classAndDivision : classAndDivisionReducer,
    classTeacher : classTeacherReducer,
    activityImages : activityReducer,
    teacherClassWork : teacherClassWorkReducer,
    assignment : assignmentReducer,
    notice : noticeReducer
    
  })
export default rootReducer