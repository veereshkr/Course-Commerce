import React from 'react';
import PasswordReset from './PasswordReset';
import {  Row, Col } from 'reactstrap'
//import PasswordResetEmail from './PasswordResetEmail';
class PasswordResetPage extends React.Component {
  constructor(p){
   super(p);
   var pUrl = '/reset'
   this.onClick = this.onClick.bind(this);

   if(this.props.match.url.indexOf(pUrl) > -1){
     var token = this.props.match.url.split("/")[2]
     if(!token){
       console.log('token missing')
     }else{
       console.log(token)
    }
    //  this.props.auth.auth.selected = 0
    //  for(var l=0; l< this.props.auth.auth.locations.length; l++){
     //
    //    if(lN.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() === this.props.auth.auth.locations[l].name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || lN ==='dashboard'){
    //      this.props.auth.auth.selected = l
    //      this.sS(l)
    //    }
    //  }
   }
    }
    onClick() {
      this.props.history.push('/login/')
      //console.log('came here')

    }
  render() {

    return (
      <div className="row" style={{paddingTop:"100px", height:'100% !important'}}>
          <Row style={{ margin:'0 auto', width:"400px" ,background:'#ffffff', padding:'30px'}}>
         <Col xs="12" sm="12" lg="12" >
          <div style={{width:"100%", textAlign:"center"}}>
          <img src="/img/_logo.png" style={{width:"75%", paddingBottom:"10px"}} alt=""/>
        </div>

          <PasswordReset />
          <div style={{paddingTop:"20px", textAlign:'center', fontSize:'1.5rem'}}> <a role="button" onClick={this.onClick} > Back to Login page </a> </div>
      </Col>
        </Row>

      </div>
    );

  }
}

export default PasswordResetPage;
