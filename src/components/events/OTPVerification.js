import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Button } from 'reactstrap'
import { connect } from 'react-redux'


var all_text={
      English:{
          d_m:"Please verify by entering OTP",

          submit:"Submit"
      }
      ,Deutsch:{},Français:{}, Pусский:{},Italiano:{},Español:{},日本人:{}, 'עברית':{} }

export const otp = value =>
  value && value.length < 6 ? `Must be ${6} characters or more` : undefined
const required = value => (value || typeof value === 'number' ? undefined : 'Required *')

const renderField = ({
  input,
  placeholder,
  type,
  meta: { touched, error, warning }
}) => (
  <div>


        <div style={{color:"#666666"}}> Please verfiy by entering OTP</div>

      <input {...input} placeholder={placeholder} type={type} style={{width: '85%', height: '30px', border: '1px solid #cccccc', padding:"1px 5px", marginBottom:"10px"}} />



  </div>
)

let OTPBoxCustomerForm = props => {
  const { handleSubmit, pristine, reset, language, submitting } = props
  this.state = {language:language}
  return (
    <form onSubmit={handleSubmit} >

        <div style={{paddingTop:'10px'}}>
                    <Field
                    name="otp"
                    component={renderField}
                    type="text"
                    placeholder="OTP *"
                    validate={[ required]}
                    autoFocus={true}
                    style={{width: '85%', height: '30px', border: '1px solid #cccccc', padding:"1px 5px"}}
                  />
        </div>



      <div style={{paddingTop:"10px"}}>

        <Button outline size="lg" color="danger" className='btn' style={{fontSize:"4.0rem",  fontWeight:"700" ,padding:"10px"}} type="submit" disabled={submitting}>
                      {all_text[this.state.language]['submit'] ?(<span>{all_text[this.state.language]['submit']}</span>):(<span>
                           Submit  </span>)}
                  </Button>

      </div>
    </form>
  )
}

OTPBoxCustomerForm = reduxForm({
   form: 'reactWidgets'
 })(OTPBoxCustomerForm)
  OTPBoxCustomerForm= connect(
   state => ({

     initialValues: this.state  // pull initial values from account reducer
 })
 )(OTPBoxCustomerForm)
 export default OTPBoxCustomerForm
