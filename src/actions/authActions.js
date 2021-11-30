import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user,aspect,clicked,languages) {

  return {
    type: SET_CURRENT_USER,
    user,
    aspect,
    clicked,
    languages

  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('locationInfo');
    localStorage.removeItem('selectedLocation');
    localStorage.removeItem('aspect');
    localStorage.removeItem('clicked');
    localStorage.removeItem('languages');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

export function login(data) {
  return dispatch => {
    return axios.post('/api/auth', data).then(res => {


      const token = res.data;

      const location_info = res.data.location_info;
      const languages = res.data.languages;
      var selected_location = res.data.selected_location;
      var aspect = null;
      var clicked = null;
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('locationInfo',JSON.stringify(location_info) );
      localStorage.setItem('selectedLocation', selected_location);
      localStorage.setItem('aspect', null);
      localStorage.setItem('clicked', null);
      localStorage.setItem('languages', JSON.stringify(languages));
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token),aspect,clicked,languages));

    });
  }
}

export function PasswordResetEmail(data) {

    return axios.post('/api/password_reset_email', data).then(res => {

      const email_data = res.data;
      return email_data;

    });

}

export function ManageUsers(data) {

    return axios.post('/api/manage_users', data).then(res => {

      const email_data = res.data;
      return email_data;

    });

}

export function CreatedUsers(data) {

    return axios.post('/api/created_users', data).then(res => {

      const email_data = res.data;
      return email_data;

    });

}

export function DeleteUser(data) {

    return axios.post('/api/delete_user', data).then(res => {

      const email_data = res.data;
      return email_data;

    });

}



export function PasswordReset(data) {

    return axios.post('/api/password_reset', data).then(res => {

      const email_data = res.data;
      return email_data;

    });

}

export function PasswordSet(data) {

    return axios.post('/api/password_set', data).then(res => {

      const email_data = res.data;
      return email_data;

    });

}
export function Tasks(data) {

    return axios.post('/tasks/', data).then(res => {

      const email_data = res.data;
      return email_data;

    });

}
export function MoreCourses(data) {

    return axios.post('/more_courses/', data).then(res => {

      const courses_data = res.data;
      return courses_data;

    });

}
export function enroll(data) {

    return axios.post('/api/enroll', data).then(res => {
      const enroll_data = res.data;
      return enroll_data;

    });

}

export function register_student(data) {

    return axios.post('/api/register_student', data).then(res => {
      const order_info = res.data;
      return order_info;

    });

}

export function CourseDetails(data) {

    return axios.get('/course_details?course_id='+data).then(res => {
      const course_info = res.data;
      return course_info;

    });

}
export function CoursesEnrolled(data) {

    return axios.post('/api/courses_enrolled', data).then(res => {
      const courses_info = res.data;
      return courses_info;

    });

}
export function UpdateStudentInfo(data) {

    return axios.post('/api/update_student_info', data).then(res => {
      const student_info = res.data;
      return student_info;

    });

}
export function StudentInfo(data) {

    return axios.post('/api/student_info', data).then(res => {
      const student_info = res.data;
      return student_info;

    });

}
export function EventEnrolled(data) {

    return axios.post('/api/event_enrolled', data).then(res => {
      const courses_info = res.data;
      return courses_info;

    });

}
