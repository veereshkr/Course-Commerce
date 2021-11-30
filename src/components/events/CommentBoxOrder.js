import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Button} from 'reactstrap'
import { connect } from 'react-redux'

let CommentBoxOrder = props => {
  //console.log(props.title);

  const { handleSubmit, pristine, reset, submitting_reiew,s_response } = props;
  const ph ='Add your comment here!'
  //const data = {CustomerComment:'type here'}

  //console.log('===========',s_response)

    this.state = {CustomerComment:s_response}

  //console.log('----- -- -- --',this.state)
  return (
    <form onSubmit={handleSubmit}>

      <div >

        <div style={{paddingTop:'10px'}}>
            {(s_response !=='') ?
            (<Field   initialvalues= {this.state}  name="CustomerComment"  component="textarea" style={{width: '100%', height: '80px', border: '1px solid #cccccc', padding: '5px'}}/>):
        (<Field  placeholder={ph} name="CustomerComment" component="textarea" style={{width: '100%', height: '80px', border: '1px solid #cccccc', padding: '5px'}}/>) }

        </div>
      </div>
      <div style={{margin:"10px 0 0 0"}}>
        <Button size="lg" color="primary" className='btn' style={{fontSize:"4.0rem",  fontWeight:"700" ,padding:"10px"}} type="submit" disabled={pristine || submitting_reiew}>{(s_response ==='') ? (<span>  Submit </span>):(<span>  Edit </span>)} </Button>
        <Button size="lg" color="danger" className='btn' style={{fontSize:"4.0rem",  fontWeight:"700" ,padding:"10px", marginLeft:'30px'  }} outline type="button" disabled={pristine || submitting_reiew} onClick={reset}> Reset
        </Button>
      </div>

    </form>
  )
}

CommentBoxOrder = reduxForm({
  form: 'reactWidgets'
})(CommentBoxOrder)
 CommentBoxOrder= connect(
  state => ({

    initialValues: this.state  // pull initial values from account reducer
})
)(CommentBoxOrder)
export default CommentBoxOrder
