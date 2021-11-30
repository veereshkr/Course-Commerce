import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Button } from 'reactstrap'
import normalizePhone from './normalizePhone'
import { connect } from 'react-redux'
const required = value => (value || typeof value === 'number' ? undefined : 'Required *')

var all_text={
      English:{

          submit:"Next",
          phone_number:"Phone Number *",
          name:"Name"
      },中文:{},
      ไทย:{

      },Deutsch:{},Français:{}, Pусский:{},Italiano:{},Español:{},日本人:{}, 'עברית':{} }

export const phoneNumber = value =>
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
      <input {...input} placeholder={placeholder} autoFocus={true} type={type} style={{width: '85%', height: '30px', border: '1px solid #cccccc', padding:"1px 5px", marginBottom:"10px"}} />

    </div>
  </div>
)

let CommentBoxCustomerForm = props => {
  const { handleSubmit, pristine, reset, language,  type , submitting } = props
  this.state = {language:language}
  return (
    <form onSubmit={handleSubmit} style={{margin: "5px 0px",fontSize: "1.3rem", fontWeight: "600", border: "2px solid #eeeeee",borderRadius: "12px",padding: "15px",background: "#fffbfb"
     }}>

        <div style={{paddingTop:'10px'}}>
                    <Field
                    name="phone"
                    component={renderField}
                    type="text"
                    placeholder={all_text[this.state.language]['phone_number']}
                    normalize={normalizePhone}
                    validate={[ required, phoneNumber ]}
                    autoFocus={true}
                    style={{width: '85%', height: '30px', border: '1px solid #cccccc', padding:"1px 5px"}}
                  />
        </div>
                 <div>
                   <Field
                    name="name"
                    component="input"
                    type="text"

                    placeholder={all_text[this.state.language]['name']}
                    style={{width: '85%', height: '30px', border: '1px solid #cccccc', padding:"1px 5px"}}
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

        <Button outline size="lg" color="danger" type="submit" disabled={submitting} style={{border:"1px solid" }}>
                     Next
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
