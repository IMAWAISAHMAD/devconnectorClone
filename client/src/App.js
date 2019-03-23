import React, { Component } from "react";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import { Provider } from "react-redux";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import { logoutUser } from "./actions/authActions";
import {clearCurrentProfile} from  "./actions/profileActions"
import PrivateRoute from "./components/common/PrivateRoute"
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import NotFound from './components/not-found/NotFound';
import Footer from "./components/layout/Footer";
import "./App.css";


//Check For Token
if (localStorage.jwtToken) {
  //Set auth header with token
  setAuthToken(localStorage.jwtToken);
  //Decode token to get user information
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set current user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  //Check for Expired Token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout User
    store.dispatch(logoutUser());
    //Clear Current Profile and redirect to Login Page
    store.dispatch(clearCurrentProfile());
    window.location.href = "/login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/profiles" component={Profiles} />
              <Route path="/profile/:handle" component={Profile} />
              <Switch>
              <PrivateRoute path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
              <PrivateRoute path="/create-profile" component={CreateProfile} />
              </Switch>
              <Switch>
              <PrivateRoute path="/edit-profile" component={EditProfile} />
              </Switch>
              <Switch>
              <PrivateRoute path="/add-experience" component={AddExperience} />
              </Switch>
              <Switch>
              <PrivateRoute path="/add-education" component={AddEducation} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
