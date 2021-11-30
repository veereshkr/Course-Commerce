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
import {CoursesEnrolled} from '../../actions/authActions';
import {EventEnrolled} from '../../actions/authActions';
import {UpdateStudentInfo} from '../../actions/authActions';
import mermaid from "mermaid";
//import ReactFlow from 'react-flow-renderer';
var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var days = ['Sun','Mon', 'Tues','Wed','Thu','Fri','Sat'];
var textU={fontSize:"2.2rem", fontWeight:"700", minHeight:"50px", padding:"20px", color:"#77777", background:"#fafafa"}
var textA={fontSize:"2.2rem", fontWeight:"700", minHeight:"50px", padding:"20px", color:"#77777"}
var textC={fontSize:"2.2rem", fontWeight:"700", minHeight:"50px", padding:"20px", color:"#77777"}
const dash_box_to_do = {textAlign:"center", minHeight:"150px", background:"rgb(255 235 235)", padding:"10px"}
const dash_box_due = {textAlign:"center", minHeight:"150px", background:"rgb(235 255 255)", padding:"10px"}
const dash_box_complete = {textAlign:"center", minHeight:"150px", background:"rgb(235 255 235)", padding:"10px"}

class NewPage extends React.Component {
  constructor(props){
   super(props);
   mermaid.initialize({
            mermaid : {
                startOnLoad: true,
            },

        })

   var short_id = this.props.match.url.split("/")[2]
   this.state ={big_screen:true,  languages:false, all_businesses:{}, favorites:false,
  recommended_businesses:[],self_register:false,   short_access_code:this.props.auth.auth.user.profile.short_access_code,  short_id:short_id, all_courses:[], manage_course:null, svg:null, email_shared:false, thanks_update:false, student_email_info:null}
  if(!this.props.auth.auth.isAuthenticated){
        this.props.history.push('/login');

    }else{
        var data = { phone:this.props.auth.auth.user.username}


        CoursesEnrolled(data).then(function(r){


            var all_courses = [],student_email_info =null, email_shared=false

            for(var i=0; i<r['courses'].length; i++){



                    all_courses.push(r['courses'][i])

                    if(r['student_email_info']['email']){
                        student_email_info = r['student_email_info']['email']
                        email_shared = true
                    }

            }

            this.setState({'all_courses':all_courses, email_shared:email_shared, student_email_info:student_email_info})
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

  selected_event(v, id){
      var all_courses = this.state.all_courses
      var data = {'_id':id, event:v}
      EventEnrolled(data).then(function(r){





      }.bind(this))
      for(var i =0; i< this.state.all_courses.length; i++){

          if(id === all_courses[i]['_id']){
              all_courses[i]['message'] = true
              all_courses[i]['event_selected'] = v
              all_courses[i]['event_selected_at']= new Date()
              all_courses[i]['manage'] =  false
          }
      }

      this.setState({all_courses:all_courses })
  }
  _sObj(events, id){

      return Object.entries(events).map(([k, v], i) => {
          return(
              <span key={i} style={{fontSize:"1.6rem", color:"#555555"}} >
                  <Button outline style={{border:"1px solid", margin:"10px", color:"#000000"}} onClick={this.selected_event.bind(this, v, id)}>

                      {(v.gtr ==="Yes") ?(<span style={{paddingRight:"25px", fontWeight:"600"}}> GTR </span>):(null)}
                 <span > {moment(new Date(v.start_date)).format("DD MMM") } -  {moment(new Date(v.end_date)).format("DD MMM") }

                  <br/>
                     {v.start_time} - {v.end_time}   &nbsp; {v.time_zone}

                </span>
                </Button>


            </span>
          )
      })

  }
  manage_course(v){

      var all_courses = this.state.all_courses
      for(var i =0; i< this.state.all_courses.length; i++){
          if(v._id === all_courses[i]['_id']){
              all_courses[i]['manage'] = !all_courses[i]['manage']
          }else{
              all_courses[i]['manage'] =  false
          }
      }
      this.setState({all_courses:all_courses})
  }
  customer_email(values){

      var data = {values:values, 'id':this.props.auth.auth.user.id}
      UpdateStudentInfo(data).then(function(r){



          if(r['resp']['email']){
              this.setState({email_shared:true, thanks_update:true})
          }

      }.bind(this))

  }
  _rObj(){
      return Object.entries(this.state.all_courses).map(([k, v], i) => {
          var basic="BASIC"
          var labels=[];
          if(v.new_categories){
              for(var x=0; x<v.new_categories.length; x++){
                  if(v.new_categories[x]){
                      labels.push(v.new_categories[x])
                  }

              }
          }else{
              for(var x=0; x<v.categories.length; x++){
                  if(v.categories[x]){
                      labels.push(v.categories[x])
                }
              }

          }

          for(var x=0; x<5; x++){
              if(labels[x]===undefined){
                  labels.push('...')
              }
         }
        


          return(
              <div key={i} style={{color:"#000", background:"#ffffff", padding:"10px ", border:"1px solid rgb(216 216 216)", margin:"10px 0px", fontWeight:"400"}}>
                  <Row>
                      <Col xs="2" sm="2" lg="2" style={{padding:"0 20px"}} >
                          <img src={v.image_link} style={{width:"100px"}} />
                      </Col>
                      <Col xs="8" sm="8" lg="8" style={{padding:"5px"}}  >
                          <div style={{width:"100%", padding:"5px"}}>
                              {v.name}
                              {v.event_selected_at ?(<div style={{fontSize:"1.7rem", paddingTop:"10px", color:"#888888"}}>
                                  {v.message?(<span style={{padding:"20px", textAlign:"center"}}  >  Your slot details:  </span>):(null)}
                                  {(v.event_selected.gtr ==="Yes") ?(<span style={{paddingRight:"25px", fontWeight:"600"}}> GTR </span>):(null)}
                                  <span > {moment(new Date(v.event_selected.start_date)).format("DD MMM") } -  {moment(new Date(v.event_selected.end_date)).format("DD MMM") }


                                      &nbsp;  &nbsp;  {v.event_selected.start_time} - {v.event_selected.end_time}   &nbsp; {v.event_selected.time_zone}

                                 </span>
                                 {(this.props.auth.auth.user.profile.email || this.state.student_email_info || this.state.email_shared) ?(<div >
                                     <div style={{display:"none"}}>
                                         <CustomerEmail />

                                     </div>
                                 </div>):(<div style={{width:"100%",  color:"#000000",  paddingTop:"30px", fontWeight:"400"}}>
                                     Please share your Email ID to receive Invoice/Receipt  and the course confirmaiton details

                                      <CustomerEmail   onSubmit={this.customer_email.bind(this)}  style={{background:"rgb(246 251 255)", padding:"20px",}}/>
                                 </div>
                                )}
                                {this.state.thanks_update?(<span> Thank you for updating your prodile </span>):(null)}

                             </div>):(null)}

                          </div>




                      </Col>
                      <Col xs="2" sm="2" lg="2" style={{padding:"5px"}} >

                          <div style={{ textAlign:"right", paddingRight:"10px"}} >
                              { v.event_selected_at ? (<div style={{ color:"#206eff", cursor:"pointer"}}>
                                  <span style={{fontSize:"1.5rem", verticalAlign:"middle", paddingTop:"10px"}}  onClick={this.manage_course.bind(this, v)} > Manage </span> <i className="icon-settings icons" style={{fontSize:"2.0rem", verticalAlign:"middle"}}/>

                              </div>):(null) }
                          </div>

                      </Col>
                      {v.event_selected_at ?(null):(<Col xs="12" sm="12" lg="12" style={{padding:"20px", textAlign:"center"}}  >
                           <div style={{width:"100%",  paddingLeft:"0px", fontSize:"1.8rem", textAlign:"left"}}>
                                <span style={{color:"#555555"}}> Please select the slot  </span>
                           </div>
                          <div style={{width:"100%",  padding:"5px", fontSize:"1.8rem", textAlign:"center"}}>

                               <span> {this._sObj(v.details.events, v._id)}
                                   {/* {moment(v.start_date).format("DD MMM") }  */}
                               </span>
                          </div>
                     </Col>)}
                     {v.manage ?( <Col xs="12" sm="12" lg="12" style={{padding:"20px", textAlign:"center"}}  >
                          <div style={{width:"100%",  paddingLeft:"0px", fontSize:"1.8rem", textAlign:"left"}}>
                               <span style={{color:"#555555"}}>Please select the slot </span>
                          </div>
                         <div style={{width:"100%",  padding:"5px", fontSize:"1.8rem", textAlign:"center"}}>

                              <span> {this._sObj(v.details.events, v._id)}
                                  {/* {moment(v.start_date).format("DD MMM") }  */}
                              </span>
                         </div>
                    </Col>

                     ):(null)}



                     <Col xs="12" sm="12" lg="12" style={{padding:"10px 20px 30px 20px", textAlign:"center"}}  >
                          <div style={{width:"100%",  paddingLeft:"0px", fontSize:"1.8rem", textAlign:"left"}}>
                               <span style={{color:"#999999"}}> Learning Path</span>
                          </div>
                         <div style={{width:"100%",  padding:"5px", fontSize:"1.8rem", textAlign:"center"}}>
                             <div>
                                 <div className="mermaid" style={{background:"rgb(243 243 243)",    padding: "10px",     border: "1px solid #d6d6d6", fontSize:"25px !important"}}>
                                     graph LR;
                                         id1({labels[0].toUpperCase()})-->id2({labels[1].toUpperCase()})-.->id3({labels[2].toUpperCase()})-.->id4({labels[3].toUpperCase()});
                                         id3({labels[2].toUpperCase()})-.->id5({labels[4].toUpperCase()});
                                             click id1 "/" "This is a link";
                                             style id1  fill:#fff,stroke-width:2px,color:#000,fontSize:16px,font-weight:500,line-height:1px;
                                             click id2 "/" "This is a link";
                                             style id2  fill:#fff,stroke-width:2px,color:#000,fontSize:16px,font-weight:500;
                                             click id3 "/" "This is a link";
                                             style id3  fill:#fff,stroke-width:2px,color:#000,fontSize:16px,font-weight:500;
                                             click id4 "/" "This is a link";
                                             style id4  fill:#fff,stroke-width:2px,color:#000,fontSize:16px,font-weight:500;
                                             click id5 "/" "This is a link";
                                             style id5  fill:#fff,stroke-width:2px,color:#000,fontSize:16px,font-weight:500;

                                 </div>



</div>

                         </div>
                    </Col>


                  </Row>

              </div>
          )
      })
  }


  render() {

      mermaid.contentLoaded()

    if(!this.props.auth.auth.isAuthenticated){

      this.props.history.push('/login'+this.props.match.url)
      return(
        <div> </div>
      )

    }


        return(<div style={{background:"#fefefe"}}>
            <Helmet>
              <title>  |  Student page </title>


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


              <div style={{width:"100%",padding:'20px',  textAlign:"left",  minHeight:"1200px"}}>


                  <Row style={{width:"100%", fontSize:"2.3rem", letterSpacing:"1px",  color:"#777777", margin:"0"}}>
                      <Col xs="4" sm="4" lg="4" style={{padding:"20px"}} >
                          <Card style={dash_box_to_do}>
                             Courses To Do <br/>
                             <div style={{width:"100%"}}>
                                 <div style={{width:"50%", float:"left", textAlign:"right", padding:"0 10px 0 0"}}> <i className="icon-graduation icons  d-block " style={{fontSize:"7.0rem",  color:"rgb(255 96 0)", paddingTop:"10px"}}> </i> </div>
                                 <div style={{width:"50%", fontSize:"4.0rem", color:"rgb(255 96 0)", float:"left", textAlign:"left", padding:"20px 0 0 10px"}}> {this.state.all_courses.length}  </div>

                             </div>

                          </Card>


                      </Col>
                      <Col xs="4" sm="4" lg="4" style={{padding:"20px"}} >
                          <Card style={dash_box_due}>
                             Overdue Courses <br/>
                             <i className="icon-clock icons  " style={{fontSize:"5.5rem", color:"rgb(0 112 255)", paddingTop:"20px"}} ></i>
                          </Card>


                      </Col>
                      <Col xs="4" sm="4" lg="4" style={{padding:"20px"}} >
                          <Card style={dash_box_complete}>

                             Completed Courses <br/>
                             <i className="icon-badge icons  d-block " style={{fontSize:"6.5rem", color:"rgb(0 142 31)", paddingTop:"15px"}} ></i>
                          </Card>


                      </Col>
                 </Row>

                   <Row style={{width:"100%", fontSize:"2.2rem", color:"#999999", margin:"0", paddingTop:"20px"}}>
                        Your enrolled courses
                  </Row>

                  <Row style={{width:"100%" , margin:"0"}}>
                      <Col xs="12" sm="12" lg="12" style={{padding:"10px"}} >
                          <Card style={textU}>
                              Upcoming Courses
                              {this._rObj()}
                          </Card>


                      </Col>
                      <Col xs="12" sm="12" lg="12" style={{padding:"10px", margin:"0"}} >
                          <Card style={textA}>
                             Active Courses
                          </Card>


                      </Col>
                      <Col xs="12" sm="12" lg="12" style={{padding:"10px", margin:"0"}} >
                         <Card style={textC}>
                             Competed Courses

                          </Card>

                      </Col>
                  </Row>

                </div>
                  </div>
              </Container>
          </main>




          </div>

      )

    }
}
function mapStateToProps(state) {
  return {
    auth: state
  };
}
export default connect(mapStateToProps) (NewPage);
