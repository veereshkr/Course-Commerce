import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { PasswordResetEmail } from '../../actions/authActions';
import PropTypes from 'prop-types'

import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import {Helmet} from "react-helmet";
import ReactGA from 'react-ga';
import {Button} from 'reactstrap'
ReactGA.initialize('UA-124346448-2');
function validateInput(data) {

  let errors = {};

  if (Validator.isEmpty(data.identifier)) {
    errors.identifier = 'This field is required';
  }



  return {
    errors,
    isValid: isEmpty(errors)
  };
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    ReactGA.pageview('Password Reset 2');
    var path = this.props.match.url.split("/")[2]
    if(path === 'expired' ){
      var text = 'Your token is expired. Please enter your email again. '
    } else if(path ==="invalid"){
      text = "Your token is not valid. Please enter your e-mail address and we'll send you an e-mail with instructions to reset your password"
    }else{
      text = "Please enter your e-mail address and we'll send you an e-mail with instructions to reset your password"
    }
    this.state = {
      identifier: '',
      errors: {},
      isLoading: false,
      text: text,
      color:"#000000"
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid() {

    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {



      this.setState({ errors: {}, isLoading: true });

      PasswordResetEmail(this.state).then(function(res){
        console.log(res)
        if(res.length >1){
          this.setState({text:"Success! An e-mail with a link to reset your password has been sent to you.", color:"rgb(6, 160, 6)"})
        }
        else{
          this.setState({ text: "Couldn't find your  account, please try another email", color:"#ff6060"})
        }
        //console.log(res)
      }.bind(this));
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onClick() {
    this.props.history.push('/login/')
    //console.log('came here')

  }

  render() {
    const { errors, identifier, isLoading } = this.state;
    var color = this.state.color
    return (
      <form onSubmit={this.onSubmit} style={{padding:'25px 40px 25px 40px' , marginTop:'10px', background: 'rgba(245, 245, 245, 0.7)' }}>
        <Helmet>
          <title>  | Client Login </title>
        </Helmet>
        <h4 style={{marginBottom:"30px", color:color }}>{this.state.text}</h4>

        <TextFieldGroup
          field="identifier"
          label="Email"
          value={identifier}
          error={errors.identifier}
          onChange={this.onChange}
        />



        <div className="form-group"><Button color="primary" size="lg" block disabled={isLoading} style={{fontSize:"20px", fontWeight:"600"}}>Reset Password</Button></div>

        {/* <div style={{paddingTop:"20px", textAlign:'center', fontSize:'1.5rem'}}> <a role="button" onClick={this.onClick} > Back to Login page </a> </div> */}
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default withRouter(connect(null, { PasswordResetEmail })(LoginForm));
