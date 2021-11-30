import React from 'react';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import EngageData from './GetEngageData';
import 'bootstrap/dist/css/bootstrap.css';
import { Row, Col} from 'reactstrap';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import {setCurrentUser} from '../../actions/authActions'
import {Helmet} from "react-helmet";
import ReactGA from 'react-ga';
//ReactGA.initialize('UA-114233784-1');

// Icons





class NewPage extends React.Component {
  constructor(props){
   super(props);
   ReactGA.pageview('GuestList');
   this.state ={big_screen:true}
   if(!this.props.auth.auth.isAuthenticated){
     this.props.history.push('/login');

   }else{
     var partial_url = '/feedbacks'
     if(this.props.match.url.indexOf(partial_url) > -1){
       var location_name = this.props.match.url.split("/")[1]
       this.props.auth.auth.selected = 0
       for(var loc=0; loc< this.props.auth.auth.locations.length; loc++){
         if(location_name === this.props.auth.auth.locations[loc].name.replace(/\s/g,'')){
           this.props.auth.auth.selected = loc;
           this.setSelected(loc);

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

  setSelected(value) {

      localStorage.setItem('selectedLocation', value);
      setCurrentUser(jwtDecode(localStorage.jwtToken), JSON.parse(localStorage.locationInfo), value, null );
    }


  render() {
    if(!this.props.auth.auth.isAuthenticated){

      this.props.history.push('/login'+this.props.match.url)
      return(
        <div> </div>
      )

    }
    var auth_data = this.props.auth.auth;
    var selected_loc = this.props.auth.auth.selected;
    if(this.state.big_screen){
      return (
          <div >
            <Helmet>
              <title>  | {auth_data.locations[selected_loc].name} - GuestList </title>
            </Helmet>
          <Header />
          <Sidebar {...this.props} style={{ margin:'55px 0 0 0'}} />
          <main className="main">

            <Container fluid style={{padding: "80px 30px"}}>
              <div className="animated fadeIn">
          <Row style={{paddingBottom:"20px"}}>
            <Col xs="12" sm="12" lg="12" >
              <Col xs="12" sm="6" lg="6" style={{fontSize: "2.0rem", fontWeight:"500" }}>
                {auth_data.locations[selected_loc].name}
              </Col>
              <Col xs="12" sm="6" lg="6" style={{textAlign:"right", fontSize: "1.5rem",color:"#999999", fontWeight:"500" }}>
                Customer Engagement
              </Col>
            </Col>
          </Row>
          <EngageData />

        </div>
            </Container>
          </main>
          <Aside />
        <Footer />
        </div>
      );
    }else{
      return (
          <div >
            <Helmet>
              <title>  | {auth_data.locations[selected_loc].name} - GuestList </title>
            </Helmet>
          <Header />
          <Sidebar {...this.props} style={{ margin:'55px 0 0 0'}} />
          <main className="main">

            <Container fluid >
              <div className="animated fadeIn">
          <Row style={{padding: "70px 0 10px 0"}}>
            <Col  style={{fontSize: "1.8rem", fontWeight:"500" , padding:"0"}}>
              {auth_data.locations[selected_loc].name}
            </Col>
            <Col  style={{textAlign:"right", fontSize: "1.4rem",color:"#999999", fontWeight:"500", padding:"0" }}>
              Customer Engagement
            </Col>
          </Row>
          <EngageData />

        </div>
            </Container>
          </main>
          <Aside />
        <Footer />
        </div>
      );
    }
  }
}
function mapStateToProps(state) {
  return {
    auth: state
  };
}
export default connect(mapStateToProps) (NewPage);
