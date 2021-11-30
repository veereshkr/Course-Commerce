import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Button} from 'reactstrap'
import { connect } from 'react-redux'

let CommentBoxTeamForm = props => {
  //console.log(props.title);

  const { handleSubmit, pristine, reset, submitting_reiew,s_response } = props;
  const ph ='Please add additional notes for  Team'
  //const data = {Comment:'type here'}

  //console.log('===========',s_response)

    this.state = {Comment:s_response}

  //console.log('----- -- -- --',this.state)
  return (
    <form onSubmit={handleSubmit}>

      <div >

        <div style={{paddingTop:'10px'}}>
            {(s_response !=='') ?
            (<Field   initialvalues= {this.state}  name="Comment"  component="textarea" style={{width: '100%', height: '120px', border: '1px solid #cccccc', padding: '5px'}}/>):
        (<Field  placeholder={ph} name="Comment" component="textarea" style={{width: '100%', height: '120px', border: '1px solid #cccccc', padding: '5px'}}/>) }

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

CommentBoxTeamForm = reduxForm({
  form: 'reactWidgets'
})(CommentBoxTeamForm)
 CommentBoxTeamForm= connect(
  state => ({

    initialValues: this.state  // pull initial values from account reducer
})
)(CommentBoxTeamForm)
export default CommentBoxTeamForm
