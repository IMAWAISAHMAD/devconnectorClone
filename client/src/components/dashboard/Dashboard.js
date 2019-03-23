import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import propTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCurrentProfile,deleteAccount} from '../../actions/profileActions'
import Spinner from '../common/Spinner'
import ProfileActions from '../dashboard/ProfileActions'
import Education from './Education'
import Experience from './Experience'



class Dashboard extends Component {
  componentDidMount(){
      this.props.getCurrentProfile()  
  }
  onClickDelete (e){
    this.props.deleteAccount()
  }
  render() {
    const {user} = this.props.auth;
    const {profile,loading} = this.props.profile;
    let dashboardContent;
    if(profile===null || loading){
      dashboardContent = <Spinner />
    }
    else
    {
      //Check If Loged in User Has Profile
      if(Object.keys(profile).length>0){
        dashboardContent = (
          <div>
          <p className="lead text-muted">
            Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link> 
          </p>
          <ProfileActions />
          <Experience experience={profile.experience}/>
          <Education education={profile.education}/>
          <button className="btn btn-danger" onClick={this.onClickDelete.bind(this)}>Delete My Account</button>
          
          </div>
        )
      }
      else
      {
      //Loged In User Has No Profile Yet
      dashboardContent=(
        <div>
        <p className="lead text-muted">Welcome {user.name}</p>
        <p>You have not yet created your profile,please add some info</p>
        <Link to="/create-profile" className="btn btn-info btn-lg">Create Profile</Link>
        </div>
      )
     

      }
    }
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Dashboard.propTypes={
  getCurrentProfile:propTypes.func.isRequired,
  deleteAccount:propTypes.func.isRequired,
  profile:propTypes.object.isRequired,
  auth:propTypes.object.isRequired
}
const mapStateToProps = state =>({
  profile:state.profile,
  auth:state.auth
})

export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard)