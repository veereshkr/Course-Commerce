import React from 'react';
import LoginForm from './LoginForm';
import PasswordResetEmail from './PasswordResetEmail';
import {  Row, Col } from 'reactstrap'
class LoginPage extends React.Component {
  constructor(p){
   super(p);
   console.log('came')
   this.onClick = this.onClick.bind(this);
   var path = this.props.match.url.split("/")[2]
   if(path ==="expired" || path ==="invalid"){
     this.state={login:false}
   }else{
     this.state={login:true}
   }
 }

  onClick() {
      this.setState({login:!this.state.login})

    }
  render() {
    if(this.state.login){
    return (
      <div className="row" style={{paddingTop:"100px", height:'100% !important'}}>
         <Row style={{ margin:'0 auto', width:"400px" ,background:'#ffffff', padding:'30px'}}>
        <Col xs="12" sm="12" lg="12" >
          <div style={{width:"100%", textAlign:'center'}}>
          <img src="/img/_logo.png" style={{width:"75%", paddingBottom:"10px"}} alt=""/>
        </div>

          <LoginForm  style={{background:'#e6e6e6'}}/>
          {<div style={{paddingTop:"20px", textAlign:'center', fontSize:'1.5rem', color:'#5a00fd'}}> <a role="button" onClick={this.onClick}  > Forgot Password? </a> </div> }
      </Col>
        </Row>
      </div>
    );
  }else{
    return (
      <div className="row" style={{paddingTop:"100px", height:'100% !important'}}>
          <Row style={{ margin:'0 auto', width:"400px" ,background:'#ffffff', padding:'30px'}}>
         <Col xs="12" sm="12" lg="12" >
          <div style={{width:"100%", textAlign:"center"}}>
          <img src="/img/_logo.png" style={{width:"75%", paddingBottom:"10px"}} alt=""/>
        </div>

          <PasswordResetEmail />
          <div style={{paddingTop:"20px", textAlign:'center', fontSize:'1.5rem'}}> <a role="button" onClick={this.onClick} > Back to Login page </a> </div>
      </Col>
        </Row>

      </div>
    );
  }
  }
}

export default LoginPage;
