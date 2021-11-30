import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Button } from 'reactstrap'
import normalizePhone from './normalizePhone'
import { connect } from 'react-redux'
const required = value => (value || typeof value === 'number' ? undefined : 'Required *')

var all_text={
      English:{
          signup:"Signup / Request for verification link",
          d_m:"Delivery Method",
          p_f_r:"Pick from Restaurant",
          h_d:"Home Delivery",
          submit:"Submit",
          phone_number:"Phone Number *",
          name:"First Name/ Nickname"
      },中文:{},
      ไทย:{
          signup:"ลงทะเบียน/เพื่อขอลิงค์ยืนยันตัวตน",
          d_m:"กรุณาเลือกวิธีการรับอาหาร",
          p_f_r:"ไปรับเองที่ร้านอาหาร",
          h_d:"ส่งถึงบ้าน",
          submit:"ยืนยัน",
          phone_number:"หมายเลขโทรศัพท์ *",
          name:"ชื่อลูกค้า"
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
  const { handleSubmit, pristine, reset, language,  submitting } = props
  this.state = {language:language, delivery: "p_f_r"}

  return (
    <form onSubmit={handleSubmit} style={{margin: "5px 0px",fontSize: "1.3rem", fontWeight: "600", border: "2px solid #eeeeee",borderRadius: "12px",padding: "15px",background: "rgba(255, 250, 250, 0.9)"
     }}>

        <label> {all_text[this.state.language]['signup']} </label>
        <div style={{paddingTop:'10px'}}>
                    <Field
                    name="phone"
                    component={renderField}

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
      <div style={{padding:"10px 30px 0 0", textAlign:"right"}}>

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
