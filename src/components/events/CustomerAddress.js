import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Button } from 'reactstrap'
import normalizePhone from './normalizePhone'
import { connect } from 'react-redux'
const required = value => (value || typeof value === 'text' ? undefined : 'Required *')

var all_text={
      English:{
          address: "Address",
          enter_address:"Please Enter your Address *",
          other_details:"Landmark and other details",
          submit:"Submit"
      },中文:{},
      Deutsch:{},Français:{}, Pусский:{},Italiano:{},Español:{},日本人:{}, 'עברית':{} }

export const address = value =>
  value && value.length < 12 ? `Must be ${10} characters` : undefined


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
      <textarea {...input} placeholder={placeholder} autoFocus={true} component = "textarea" type={type} style={{width: '100%', height: '80px', border: '1px solid #cccccc', padding:"1px 5px", marginBottom:"10px"}} />

    </div>
  </div>
)

let CommentBoxCustomerForm = props => {
  const { handleSubmit, pristine, reset, language, submitting, s_response } = props
  this.state = {language:language}
  return (
    <form onSubmit={handleSubmit} style={{margin: "5px 0px",fontSize: "1.3rem", fontWeight: "600", border: "2px solid #eeeeee",borderRadius: "12px",padding: "15px",background: "#fffbfb"
     }}>

        <div style={{paddingTop:'10px'}}>
                    <label > {all_text[this.state.language]['address']} </label>
                    <Field
                    name="address"
                    component={renderField}
                    type="textArea"
                    placeholder={all_text[this.state.language]['enter_address']}

                    validate={[ required]}
                    autoFocus={true}

                  />
        </div>
                 <div tyle={{paddingTop:'10px'}}>
                   <Field
                    name="details"
                    component="textarea"
                    type="text"

                    placeholder={all_text[this.state.language]['other_details']}
                    style={{width: '100%', height: '50px', border: '1px solid #cccccc', padding:"1px 5px"}}
                  />
                </div>



      {/* <Field
        name="phone"
        type="text"
        component={renderField}
        label="Phone number"
        normalize={normalizePhone}
        validate={[required, phoneNumber]}
      /> */}
      <div style={{paddingTop:"10px"}}>

        <Button outline size="lg" color="danger" className='btn' style={{fontSize:"4.0rem",  fontWeight:"700" ,padding:"10px"}} type="submit" disabled={submitting}>
                      {all_text[this.state.language]['submit'] ?(<span>{all_text[this.state.language]['submit']}</span>):(<span>
                           Submit  </span>)}
                  </Button>

      </div>
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
