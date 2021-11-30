import React from 'react';
import { Route } from 'react-router';
import Loadable from 'react-loadable';
import App from './components/App';
//import Welcome from './components/Welcome';
import PasswordResetPage from './components/login/PasswordResetPage';
import PasswordSetPage from './components/login/PasswordSetPage';
import LoginPage from './components/login/LoginPage';
//import Home from './components/events/Home';


//import NewPage from './components/events/NewPage';
//import Reviews from './components/events/Reviews';
import requireAuth from './utils/requireAuth';
//import Student from "./components/events/Student";



const Main = Loadable({
  loader: () => import('./components/events/main'),
  loading() {
    return <div>Loading...</div>
  }
});

const CourseDetails = Loadable({
  loader: () => import('./components/events/main'),
  loading() {
    return <div>Loading...</div>
  }
});
const Enroll= Loadable({
  loader: () => import('./components/events/Enroll'),
  loading() {
    return <div>Loading...</div>
  }
});
const Student= Loadable({
  loader: () => import('./components/events/Student'),
  loading() {
    return <div>Loading...</div>
  }
});
const ManageAccount= Loadable({
  loader: () => import('./components/events/ManageAccount'),
  loading() {
    return <div>Loading...</div>
  }
});
const PurchaseHistory= Loadable({
  loader: () => import('./components/events/PurchaseHistory'),
  loading() {
    return <div>Loading...</div>
  }
});
const Home= Loadable({
  loader: () => import('./components/events/Home'),
  loading() {
    return <div>Loading...</div>
  }
});
const Routes = () =>
 (
  <div style={{minHeight:'100%'}}>
    <App>
      <Route exact={true} path="/" component={Main} />
      <Route style={{height:'100% !important'}} path="/reset/:token?/" component={PasswordResetPage} />
      <Route style={{height:'100% !important'}} path="/set/:token?/" component={PasswordSetPage} />
      <Route style={{height:'100% !important'}} path="/login/:location_name?/:service?/" component={LoginPage} />
      <Route  path="/course_details/:course_id?" component={CourseDetails} />

      <Route  path="/enroll/:ref?/:token?/:access_code" component={Enroll} />
       <Route  path="/student/:ref?/" component={requireAuth(Student)} />
       <Route  path="/manage_account/:ref?/" component={requireAuth(ManageAccount)} />
        <Route  path="/purchase_history/:ref?/" component={requireAuth(PurchaseHistory)} />
        <Route  path="/home/:ref?/" component={requireAuth(Home)} />






      {/* <Route path="/work-sheets/" component={requireAuth(WorkSheets)} /> */}
      {/* <Route path="/work-sheets-all/" component={requireAuth(WorkSheetsAll)} /> */}

    </App>
  </div>
);
export default Routes;
