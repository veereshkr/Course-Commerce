import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Button } from 'reactstrap'
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import normalizePhone from './normalizePhone'
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux'
const required = value => value ? undefined : 'Required'


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


const renderField = ({
  input,
  placeholder,
  type,
  meta: { touched, error, warning }
}) => (
  <div>

    <div>
        {touched &&
          ((error && <div style={{color:"rgb(205,92,92)"}}>{error}</div>) ||
            (warning && <div style={{color:"rgb(205,92,92)"}}>{warning}</div>))}
      <input {...input} placeholder={placeholder} autoFocus={true} type={type} style={{width: '75%', height: '30px', border: '1px solid #cccccc', padding:"1px 5px", marginBottom:"10px"}} />

    </div>
  </div>
)

let CommentBoxCustomerForm = props => {
  const { handleSubmit, pristine, reset, organization,  designation , email, submitting } = props
  this.state = {organization:organization, designation:designation, email:email}
  return (
    <form onSubmit={handleSubmit} style={{  width:"450px", textAlign:"left", margin: "5px 0px",fontSize: "1.3rem", fontWeight: "600", border: "2px solid #eeeeee",borderRadius: "12px",padding: "25px",
        background: "rgb(243 245 247)"
     }}>

        
    </form>
  )
}

CommentBoxCustomerForm = reduxForm({
   form: 'reactWidgets'
 })(CommentBoxCustomerForm)
  CommentBoxCustomerForm= connect(
   state => ({

     initialValues: this.state  // pull initial values from account reducer
 })
 )(CommentBoxCustomerForm)
 export default CommentBoxCustomerForm
