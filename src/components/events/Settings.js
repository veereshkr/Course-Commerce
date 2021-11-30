import React from 'react';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import {restaurant_menu} from '../../actions/authActions'
import {set_menu} from '../../actions/authActions'
import moment from 'moment'

import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col, Card, Button} from 'reactstrap';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import {setCurrentUser} from '../../actions/authActions'

import {Helmet} from "react-helmet";
import ReactGA from 'react-ga';
ReactGA.initialize('UA-124346448-2');
// Icons





class NewPage extends React.Component {
  constructor(props){
   super(props);
   ReactGA.pageview('SetMenu');
   this.state ={big_screen:true, items:[], available:[], set_by:{}, stars:2, happy:false, sad:true}
   if(!this.props.auth.auth.isAuthenticated){
     this.props.history.push('/login');

   }else{
     var partial_url = '/Settings'
     if(this.props.match.url.indexOf(partial_url) > -1){
       var lN = this.props.match.url.split("/")[1];
       this.props.auth.auth.selected = 0
       for(var l=0; l< this.props.auth.auth.locations.length; l++){
         if(lN.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() === this.props.auth.auth.locations[l].name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()){
           this.props.auth.auth.selected = l;
           this.setSelected(l);

         }
       }

     }


   }
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
      this.setState({big_screen: window.innerWidth > 760});
  }
  star_r(j){
      this.setState({stars:j})
      console.log(j)

 }
 happy(){
     console.log(this.state.happy)
     this.setState({happy:!this.state.happy})


}
sad(){
    console.log(this.state.sad)
    this.setState({sad:!this.state.sad})


}

    _renderObject(){

      return Object.entries(this.state.items).map(([key, value], i) => {
          return(
              <Row className='indent' style={{ color:"#000",margin:"0px 20px 0px 20px", padding:"20px 0 20px 0",border:'1px solid #f6f6f6', fontSize:"1.5rem"}} key={key}>
                    <Col xs="6" sm="6" lg="6">
                        {this.state.items[i]['name']}
                    </Col>
                    <Col xs="3" sm="3" lg="3" style={{ color:"#000", fontSize:"1.0rem"}}>
                        {this.state.items[i].set_by?(<span>Set At: {this.state.items[i].set_at_local_time} <br/>
                        Set By: {this.state.items[i].set_by}
                    </span> ):(null)}

                    </Col>
                    <Col xs="3" sm="3" lg="3">
                        {(this.state.available[i])?(<Button outline color="danger" onClick={this.s_m.bind(this,i)}> Not Available</Button>):(<Button style={{paddingLeft:"20px", paddingRight:"20px" }} outline color="success" onClick={this.s_m.bind(this,i)}>  Available</Button>)}
                    </Col>
              </Row>
          )
      })
   }

  render() {
    if(!this.props.auth.auth.isAuthenticated){

      this.props.history.push('/login'+this.props.match.url)
      return(
        <div> </div>
      )

    }
    var auth_data = this.props.auth.auth;
    var selected_loc = 0

    if(this.props.auth.auth.selected >= 0 ){
      selected_loc =this.props.auth.auth.selected
    };
    if(this.state.happy){
        var h_filter = "grayscale(0%)"
    }else{
        h_filter = "grayscale(100%)"
    }
    if(this.state.sad){
        var s_filter = "grayscale(0%)"
    }else{
        s_filter = "grayscale(100%)"
    }
    //console.log(auth_data.locations[selected_loc].name,selected_loc )
    var stars=[]
    for (var j = 0; j < 5; j++) {
        if(j>= this.state.stars){
            var c = "#0000ff"
        }else{
            c="#999999"
        }
       stars.push(<i className="fa fa-star fa-lg" style={{ fontSize: "2.2rem", fontWeight:"500", cursor: "pointer", color:c}} onClick={this.star_r.bind(this,j)} key={j}></i> )
    }
    if(this.state.big_screen){
      return (
          <div >
            <Helmet>
              <title>  | {auth_data.locations[selected_loc].name} - Settings </title>
            </Helmet>
          <Header />
          <Sidebar {...this.props} style={{ margin:'55px 0 0 0'}} />
          <main className="main">

            <Container fluid style={{padding: "80px 30px"}}>
              <div className="animated fadeIn">
          <Row style={{paddingBottom:"20px"}}>
            <Col xs="12" sm="12" lg="12" >
              <Col xs="4" sm="4" lg="4" style={{fontSize: "2.0rem", fontWeight:"500" }}>
                {auth_data.locations[selected_loc].name}
              </Col>
              <Col xs="8" sm="8" lg="8" style={{textAlign:"right", fontSize: "1.5rem",color:"#999999", fontWeight:"500" }}>
                Set your feedback and review notifications here
              </Col>
            </Col>
          </Row>
          <Row style={{padding: "70px 0px 10px 0px"}}>
            <Col  xs="6" sm="4" lg="4" style={{fontSize: "1.8rem", fontWeight:"500" , paddingLeft:"20px"}}>
              Review Notification
            </Col>
            <Col  xs="6" sm="8" lg="8" style={{textAlign:"left", fontSize: "1.4rem",color:"#999999", fontWeight:"500" , paddingLeft:"10px"}}>
                {stars} <br/>
              Receive notification for reviews with ratings {5-this.state.stars} stars and below
            </Col>
          </Row>
          <Row xs="6" sm="4" lg="4" style={{fontSize: "1.8rem", fontWeight:"500" , paddingLeft:"20px"}}>
            <Col  style={{fontSize: "1.8rem", fontWeight:"500" , padding:"0px"}}>
              Feedback Notification
            </Col>
            <Col  xs="6" sm="8" lg="8" style={{textAlign:"left", fontSize: "1.4rem",color:"#999999", fontWeight:"500" , paddingLeft:"10px"}}>
                <img onClick={this.happy.bind(this)} src="https://d1xushkgohl1ff.cloudfront.net/happy.png" width="64" height="64" alt="" style={{padding:"10px", filter: h_filter}} />
                <img onClick={this.sad.bind(this)} src="https://d1xushkgohl1ff.cloudfront.net/sad.png" width="64" height="64" alt="" style={{padding:"10px", filter: s_filter}} />

            </Col>
          </Row>
          <Row style={{padding: "70px 0px 10px 0px"}}>
            <Col  style={{fontSize: "1.8rem", fontWeight:"500" , padding:"0px"}}>
              Investigation
            </Col>
            <Col  style={{textAlign:"right", fontSize: "1.4rem",color:"#999999", fontWeight:"500" , padding:"0px"}}>
              ----
            </Col>
          </Row>
          <Row style={{padding: "70px 0px 10px 0px"}}>
            <Col  style={{fontSize: "1.8rem", fontWeight:"500" , padding:"0px"}}>
              Information requested by 
            </Col>
            <Col  style={{textAlign:"right", fontSize: "1.4rem",color:"#999999", fontWeight:"500" , padding:"0px"}}>
              ----
            </Col>
          </Row>
        </div>
            </Container>
          </main>
          <Aside />

        </div>
      );
    }else{
      return (
          <div >
            <Helmet>
              <title>  | {auth_data.locations[selected_loc].name} - Settings </title>
            </Helmet>
          <Header />
          <Sidebar {...this.props} style={{ margin:'55px 0 0 0'}} />
          <main className="main">

            <Container fluid >
              <div className="animated fadeIn">
          <Row style={{padding: "70px 0px 10px 0px"}}>
            <Col  style={{fontSize: "1.8rem", fontWeight:"500" , padding:"0px"}}>
              {auth_data.locations[selected_loc].name}
            </Col>
            <Col  style={{textAlign:"right", fontSize: "1.4rem",color:"#999999", fontWeight:"500" , padding:"0px"}}>
              Set your feedback and review notifications here
            </Col>
          </Row>



        </div>
            </Container>
          </main>
          <Aside />

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
