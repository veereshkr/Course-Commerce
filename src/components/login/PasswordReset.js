import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { login } from '../../actions/authActions';
import PropTypes from 'prop-types'
import { PasswordReset } from '../../actions/authActions';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import {Helmet} from "react-helmet";
import ReactGA from 'react-ga';
ReactGA.initialize('UA-124346448-2');
function validateInput(data) {

  let errors = {};

  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }

  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  }
  if (data.password !== data.passwordConfirmation ) {
    errors.passwordConfirmation = 'Passwords not matching';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    //console.log(this)
    ReactGA.pageview('Password Reset');
    var token = this.props.match.url.split("/")[2]
    var data ={identifier:token }
    PasswordReset(data).then(function(res){
      //console.log(res)
      if(res === 'reset'){
        //console.log(token)
      }
      if(res === 'expired'){
        //console.log('token expired')
        this.props.history.push('/login/token_expired')
      }
      if (res === 'invalid'){
             //console.log('token invalid')
              this.props.history.push('/login/invalid')
      }
      //console.log(res)
    }.bind(this));

    //ReactGA.pageview('login');
    this.state = {
      password: '',
      passwordConfirmation: '',
      errors: {},
      isLoading: false,
      text:'',
      color:"#000000",
      identifier:token
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
      //console.log('---', e)

      var url = this.context.router.route.match.url.substr(6)

      if((url.length<2) ||  (url.indexOf("/login/") >= 0 )){

        url='/home'
      }
      //this.setState({ errors: {}, isLoading: true });
      //console.log(this)
      var data ={identifier:this.state.identifier , password:this.state.password}
      //console.log('data',data)
      PasswordReset(data).then(function(res){
        //console.log('res', res)
        if(res === 'reset'){
          this.setState({text:"Success! You can login with your new password", color:"rgb(6, 160, 6)"})
        }
        if(res === 'expired'){
          this.props.history.push('/login/token_expired')
        }
        if (res === 'invalid'){
                this.props.history.push('/login/invalid')
        }
        //console.log(res)
      }.bind(this));
      //console.log(data)

      // this.props.login(this.state).then(
      //   (res) => this.context.router.history.push(url),
      //   (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
      // );
    }
  }


  onChange(e) {
    //console.log(e,[e.target.name], e.target.name, e.target.value  )
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, password, passwordConfirmation, isLoading } = this.state;
    var color = this.state.color
    return (
      <form onSubmit={this.onSubmit} style={{padding:'25px 40px 25px 40px' , marginTop:'10px', background: 'rgba(245, 245, 245, 0.7)' }}>
        <Helmet>
          <title>  | Client Login </title>
        </Helmet>
        <h1>Reset Your Password</h1>
        <h4 style={{marginBottom:"30px", color:color }}>{this.state.text}</h4>

        { errors.form && <div className="alert alert-danger" style={{fontSize:'1.5rem', textAlign:'center'}}>{errors.form}  <span style={{color:"#333333"}}> <br></br>Try again or call <a  href="tel:+1">
          {/* <i className="icon-phone" style={{paddingLeft:'5px', paddingRight:'5px'}}></i> */}
           <span> </span>
         </a> </span></div> }

        <TextFieldGroup
          field="password"
          label="Password"
          value={password}
          error={errors.password}
          onChange={this.onChange}
          type="password"
        />

        <TextFieldGroup
          field="passwordConfirmation"
          label="Confirm Password"
          value={passwordConfirmation}
          error={errors.passwordConfirmation}
          onChange={this.onChange}
          type="password"
        />

        <div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Reset</button></div>
      </form>
    );
  }
}

ResetPassword.propTypes = {
  login: PropTypes.func.isRequired
}

ResetPassword.contextTypes = {
  router: PropTypes.object.isRequired
}

export default withRouter(connect(null, { login })(ResetPassword));
