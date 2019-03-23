import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SelectListGroup from "../common/SelectListGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import InputGroup from "../common/InputGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { createProfile,getCurrentProfile } from "../../actions/profileActions";
import isEmpty from '../../validation/is-empty';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  componentDidMount(){
      this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if(nextProps.profile.profile){
        const profile = nextProps.profile.profile;
        //Bringing Skills Array Back in CSV
        const skillsCsv = profile.skills.join(',');
        //IF Profile Not Exists Make Empty String
        profile.company= !isEmpty(profile.company) ? profile.company :'';
        profile.website= !isEmpty(profile.website) ? profile.website :'';
        profile.location= !isEmpty(profile.location) ? profile.location :'';
        profile.githubusername= !isEmpty(profile.githubusername) ? profile.githubusername : '';
        profile.bio= !isEmpty(profile.bio) ? profile.bio : '';
        profile.social = !isEmpty(profile.social) ? profile.social : {};
        profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
        profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
        profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
        profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
        profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';
        //Set Componet Fields State
        this.setState({
            handle:profile.handle,
            company:profile.company,
            website:profile.website,
            location:profile.location,
            status:profile.status,
            skills:skillsCsv,
            githubusername:profile.githubusername,
            bio:profile.bio,
            twitter:profile.twitter,
            facebook:profile.facebook,
            linkedin:profile.linkedin,
            youtube:profile.youtube,
            instagram:profile.instagram
        });

    }
  }
  onClick(e){
    e.preventDefault();
      this.setState(prevState => ({
        displaySocialInputs: !prevState.displaySocialInputs
      }));
  }
  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };
    this.props.createProfile(profileData, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  }

  render() {
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fa fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            icon="fa fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fa fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="Youtube Profile URL"
            name="youtube"
            icon="fa fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Instagram Profile URL"
            name="instagram"
            icon="fa fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.youtube}
          />
        </div>
      );
    }
    //Select Options For Status
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Internee", value: "Internee" },
      { label: "Student", value: "Student" },
      { label: "Other", value: "Other" }
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Your Profile</h1>
              <small className="d-block pb-3 text-danger"> 
                * = Required Fields
              </small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A Unique Handle For Your Profile URL.Your Full Name,Company Name or Nick Name."
                />
                <SelectListGroup
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  info="Select Your Professional Status From List."
                  options={options}
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Enter Your Company Name"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could Be Your Own or Company One."
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Enter City or State Of Your Location"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please Enter Coma Seperated Values e.g HTML,CSS,JAVASCRIPT."
                />
                <TextFieldGroup
                  placeholder="Github User Name"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If You Want Your Latest Repo's and Github Link then Provide Your Github Username."
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell Us A Little About Yourself."
                />
                <div className="mb-3">
                  <button
                    onClick={this.onClick}
                    className="btn btn-primary"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted p-2">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-success btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CreateProfile.propTypes = {
  createProfile:PropTypes.func.isRequired,
  getCurrentProfile:PropTypes.func.isRequired,  
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({

  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createProfile,getCurrentProfile }
)(withRouter(CreateProfile));
