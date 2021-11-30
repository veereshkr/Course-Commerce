import React from 'react';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import {enroll} from '../../actions/authActions';
import 'bootstrap/dist/css/bootstrap.css';
import {  Row, Col, Card, Button} from 'reactstrap';
import { login } from '../../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import ReactToPrint from 'react-to-print';
import {Helmet} from "react-helmet";
import ReactGA from 'react-ga';
var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var days = ['Sun','Mon', 'Tues','Wed','Thu','Fri','Sat'];

// Icons

class Enroll extends React.Component {
  constructor(props){
   super(props);

   ReactGA.pageview('Enroll');
   this.state ={enroll_details:null, big_screen:true}
   var partial_url = '/enroll'
   if(this.props.match.url.indexOf(partial_url) > -1){
     var phone = this.props.match.url.split("/")[2];
     var short_id = this.props.match.url.split("/")[3];
     var access_code = this.props.match.url.split("/")[4];

   }
   if(this.props.auth.auth.isAuthenticated && this.props.auth.auth.user.profile.access_level==="student"){
       if(short_id){
          this.props.history.push("/student/"+short_id);
      }else{
          this.props.history.push("/student");
      }

   }else if(access_code && (access_code.length === 6)){
       if(short_id){
           var url ="/student/"+short_id
       }else{
           url ="/student"
       }

       var str  = phone
       str = str.substring(0, 3)+'-'+str.substring(3, 6)+'-'+str.substring(6, 10);
      this.state = {
         identifier: str,
         password: access_code,
         errors: {},
         isLoading: true, enroll_details:null, big_screen:true, items_only:false
       };

       this.props.login(this.state).then(

         (res) => {
             this.context.router.history.push(url)},

         (err) => {
             this.setState({ errors: err.response.data.errors, isLoading: false })
     }
       );
   }else{


   var data ={ phone:phone, short_id: short_id}
   enroll(data).then(function(resp){
       console.log(resp)
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



  enrollSettings (value) {
      this.setState({items_only:true})

}
  // _renderItems(items){
  //
  //     return Object.entries(items).map(([key, value], i) => {
  //         var options_addons=''
  //         var total_options_price = 0
  //         var unique_o_a ={}
  //         var skip_index =[], counter_index=[]
  //         if(value.option_details && (value.option_details.length >0)) {
  //             var ks =[]
  //             if(value.item_details_addons){
  //                 for (var a=0; a<value.item_details_addons.length; a++ ){
  //                     ks.push(Object.keys(value.item_details_addons[a])[0])
  //
  //                 }
  //
  //             }
  //
  //             for(var t=0; t<value.option_details.length; t++){
  //                 if(value.addon_details && (value.addon_details[t])){
  //                     for (var a=0; a<value.addon_details.length; a++){
  //                         var addons=''
  //                         if(value.addon_details[a]){
  //                             for(var l=0; l<value.addon_details[a].length; l++){
  //
  //                                 addons+=ks[value.addon_details[a][l]]+','
  //                             }
  //                         }
  //
  //                         if(value.item_details_options){
  //
  //                                 //options_addons += value.item_details_options[value.option_details[t]] + ' ('+addons.slice(0,-1) +')'
  //                                 if(value.first_level_options){
  //                                       var f_l_o = " "+ value.first_level_name+" "
  //                                       if(addons !==''){
  //                                           if(value.item_details_options[value.option_details[t]] + f_l_o +addons.slice(0,-1) in unique_o_a){
  //                                               unique_o_a[value.item_details_options[value.option_details[t]]+ f_l_o +addons.slice(0,-1)]['counter']+=1
  //                                               skip_index.push(t)
  //                                           }else{
  //                                               unique_o_a[value.item_details_options[value.option_details[t]]+ f_l_o +addons.slice(0,-1)]={}
  //                                               unique_o_a[value.item_details_options[value.option_details[t]]+ f_l_o +addons.slice(0,-1)]['counter']=1
  //                                               unique_o_a[value.item_details_options[value.option_details[t]]+ f_l_o +addons.slice(0,-1)]['index']=t
  //                                           }
  //
  //                                           options_addons +=
  //
  //                                                 value.item_details_options[value.option_details[t]]+ f_l_o   +'(' + addons.slice(0,-1) +')' +'  \n'
  //                                       }else{
  //
  //                                               if(value.item_details_options[value.option_details[t]]+ f_l_o  in unique_o_a){
  //                                                   unique_o_a[value.item_details_options[value.option_details[t]]+ f_l_o ]['counter']+=1
  //                                                   skip_index.push(t)
  //                                               }else{
  //                                                   unique_o_a[value.item_details_options[value.option_details[t]]+ f_l_o ]={}
  //                                                   unique_o_a[value.item_details_options[value.option_details[t]]+ f_l_o ]['counter'] = 1
  //                                                   unique_o_a[value.item_details_options[value.option_details[t]]+ f_l_o ]['index'] = t
  //                                              }
  //                                               options_addons +=
  //
  //                                                     value.item_details_options[value.option_details[t]]+ f_l_o   +'  \n'
  //                                           }
  //                                       }else{
  //                                           if(addons !==''){
  //                                               if(value.item_details_options[value.option_details[t]]+addons.slice(0,-1) in unique_o_a){
  //                                                   unique_o_a[value.item_details_options[value.option_details[t]]+addons.slice(0,-1)]['counter']+=1
  //                                                   skip_index.push(t)
  //                                               }else{
  //                                                   unique_o_a[value.item_details_options[value.option_details[t]]+addons.slice(0,-1)]={}
  //                                                   unique_o_a[value.item_details_options[value.option_details[t]]+addons.slice(0,-1)]['counter']=1
  //                                                   unique_o_a[value.item_details_options[value.option_details[t]]+addons.slice(0,-1)]['index']=t
  //                                               }
  //
  //                                               options_addons +=
  //
  //                                                     value.item_details_options[value.option_details[t]]  +'(' + addons.slice(0,-1) +')' +'  \n'
  //                                           }else{
  //
  //                                                   if(value.item_details_options[value.option_details[t]] in unique_o_a){
  //                                                       unique_o_a[value.item_details_options[value.option_details[t]]]['counter']+=1
  //                                                       skip_index.push(t)
  //                                                   }else{
  //                                                       unique_o_a[value.item_details_options[value.option_details[t]]]={}
  //                                                       unique_o_a[value.item_details_options[value.option_details[t]]]['counter'] = 1
  //                                                       unique_o_a[value.item_details_options[value.option_details[t]]]['index'] = t
  //                                                  }
  //                                                   options_addons +=
  //
  //                                                         value.item_details_options[value.option_details[t]]  +'  \n'
  //                                               }
  //                                       }
  //
  //
  //                             }
  //
  //
  //                     }
  //                     if(value.first_level_options){
  //                             options_addons += value.first_level_name+" "
  //                    }
  //                 }else{
  //                     if(value.item_details_options){
  //
  //                         if(value.item_details_options){
  //                           if(value.first_level_options){
  //
  //                               var f_l_o = " "+ value.first_level_name+" "
  //                               if(value.item_details_options[value.option_details[t]]+  f_l_o in unique_o_a){
  //                                   unique_o_a[value.item_details_options[value.option_details[t]]+  f_l_o]['counter']+=1
  //                                   skip_index.push(t)
  //                               }else{
  //                                   unique_o_a[value.item_details_options[value.option_details[t]]+  f_l_o]={}
  //                                   unique_o_a[value.item_details_options[value.option_details[t]]+  f_l_o]['counter'] = 1
  //                                   unique_o_a[value.item_details_options[value.option_details[t]]+  f_l_o]['index'] = t
  //                              }
  //                               options_addons +=
  //
  //                                     value.item_details_options[value.option_details[t]] +  f_l_o +'  \n'
  //
  //                           }else{
  //
  //                           if(value.item_details_options[value.option_details[t]] in unique_o_a){
  //                               skip_index.push(t)
  //                               unique_o_a[value.item_details_options[value.option_details[t]]]['counter']+=1
  //                           }else{
  //                              unique_o_a[value.item_details_options[value.option_details[t]]]={}
  //                              unique_o_a[value.item_details_options[value.option_details[t]]]['counter'] = 1
  //                              unique_o_a[value.item_details_options[value.option_details[t]]]['index'] = t
  //                          }
  //                           options_addons +=
  //
  //                                 value.item_details_options[value.option_details[t]]  +'  \n'
  //
  //                           }
  //                       }
  //
  //
  //                     }
  //                 }
  //
  //
  //             }
  //
  //             for (var key in unique_o_a){
  //                 if(unique_o_a[key]['counter'] >1){
  //                     counter_index.push(unique_o_a[key]['counter'])
  //                 }else{
  //                     counter_index.push(1)
  //                 }
  //             }
  //
  //
  //             var s =0
  //             var options_adds= <div  style={{width:"100%", textAlign:"left",  display:"inline-block",fontWeight:"500"}}>
  //                 <i>{options_addons.split('\n').map(function(item, k=0) {
  //                     k++
  //
  //                        var addon_price =0
  //
  //                       if(item && value.option_prices && value.addon_details){
  //
  //                           if(value.addon_details[k-1].length >0){
  //                               for (var a=0; a<value.addon_details[k-1].length; a++ ){
  //                                   addon_price+= parseInt(Object.values(value.item_details_addons[value.addon_details[k-1][a]]), 10)
  //                               }
  //                           }
  //                       }
  //                       if(item){
  //                           if(value.option_prices){
  //                               total_options_price += value.option_prices[k-1]+addon_price
  //                           }
  //                           if(skip_index.includes(k)){
  //
  //                               s++
  //                               return null
  //                           }else{
  //
  //                               return (
  //                                 <span key={k} style={{width:"100%", textAlign:"left",   display:"inline-block"}}>
  //                                   <span style={{width:"100%", float:"left",paddingLeft:"5px"}}>
  //                                    {item}
  //
  //                                       {value.option_prices?(<span>{counter_index[k-s-1]} X {value.option_prices[k-1] + addon_price}</span>):(null)}
  //
  //
  //                                   </span>
  //
  //                                   <br/>
  //                               </span>
  //                               )
  //                           }
  //
  //                       }else{
  //                           return null
  //                       }
  //
  //
  //                   } )}
  //                 </i>
  //
  //             </div>
  //         }
  //
  //
  //
  //         return(<div key={i} style={{width:"100%", textAlign:"left", padding:"10px",  display:"inline-block"}}>
  //
  //             <div  style={{ float:"left", width:"25%", float:"left",background:"#ffffff"}} >
  //                 {this.state.big_screen ? (<object   data={'https://d1xushkgohl1ff.cloudfront.net/restaurants/'+this.state.enroll_details.property_id+'/items/normal/'+this.state.enroll_details.items[i]['item_number']+'.jpg'}  style={{ width:"100%", margin:"0 auto", padding:'2px 2px 2px 2px'}}>
  //                     <img   src="https://d1xushkgohl1ff.cloudfront.net/restaurants/spoon_fork.jpg"  style={{ width:"100%", margin:"0 auto", padding:'2px 2px 2px 2px'}}/>
  //
  //                 </object>):(null)}
  //
  //
  //            </div>
  //
  //
  //                <div style={{width:"60%", float:"left", padding:"0px 2px", fontSize:"1.8rem", fontWeight:"500"}}>
  //                    {value['item_number'] } - {value.name}
  //
  //                    {(options_adds!='' && (options_adds !== undefined))?(<div> {options_adds} </div>):(<div>{(value.option_name)?
  //                        (<span>  Options: <b>{value.option_name}  </b> </span>):(<span> {value.counter} X {value.prices} </span>)}
  //                    {(value.addon_name)?(<span> <br/> &nbsp; &nbsp; Addons: <b>{value.addon_name}  </b> </span>):(null)}</div>)}
  //                </div>
  //                <div  style={{width:"15%", float:"left", textAlign:"right"}}>
  //                    {(value.prices && (!value.option_details)) ?(<span>{value.prices* value.counter}</span>):(<span> {total_options_price?(<span> {total_options_price}</span>):(<span>-</span>)} </span>)}
  //
  //                </div>
  //
  //
  //
  //
  //
  //             {/* <div style={{width:"30%", float:"right", textAlign:"right", paddingRight:"20px"}}>
  //
  //                 {(value.prices && (!value.option_details)) ?(<span>{value.prices}</span>):(<span> {total_options_price?(<span> {total_options_price}</span>):(<span>-</span>)} </span>)}
  //            </div> */}
  //
  //
  //
  //         </div>)
  //     })
  // }


//   _renderObject(){
//       if(!this.state.enroll_details){
//           return(
//                  <Row className='indent' style={{ color:"#000",margin:"0px 20px 0px 20px", padding:"20px 0 20px 0",benroll:'1px solid #f6f6f6', fontSize:"1.5rem"}} >
//                        <Col xs="12" sm="12" lg="12">
//                            <i className="fa fa-spin fa-gear fa-lg mt-4" style={{fontSize:"3.0rem", color:"#ff6060"}}>  </i>
//
//                        </Col>
//                  </Row>
//                ) ;
//       }else{
//           var value = this.state.enroll_details
//           var enroll_date = String(value.enroll_time);
//
//           var year = parseInt(enroll_date.substring(0,4),10);
//
//           var month = parseInt(enroll_date.substring(5,7),10)-1;
//           var date = parseInt(enroll_date.substring(8,10),10);
//           var d = new Date(enroll_date)
//           let hour = d.getHours()
//           let min = d.getMinutes()
//
//           enroll_date = new Date(year, month, date);
//
//
//           var day = days[enroll_date.getDay()];
//           var date_string = day+' '+ date+ ' '+ months[month]+ ' '+year;
//           var newObject = {};
//           newObject.first = this.state.isHidden;
//           newObject.second = value;
//
//           var margin, fs, pd,padding, float, lfloat
//           if(!value.language){
//
//           }
//           var room_number = '', language='', contact='', email='', comment='', smiley_p ='😊', smiley_n='🙁', smiley=''
//           if(value.room_number){
//               room_number = value.room_number
//           }
//           if(value.language){
//               language = value.language
//           }
//
//           if(value.items){
//               comment = value.comment
//           }
//           if(this.state.enroll_details.student_info){
//               var phone_link = "tel:"+ this.state.enroll_details.student_info['phone']
//               if(this.state.enroll_details.student_info['gps']){
//                   var map_url = "https://maps.google.com/maps?q="+this.state.enroll_details.student_info['gps'].latitude+","+this.state.enroll_details.student_info['gps'].langitude
//               }
//           }
//
//
//           var short_enroll_id = this.state.enroll_details['_id'].substr( this.state.enroll_details['_id'].length - 2)
//           if(this.state.enroll_details.student_info && this.state.enroll_details.student_info['phone']){
//               var enroll_link = 'https://.com/enroll/'+ this.state.enroll_details.student_info['phone'].split('-').join('')+'/'+short_enroll_id
//
//           }else{
//               var enroll_link = 'https://.com/enroll/'
//
//           }
//           margin="0px 5px 0px 5px"
//           fs = "1.4rem"
//           pd = {padding:"10px 0 10px 0", textAlign:'center'}
//           padding = "15px 0 0px 0"
//           float="right"
//           lfloat="left"
//           if(this.state.big_screen){
//
//
//
//             return (
//                 <div  style={{width:"100%" , padding:padding, benroll:'2px solid #f6f6f6', margin: "15px 0px 15px 0px"}}>
//
//
//                <Row className='indent' style={{ color:"#000",margin:margin,
//                   fontSize:fs,cursor:"pointer"}}   >
//
//
//
//
//                    {/* <Col xs="1" sm="1" lg="1" style={pd}>
//
//
//                     <div> {value.language.toUpperCase()}</div>
//                    </Col> */}
//                    <Col xs="3" sm="3" lg="3"></Col>
//
//                    <Col xs="6" sm="6" lg="6" style={{backgroundColor: '#fff', padding:"10px", textAlign:'left'}}>
//
//
//                     <div style={{fontSize:"1.8rem", fontWeight:"600", paddingBottom:"10px"}}>{this.state.enroll_details.hotel_name} </div>
//                     <div> Enroll ID: <b style={{fontSize:"2.2rem"}}>{this.state.enroll_details['_id'].substr(0,3)}</b> </div>
//                    <div> {date_string} &nbsp; {hour}:{min}</div>
//                    {this.state.enroll_details.accept ?(<div><i style={{fontSize:"1.8rem"}}>Manager has <b> accepted </b> your enroll</i></div>):(<div> <i style={{fontSize:"1.5rem"}}> Please wait till manager accepts your enroll! </i></div>)}
//                    <br/>
//                      <b>Total Items:{value.item_counter}  <br/></b>
//                      {value.items ? (<span>
//
//                          {this._renderItems(value.items)}
//
//                      </span>):(<span> </span>)}
//
//                      {value.total_price?(<span style={{fontSize:"2.0rem", paddingBottom:"20px"}}> Total Price: {value.total_price}฿   <br/></span>):(null)}
//                      {this.state.enroll_details.student_info ?
//                          (<div style={{paddingBottom:"10px"}}>
//
//                               Delivery Method:
//                              {(this.state.enroll_details.student_info['delivery'] === 'h_d')?(<span><b> <i className="fa fa-motorcycle fa-lg mt-4"></i> Home Delivery  </b>  </span>):(null) }
//                              {(this.state.enroll_details.student_info['delivery'] === 'p_f_r')?(<span><b> Pick From Restaurant  </b> </span>):(null) }
//                              {(this.state.enroll_details.student_info['delivery'] === 'i_r_d')?(<span><b> In Restaurant Dining  </b> </span>):(null) }
//
//                              {/* {this.props.auth.auth.locations[this.props.auth.auth.selected].restaurant_info.address ?(<div>
//                                  {this.props.auth.auth.locations[this.props.auth.auth.selected].restaurant_info.address}
//                              </div>):null} */}
//
//                              <br/><br/>
//
//                              Customer Information: <br/>
//                              <a href={phone_link} style={{color:"rgb(220,20,60)", textDecoration:"none"}}> <b> <i className="fa fa-phone fa-lg mt-4"></i> {this.state.enroll_details.student_info['phone']} </b> </a> <br/>
//                              {(this.state.enroll_details.student_info['gps'])?(<span><b> <a style={{color:"rgb(220,20,60)", textDecoration:"none"}}
//                                  href= {map_url}  target="_blank" > <i className="fa fa-map-marker fa-lg mt-4"></i>  Customer Location </a>  </b> </span>):(null) }
//
//                              <br/><br/>
//
//                          </div>)
//
//
//                          :(null) }
//
//
//
//
//
//                    </Col>
//                    <Col xs="3" sm="3" lg="3"></Col>
//
//
//
//
//
//
//                </Row>
//
//
//
//            </div>
//              )
//       }else{
//           return (
//
//
//
//              <Row className='indent' style={{ backgroundColor: '#fff', color:"#000",margin:margin,
//                 fontSize:fs,cursor:"pointer", padding:"0px"}}   >
//
//
//
//
//                  {/* <Col xs="1" sm="1" lg="1" style={pd}>
//
//
//                   <div> {value.language.toUpperCase()}</div>
//                  </Col> */}
//
//
//                  <Col xs="12" sm="12" lg="12" style={{ padding:"10px", textAlign:'left', padding:"10px"}}>
//                      <div style={{fontSize:"1.8rem", fontWeight:"600", paddingBottom:"10px"}}>{this.state.enroll_details.hotel_name} </div>
//
//                      <Col xs="12" sm="12" lg="12" style={{fontSize:"2.2rem", padding:"10px 15px", margin:"0px", textAlign:"left", color:"#000"}}>
//                             <ReactToPrint style={{paddingRight:"15px",fontSize:"2.0rem" ,color:"#606060"}}  onClick={this.enrollSettings.bind(this )}
//                      trigger={() => <a href="#" style={{color:"#000", textDecoration:"none"}}> <i className="icon-printer icons fa-lg"  onClick={this.enrollSettings.bind(this)} ></i> </a>}
//                      content={() =>  this.state.print}
//                    />
//
//
//
//
//
//                         </Col>
//
//                      <div> Enroll ID: <b style={{fontSize:"1.8rem"}}>{this.state.enroll_details['_id'].substr(0,3)}</b> </div>
//                     <div> {date_string} &nbsp; {hour}:{min}</div> <br/>
//                     {this.state.enroll_details.accept ?(<div><i style={{fontSize:"1.5rem"}}>Manager has <b> accepted </b> your enroll</i></div>):(<div> <i style={{fontSize:"1.5rem"}}> Please wait till manager accepts your enroll! </i></div>)}
//                     <br/>
//                    <b>Total Items:{value.item_counter}  <br/></b>
//                    {value.items ? (
//
//                        <span ref={el => (this.state.print= el)} >
//
//                        {this._renderItems(value.items)}
//
//                    </span>):(<span> </span>)}
//
//                    {value.total_price?(<span style={{fontSize:"2.0rem", paddingBottom:"20px"}}> Total Price: {value.total_price}฿   <br/></span>):(null)}
//                    {this.state.enroll_details.student_info ?
//                        (<div style={{paddingBottom:"10px"}}>
//
//                             Delivery Method:
//                            {(this.state.enroll_details.student_info['delivery'] === 'h_d')?(<span><b> <i className="fa fa-motorcycle fa-lg mt-4"></i> Home Delivery  </b>  </span>):(null) }
//                            {(this.state.enroll_details.student_info['delivery'] === 'p_f_r')?(<span><b> Pick From Restaurant  </b> </span>):(null) }
//                            {(this.state.enroll_details.student_info['delivery'] === 'i_r_d')?(<span><b> In Restaurant Dining  </b> </span>):(null) }
//
//                            {/* {this.props.auth.auth.locations[this.props.auth.auth.selected].restaurant_info.address ?(<div>
//                                {this.props.auth.auth.locations[this.props.auth.auth.selected].restaurant_info.address}
//                            </div>):null} */}
//
//                            <br/><br/><br/>
//
//                            Customer Information: <br/>
//                            <a href={phone_link} style={{color:"rgb(220,20,60)", textDecoration:"none"}} > <b> <i className="fa fa-phone fa-lg mt-4"></i> {this.state.enroll_details.student_info['phone']} </b> </a> <br/>
//                            {(this.state.enroll_details.student_info['gps'])?(<span><b> <a
//                                href= {map_url}  target="_blank" style={{color:"rgb(220,20,60)", textDecoration:"none"}}> <i className="fa fa-map-marker fa-lg mt-4"></i>  Customer Location </a>  </b> </span>):(null) }
//
//                            <br/><br/>
//                        </div>)
//
//
//                        :(null) }
//
//
//
//
//
//                  </Col>
//
//
//
//
//
//
//
//              </Row>
//
//
//
//
//            )
//       }
//
//   }
// }



  render() {




    //console.log(auth_data.locations[selected_loc].name,selected_loc )
    if(this.state.big_screen){
      return (
          <div >
            <Helmet>
              <title>  - Enroll Information </title>
            </Helmet>

          <main className="main">

            <Container fluid style={{padding: "80px 30px"}}>
              <div className="animated fadeIn">
          <Row style={{paddingBottom:"20px"}}>
            <Col xs="12" sm="12" lg="12" >
              <Col xs="12" sm="6" lg="6" style={{fontSize: "2.0rem", fontWeight:"500", color:"rgb(220,20,60)" }}>
                Enroll Details
              </Col>

            </Col>
          </Row>
          <Row>
              <Col xs="12" sm="12" lg="12" style={{padding:"10px", fontSize:"3.0rem", textAlign:"center"}}>
                  {/* <i class="fa fa-exclamation-triangle fa-lg mt-4"></i> Work in progress... <br/> This link will be used by Delivery fleet. */}
              </Col>

            <Col xs="12" sm="12" lg="12">

              <Card   inverse style={{  benrollColor: '#eee', padding: "20px 0 20px 0" }} >

                     {/* {this._renderObject()} */}
              </Card>
            </Col>

          </Row>

            </div>
            </Container>
          </main>


        </div>
      );
    }else{
      return (
          <div >
            <Helmet>
              <title>   - Enroll Information </title>
            </Helmet>
            <main className="main">

              <Container fluid style={{padding: "20px 10px"}}>
                <div className="animated fadeIn">
            <Row style={{paddingBottom:"20px"}}>
              <Col xs="12" sm="12" lg="12" >
                <Col xs="12" sm="6" lg="6" style={{fontSize: "2.0rem", fontWeight:"500" , color:"rgb(220,20,60)" }}>
                  Enroll Details
                </Col>

              </Col>
            </Row>
            <Row style={{backgroundColor: '#fff', padding:"0px"}}>
                <Col xs="12" sm="12" lg="12" style={{padding:"10px", fontSize:"2.5rem", textAlign:"center"}}>

                    {/* <i class="fa fa-exclamation-triangle fa-lg mt-4"></i> Work in progress... <br/> This link will be used by Delivery fleet. */}
                </Col>
              <Col xs="12" sm="12" lg="12" style={{padding:"0px"}}>


                       {/* {this._renderObject()} */}

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
Enroll.propTypes = {
  login: PropTypes.func.isRequired
}

Enroll.contextTypes = {
  router: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state
  };
}
export default connect(mapStateToProps, { login }) (Enroll);
