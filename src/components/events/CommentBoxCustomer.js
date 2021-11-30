import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Button} from 'reactstrap'
import { connect } from 'react-redux'

let CommentBoxCustomerForm = props => {
  //console.log(props.title);
  const l_text={submit:{en:"Submit"}, reset:{en:"Reset", th:"ยกเลิก"}, edit:{en:"Edit", th:"แก้ไข"}}
  const { handleSubmit, pristine, reset, submitting_reiew,s_response, lang } = props;

  const ph ='Please enter details for investigation!'
  //const data = {CustomerComment:'type here'}

  //console.log('===========',s_response)

    this.state = {CustomerComment:s_response}

  //console.log('----- -- -- --',this.state)
  return (
    <form onSubmit={handleSubmit}>

      <div >

        <div style={{paddingTop:'10px'}}>
            {(s_response !=='') ?
            (<Field   initialvalues= {this.state}  name="CustomerComment"  component="textarea" style={{width: '100%', height: '120px', border: '1px solid #cccccc', padding: '5px'}}/>):
        (<Field  placeholder={ph} name="CustomerComment" component="textarea" style={{width: '100%', height: '120px', border: '1px solid #cccccc', padding: '5px'}}/>) }

        </div>
      </div>
      <div style={{margin:"10px 0 0 0"}}>
        <Button size="lg" color="primary" className='btn' style={{fontSize:"4.0rem",  fontWeight:"700" ,padding:"10px"}} type="submit" disabled={pristine || submitting_reiew}>{(s_response ==='') ? (<span>  {l_text.submit[lang]} </span>):(<span>  {l_text.edit[lang]} </span>)} </Button>
        <Button size="lg" color="danger" className='btn' style={{fontSize:"4.0rem",  fontWeight:"700" ,padding:"10px", marginLeft:'30px'  }} outline type="button" disabled={pristine || submitting_reiew} onClick={reset}> {l_text.reset[lang]}
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
