import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';

import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import PropTypes from 'prop-types'
import {Button} from "reactstrap"
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import {Helmet} from "react-helmet";
import ReactGA from 'react-ga';
ReactGA.initialize('UA-124346448-2');
function validateInput(data) {

  let errors = {};

  if (Validator.isEmpty(data.identifier)) {
    errors.identifier = 'This field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

var all_text={
      English:{
          d_m:"Please verify by entering OTP",

          submit:"Submit"
      },中文:{},
      ไทย:{
          d_m:"กรุณาป้อนหมายเลข OTP",

          submit:"ยืนยัน"
      },Deutsch:{},Français:{}, Pусский:{},Italiano:{},Español:{},日本人:{}, 'עברית':{} }


class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    ReactGA.pageview('login');
    this.state = {
      identifier: this.props.initialValues.phone,
      password: '',
      errors: {},
      isLoading: false,
      language:this.props.initialValues.language
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


        var url ="/student"
      // var url = this.context.router.route.match.url.substr(6)
      //
      // if((url.length<2) ||  (url.indexOf("/login/") >= 0 )){
      //     console.log('came2--')
      //   url='/home'
      // }
      this.setState({ errors: {}, isLoading: true });

      this.props.login(this.state).then(
        (res) => this.context.router.history.push(url),
        (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
      );
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, identifier, password, isLoading, language } = this.state;


    return (
      <form onSubmit={this.onSubmit}  style={{color:"#999999"}}>



        { errors.form && <div className="alert alert-danger" style={{fontSize:'1.5rem', textAlign:'center'}}>{errors.form}  <span style={{color:"#333333"}}> <br></br>Try again or call <a  href="tel:+1">
          {/* <i className="icon-phone" style={{paddingLeft:'5px', paddingRight:'5px'}}></i> */}
           <span> </span>
         </a> </span></div> }

        {/* <TextFieldGroup

          field="identifier"
          label="Username / Email"
          value={identifier}
          error={errors.identifier}
          onChange={this.onChange}
        /> */}

        <TextFieldGroup
          field="password"
          label={all_text[this.state.language]['d_m']}
          value={password}
          error={errors.password}
          onChange={this.onChange}
          type="text"
          style={{width: '50%', height: '30px', border: '1px solid #cccccc', padding:"1px 5px ", color:"#999999"}}
        />

        <div className="form-group">
            <Button outline size="lg" color="danger" className='btn' style={{fontSize:"4.0rem",  fontWeight:"700" ,padding:"10px"}} type="submit" disabled={isLoading}>
                          {all_text[this.state.language]['submit'] ?(<span>{all_text[this.state.language]['submit']}</span>):(<span>
                               Submit  </span>)}
                      </Button>

        </div>
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


export default connect(null, { login })(LoginForm);
