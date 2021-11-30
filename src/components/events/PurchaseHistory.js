import React from 'react';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Button, Card} from 'reactstrap';
import { connect } from 'react-redux';
import CustomerEmail from './CustomerEmail'
import jwtDecode from 'jwt-decode';
import {Helmet} from "react-helmet";
import {StudentInfo} from '../../actions/authActions';
import {UpdateStudentInfo} from '../../actions/authActions';

//import ReactFlow from 'react-flow-renderer';
var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var days = ['Sun','Mon', 'Tues','Wed','Thu','Fri','Sat'];


class NewPage extends React.Component {
  constructor(props){
   super(props);

   var short_id = this.props.match.url.split("/")[2]
   this.state ={big_screen:true,  languages:false, all_businesses:{}, favorites:false,
  recommended_businesses:[],self_register:false,   student_info:{}, short_access_code:this.props.auth.auth.user.profile.short_access_code,
  short_id:short_id, all_courses:[], manage_course:null, svg:null, email_shared:false, thanks_update:false, student_email_info:null, edit_profile:false}
  if(!this.props.auth.auth.isAuthenticated){
        this.props.history.push('/login');

    }else{
        var data = { phone:this.props.auth.auth.user.username}


        StudentInfo(data).then(function(r){






            this.setState({ student_info:r.studentinfo})
        }.bind(this))

    }

  }

  componentDidMount() {

    window.addEventListener("resize", this.resize.bind(this));

    this.resize();

  }

  resize() {
      this.setState({big_screen: window.innerWidth > 760});
  }

   edit_profile(values){
       this.setState({thanks_update:false})
  }


  customer_info_update(values){

      var data = {values:values, 'id':this.props.auth.auth.user.id}
      UpdateStudentInfo(data).then(function(r){



          if(r['resp']['email']){


          }

      }.bind(this))
       this.setState({email_shared:true, thanks_update:true})

  }



  render() {



    if(!this.props.auth.auth.isAuthenticated){

      this.props.history.push('/login'+this.props.match.url)
      return(
        <div> </div>
      )

  }else{


        return(<div style={{background:"#fefefe"}}>
            <Helmet>
              <title>  |  Purchase History Page </title>


            </Helmet>
            <Header />

             <Sidebar {...this.props} style={{ margin:'55px 0 0 0', background:"#e9f5ff"}} />
            {/* <div style={{ width:"100%",  width:"100%",position:'fixed',  height:"64px", top:'0', textAlign:'center', verticalAlign:"middle" , zIndex:"999", padding:"0px 0px 0px 0px", marginRight:"10px", boxShadow:"0px 1px 4px 0px rgba(0,0,0,0.2)", background:"#ffffff" }}>

                <div style={{ width:"40%", textAlign:"left", float:"left"}}>

                    <h2 height="80px"  style={{padding:'2px 2px 2px 0px', margin:"5px 5px 0px 15px"}}> <a href="/">  <img src="/img/_logo.png" style={{height:"50px",  cursor:"pointer"}} /> </a> </h2>
               </div>
                <div style={{ width:"60%", float:"left", height:"64px", textAlign:'right',alignItems:"center", display:"flex",justifyContent:"flex-end", padding:'2px 25px 2px 2px' }}> <b style={{fontSize:"1.5rem" }}>

                      {this.props.auth.auth.user.username ?(<span style={{paddingRight:"10px"}}> {this.props.auth.auth.user.profile.name} <i  className="fa fa-bars fa-lg" style={{paddingLeft:"10px"}}></i> </span>):(null)}

               </b>
              </div>
              </div> */}
              <main className="main" style={{marginTop:"-66px"}} >

            <Container fluid style={{padding: "90px 30px 0px 30px", marginTop:"66px", background:"#ffffff"}}>
              <div className="animated fadeIn" >

                  <Row style={{width:"100%", fontSize:"2.3rem", letterSpacing:"1px",  color:"#777777", margin:"0"}}>
                      <Col xs="12" sm="12" lg="12" style={{padding:"20px", minHeight:"1000px"}} >
                          {this.state.student_info.email?(<div>
                              Purchase History


                          </div>):(null)}

                          <span style={{fontSize:"1.5rem"}}>This page will work later </span>
                      </Col>
                  </Row>


                  </div>
              </Container>
          </main>




          </div>

      )

    }
}
}
function mapStateToProps(state) {
  return {
    auth: state
  };
}
export default connect(mapStateToProps) (NewPage);
