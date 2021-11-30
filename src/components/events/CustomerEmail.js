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
  const { handleSubmit, pristine, reset, organization, student_info,  designation ,name,  email, submitting } = props

  this.state = {organization:organization, designation:designation, email:email, student_info:student_info, name:name}
  

  return (
    <form onSubmit={handleSubmit} style={{  width:"450px", textAlign:"left", margin: "5px 0px",fontSize: "1.3rem", fontWeight: "600", border: "2px solid #eeeeee",borderRadius: "12px",padding: "25px",
        background: "rgb(243 245 247)"
     }}>



            {this.state.name?(
                <div style={{padding:"10px"}}>
                    <div style={{width:"100%",  paddingBottom:"5px"}}>
                        Name
                    </div>
                    <Field

                                name="name"
                                component={renderField}
                                type="Name"
                                label="Name "
                                placeholder='Name'
                                autoFocus={true}
                                style={{width: '75%', height: '30px', border: '1px solid #cccccc', padding:"1px 5px 1px 5px"}}
                              />
                    <div style={{width:"100%",  paddingBottom:"5px"}}>
                        Personal email ID *
                    </div>
                    <Field

                                name="email"
                                component={renderField}
                                type="Email"
                                label="Personal email ID *"
                                placeholder='email'

                                validate={[required] }
                                style={{width: '75%', height: '30px', border: '1px solid #cccccc', padding:"1px 5px 1px 5px"}}
                              />


                </div>

            ):(<div style={{padding:"10px"}}>
                <div style={{width:"100%",  paddingBottom:"5px"}}>
                    Personal email ID *
                </div>
                <Field

                            name="email"
                            component={renderField}
                            type="Email"
                            label="Personal email ID *"
                            placeholder='email'
                            autoFocus={true}
                            validate={[required] }
                            style={{width: '75%', height: '30px', border: '1px solid #cccccc', padding:"1px 5px 1px 5px"}}
                          />

                </div>

                )}



        <div style={{padding:"10px"}}>
            <div style={{width:"100%",  paddingBottom:"5px"}}>
                Organization
            </div>

                <Field

                   name="organization"
                   component="input"
                   type="text"
                   label="Company name"
                   placeholder='Organization'
                   style={{width: '75%', height: '30px', border: '1px solid #cccccc', padding:"1px 5px 1px 5px"}}

             />
        </div>
        <div style={{padding:"10px"}}>
            <div style={{width:"100%",  paddingBottom:"5px"}}>
                Designation
            </div>

             <Field

                 name="designation"
                 component="input"
                 type="text"
                 label="Designation"
                 placeholder='Designation'
                 style={{width: '75%', height: '30px', border: '1px solid #cccccc', padding:"1px 5px 1px 5px"}}

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
