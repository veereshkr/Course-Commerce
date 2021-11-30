import React from 'react';
import {Container} from 'reactstrap';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from '../../components/Footer/';
import {register_student} from '../../actions/authActions'
import {Tasks, CourseDetails, MoreCourses} from '../../actions/authActions'
import {  Row, Col, Button, FormGroup, Input } from 'reactstrap'
import LoginForm from '../login/LoginFormStudent'
import 'bootstrap/dist/css/bootstrap.css';
import moment from 'moment'
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import {setCurrentUser} from '../../actions/authActions'
import { subscribeUser } from '../../subscription';
import CustomerNumber from './CustomerNumber'
import {Helmet} from "react-helmet";
import ReactGA from 'react-ga';
import Fuse from 'fuse.js/dist/fuse.min.js';
var pako = require('pako');


// Icons





class NewPage extends React.Component {
  constructor(props){
   super(props);
   subscribeUser(this.props.auth.auth.user.username)
   ReactGA.pageview('Main');
   var d = new Date();
 var n = d.getTimezoneOffset();



        this.state ={big_screen:true, language:'English', offset:n, allow_signup:false, otp:null, student_info:null, input:'', courses:[], test:'', start_date:[], end_date:[], new_courses:[], catSorted:[], filter_courses:[], sel_cat:0, start:null,
         end:null, search:'', s_r:null, course_details_view:false, detail_id:null, sel_index:null, viewCart:false, allCatSorted:[], similar_courses:[], course_description:'', skills_required:'', view_cart:false,cart:[], categories:[]}





   // if(this.props.auth.auth.isAuthenticated){
   //   this.props.history.push('/customer');
   //
   // }else{

     this.setState({test:'test'})
     if(this.props.auth.auth.isAuthenticated){
           this.props.history.push('/home');

       }else{

     Tasks().then(function(resp){

         var strData = atob(resp['courses']['base64']);

         var compressData = strData.split('').map(function(e) {
                return e.charCodeAt(0);
            });
            var binData = new Uint8Array(compressData);
            var d = pako.inflate(binData);

            d = String.fromCharCode.apply(null, new Uint16Array(d))
//             console.log(d)
//
//             d = d.replace(/\\n/g, "\\n")
//                .replace(/\\'/g, "\\'")
//                .replace(/\\"/g, '\\"')
//                .replace(/\\&/g, "\\&")
//                .replace(/\\r/g, "\\r")
//                .replace(/\\t/g, "\\t")
//                .replace(/\\b/g, "\\b")
//                .replace(/\\f/g, "\\f");
// // remove non-printable and other non-valid JSON chars
//          d = d.replace(/[\u0000-\u001F]+/g,"")
         var r = JSON.parse(d)

         var courses=this.state.courses, start_date=this.state.start_date, end_date=this.state.end_date, new_courses=this.state.new_courses, categories=this.state.categories

         for(var i=0; i<r.length; i++){
             var c = {name:r[i]['name'], start_date:r[i]['start_date'], end_date:r[i]['end_date']}
             courses.push(r[i]['name'])
             start_date.push(r[i]['start_date'])
             end_date.push(r[i]['end_date'])

             var cats = r[i]['categories']
             if(r[i]['new_categories']){
                 cats = r[i]['new_categories']
             }
             for(var c =0; c< cats.length; c++){
                 if(cats[c] in categories){
                     categories[cats[c]]++
                 }else{
                     categories[cats[c]] =1
                 }
             }

             var catSorted = Object.keys(categories).sort(function(a,b){return categories[b]-categories[a]})
             var d = moment(r[i]['end_date']).diff(moment(r[i]['start_date']), 'days')

             new_courses.push({_id:r[i]['_id'], name:r[i]['name'], start_date:moment(r[i]['start_date']).format("DD MMM"), end_date:moment(r[i]['end_date']).format("DD MMM"), price:r[i]['price_usd'], cats:cats,
             days:d+1, index:i, course_code:r[i]['course_code'], image_category:r[i]['image_category'], image_link:r[i]['image_link']})

         }

         this.setState({ test:'test', courses:courses , start_date:start_date, end_date:end_date, new_courses:new_courses, catSorted:catSorted, allCatSorted:catSorted, categories:categories})

     }.bind(this)).then(

         this.sleep(3000).then(()=>{

         MoreCourses().then(function(resp){


             var strData = atob(resp['courses']['base64']);

             var compressData = strData.split('').map(function(e) {
                    return e.charCodeAt(0);
                });
                var binData = new Uint8Array(compressData);
                var d = pako.inflate(binData);

                d = String.fromCharCode.apply(null, new Uint16Array(d))

             var r = JSON.parse(d)


             var courses=this.state.courses, start_date=this.state.start_date, end_date=this.state.end_date, new_courses=this.state.new_courses, categories=this.state.categories, courses_length= this.state.new_courses.length

             for(var i=0; i<r.length; i++){
                 var c = {name:r[i]['name'], start_date:r[i]['start_date'], end_date:r[i]['end_date']}
                 courses.push(r[i]['name'])
                 start_date.push(r[i]['start_date'])
                 end_date.push(r[i]['end_date'])

                 var cats = r[i]['categories']
                 if(r[i]['new_categories']){
                     cats = r[i]['new_categories']
                 }
                 for(var c =0; c< cats.length; c++){
                     if(cats[c] in categories){
                         categories[cats[c]]++
                     }else{
                         categories[cats[c]] =1
                     }
                 }

                 var catSorted = Object.keys(categories).sort(function(a,b){return categories[b]-categories[a]})
                 var d = moment(r[i]['end_date']).diff(moment(r[i]['start_date']), 'days')

                 new_courses.push({_id:r[i]['_id'], name:r[i]['name'], start_date:moment(r[i]['start_date']).format("DD MMM"), end_date:moment(r[i]['end_date']).format("DD MMM"), price:r[i]['price_usd'], cats:cats,
                 days:d+1, index:i+courses_length, course_code:r[i]['course_code'], image_category:r[i]['image_category'], image_link:r[i]['image_link']})

             }

             this.setState({ courses:courses , start_date:start_date, end_date:end_date, new_courses:new_courses, catSorted:catSorted, allCatSorted:catSorted, categories:categories})
        }.bind(this))
    }
        )

     )
   }
}

 sleep(ms) {

   return new Promise(resolve => setTimeout(resolve, ms));
 }
 // }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
      this.setState({big_screen: window.innerWidth > 760});
  }

  customer_number(values){
      var new_signup = true

      if(this.props.auth.auth.isAuthenticated && (this.props.auth.auth.user.profile.access_level ==='customer')){

        values['phone'] =  this.props.auth.auth.user.username
        values['name' ]=  this.props.auth.auth.user.profile.name

        values['user_authenticated'] = true
        new_signup = false
    }else{
        values['user_authenticated'] = false

    }
      values['direct_customer']=true
      var data ={cart:this.state.cart, student_info:values}



      register_student(data).then(function(resp){


          if(!this.props.auth.auth.isAuthenticated){
              this.setState({otp:"sent", student_info:values})
          }else{
              this.props.history.push('/student');
          }


      }.bind(this))


  }
 viewCart(id) {

  this.setState({viewCart:true})



}
  updateInput(v, evt) {

  var input =  this.state.input



}
updateSearch(evt) {

if(evt){
    var search = evt.target.value
    var search_result =null
    var categories =[]
}else{
    search =""
}


if((search !=='') && ( evt &&(search.length >1))){
    if(this.state.filter_courses.length >0){
        var Items = this.state.filter_courses
    }else{
        var Items = this.state.new_courses
    }


    var kvn = "name"
    var kvd = "cats"
    var cc ="course_code"

    const fuse = new Fuse(Items, {

                  keys: [kvn, kvd, cc]
                })
                //console.log('====', this.state.inputValue)


    var s_r = fuse.search(search)
    search_result=[]
    if(s_r[0]['item'].course_code=== search || s_r[0]['item'].name === search ){
        search_result.push(s_r[0]['item'])
    }else{
        for(var i=0; i< s_r.length; i++){
            search_result.push(s_r[i]['item'])


        }


        for(var r=0; r<s_r.length; r++){
            if(search_result[r]){
            var cats = search_result[r]['cats']
            for(var c =1; c< cats.length; c++){
                if(cats[c] in categories){
                    categories[cats[c]] += (cats.length -c) * (cats.length -c) *(s_r.length -r)
                }else{
                    categories[cats[c]] =1*(cats.length -c) *(cats.length -c) * (s_r.length -r)
                }
            }
            }
        }
    }

    console.log(categories)
    var catSorted = Object.keys(categories).sort(function(a,b){return categories[b]-categories[a]})

    this.setState({search:search, s_r:search_result, course_details_view:false, detail_id:null, sel_index:null, catSorted:catSorted,similar_courses:[]})

}else{
    search_result=null
    this.setState({search:search, s_r:search_result, course_details_view:false, detail_id:null, sel_index:null, catSorted:this.state.allCatSorted,similar_courses:[]})
}






}

  catPick(pos) {

  var n_c = this.state.new_courses
  var n_n_c =[]
  if(pos===0){
      if(this.state.course_details_view){

          this.setState({filter_courses:[], sel_cat:pos,similar_courses:[],course_details_view:null})
      }else{
          this.setState({filter_courses:[], sel_cat:'all',similar_courses:[]})
      }

  }else{
      for(var i=0; i<n_c.length; i++){

          if(n_c[i]['cats'].includes(this.state.catSorted[pos-1])){
              n_n_c.push(n_c[i])
          }
      }
      if(this.state.course_details_view){
          this.setState({filter_courses:n_n_c, sel_cat:pos, course_details_view:null})
     }else{
         this.setState({filter_courses:n_n_c, sel_cat:pos})
     }

  }






 }

  course_details(v, i){

        var course_description =''
        var cart = this.state.cart
        var categories =[]
        CourseDetails(v['_id']).then(function(resp){
            console.log(resp)
            this.setState({course_description:resp['course_details']['description'], skills_required:resp['course_details']['skills_required']})
        }.bind(this))
      var search_result =null
      if(this.state.filter_courses.length >0){
          var Items = this.state.filter_courses
      }else{
          var Items = this.state.new_courses
      }



      var kvd = "cats"

      const fuse = new Fuse(Items, {

                    keys: [ kvd]
                  })
                  //console.log('====', this.state.inputValue)


      var st=''
      for(var j=0; j<v['cats'].length; j++){
            st+=v['cats'][j]
      }
      var s_r = fuse.search(st)
      search_result=[]

      for(var k=0; k< s_r.length; k++){
          if(v['_id'] !== s_r[k]['item']['_id']){
              search_result.push(s_r[k]['item'])
          }



      }
      var id_exists= false
      for(var k=0; k<cart.length; k++){

          if(v['_id']===cart[k]['_id'] ){
              id_exists = true
          }

      }
      var catSorted = v['cats']
      if(!id_exists){
          cart.push({_id: v['_id'], index:v['index'], students:1, price:v['price']})

      }
      //this.setState({search:search, s_r:search_result, course_details_view:false, detail_id:null, sel_index:null, catSorted:catSorted})
      window.scrollTo(0, 0)

      this.setState({course_details_view:true, detail_id:v._id, sel_index:v['index'], catSorted:catSorted, similar_courses:search_result, cart:cart})

  }


  _cat(c){


          var courses =  this.state.new_courses

      return Object.entries(courses[c]['cats']).map(([k, v], i) => {
                  return(<span key={i} style={{paddingRight:"15px"}}> {v} </span>)
              });




  }
  clear(){

      this.setState({s_r:null, search:null})
  }

  dec(v){

      var cart = this.state.cart
      if(v['students'] >1){
      for(var i=0; i<this.state.cart.length; i++){
          if(this.state.cart[i]['_id']=== v['_id']){
              cart[i]['students']--
              cart[i]['price']-= this.state.new_courses[cart[i]['index']]['price']
          }
      }
      this.setState({cart:cart})
    }
  }

  inc(v){

      var cart = this.state.cart
      for(var i=0; i<this.state.cart.length; i++){
          if(this.state.cart[i]['_id']=== v['_id']){
              cart[i]['students']++
              cart[i]['price']+= this.state.new_courses[cart[i]['index']]['price']
          }
      }
      this.setState({cart:cart})
  }

  scrolly() {

    window.scrollTo(0, 0)


}

  sel_courses(){

      return Object.entries(this.state.cart).map(([k, v], i) => {
          var c = this.state.new_courses[v['index']]
          if(c['cats'].length > 2){
              if(c['image_category']){
                  var img_url = c['image_link']
              }else{
                  var img_url = "/category+images/small/"+c['cats'][1].replace(/\s/g, '')+".jpg"
              }



          }
          if(v['students']===1){
              var st_str = v['students'] + " student"
              var neg_color ="#bbbbbb"
          }else{
              st_str = v['students'] + " students"
              neg_color ="#000"
          }
          return(<div key={i} style={{width:'100%', float:"left", paddingTop:"20px"}}>
              <div style={{width:"50%",fontSize:"1.8rem", color:"#333333",  textAlign:"left", float:"left"}}>


              <object   data={img_url}  style={{  margin:"0 auto", padding:'2px 2px 2px 2px',  maxHeight:"40px", verticalAlign:"middle"}}>
                              <img   src={"/brand+images/small/"+c['cats'][0].replace(/\s/g, '')+"BrandImage.jpg"}  style={{ height:"40px", margin:"0 auto", padding:'2px 2px 2px 2px', verticalAlign:"middle"}}/>
                         </object> {c['name']}
              </div>
              <div style={{textAlign:'right', fontSize:"1.8rem", color:"#333333",  width:"30%", float:"left"}} >
                  {v.students > 1 ?(<Button color="link" size="lg"  style={{  marginTop:"-5px", fontSize:"2.2rem !important",  fontWeight:"700 !important", color:neg_color}} onClick={this.dec.bind(this, v)} ><span style={{fontSize:"2.2rem", fontWeight:"600"}}>  -  </span> </Button>):(null)}

                   <span style={{color:"#333333", padding:"0px 5px", marginTop:"-5px"}}> {st_str}  </span>
                   <Button color="link"    style={{  marginTop:"-5px", background:"#ffffff", fontSize:"2.2rem !important",  fontWeight:"700 !important", color:"#000"}} onClick={this.inc.bind(this, v)}>
                       <span style={{fontSize:"2.2rem", fontWeight:"600"}}> + </span>
                   </Button>
              </div>
              <div style={{textAlign:'right', fontSize:"1.8rem", color:"#333333",   float:"left", width:"20%"}} >
                   {v['price']} USD
              </div>

          </div>)
      })
  }
 _rObj(par){
     const icon = {padding:'15px', fontSize:"4.0rem", color:"rgb(96, 96,266)", border:"1px solid #bbbbbb", borderRadius:"50px", background:"#eee", cursor:"pointer"}
     const item_name = {width:"100%", fontSize:"1.8rem", paddingTop:"20px", color:"#333333", fontWeight:"500", minHeight:"75px",cursor:"pointer", overflow:"hidden" ,textOverflow: "ellipsis", display: "-webkit-box",  WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2 }
     const item_desc = {width:"100%", fontSize:"2.2rem", padding:"10px", color:"#888888", fontWeight:"400"}
     const item_col ={padding:"10px 10px 40px 10px" }
     const item_col_s ={padding:"20px 20px"}
     const row_courses = {width:"90%" , background:"#fff", borderRadius:"10px", margin:"0 auto", padding:"40px 20px 20px 20px"}
     const row_courses_s = {width:"100%" , background:"#fff", borderRadius:"5px", margin:"0px", padding:"30px 30px 30px 30px"}
     if(this.state.filter_courses.length >0){
         var cs = this.state.filter_courses

     }else{
         cs = this.state.new_courses
         if(this.state.s_r){

             cs = this.state.s_r
         }
     }

     if(par==='similar'){

         cs = this.state.similar_courses

         var n_c = this.state.new_courses
         var n_n_c =[]

         if(this.state.sel_cat){

             for(var i=0; i<n_c.length; i++){

                 if(n_c[i]['cats'].includes(this.state.catSorted[this.state.sel_cat-1])){
                     n_n_c.push(n_c[i])
                 }
             }
             cs =  n_n_c

             if(n_n_c.length ===0){

                 cs = n_c
             }
        }else{
            if(cs.length ===0){
                cs = n_c
            }

        }

     }

     return Object.entries(cs).map(([k, v], i) => {
         if(v.cats.length > 2){
            if(v['image_category']){
                 var img_url = v['image_link']
             }else{
                 var img_url = "/category+images/big/"+v['cats'][1].replace(/\s/g, '')+".jpg"
             }


         }


         return(
             <Col key={i} xs="4" sm="4" lg="4" xl="3"  style={item_col}>
                 <Row style={row_courses} onClick={this.course_details.bind(this, v, i)}  >
                 <div style={{width:"100%", minHeight:"150px"}}>
                     <object   data={img_url}  style={{ width:"100%", margin:"0 auto", padding:'2px 2px 2px 2px',  maxHeight:"140px", verticalAlign:"middle"}}>
                                     <img   src={"/brand+images/big/"+v['cats'][0].replace(/\s/g, '')+"BrandImage.jpg"}  style={{ width:"100%", margin:"0 auto", padding:'2px 2px 2px 2px', maxHeight:"140px", verticalAlign:"middle"}}/>
                                </object>

                 </div>
                 <div style={item_name}>
                     {v.name}
                 </div>
                 <div style={item_desc}>
                     {v.days}
                     {v.days===1?(<span> day</span>):(<span> days</span>)}
                 </div>
                 {/* <div style={item_desc}>
                    <div style={{width:"50%", float:"left", textAlign:"right", paddingRight:"40px"}}>
                        {v.start_date}
                    </div>
                    <div style={{width:"50%", float:"left", textAlign:"left", paddingLeft:"40px"}}>
                        {v.end_date}
                    </div>
                 </div> */}
                 <div style={{width:"100%", fontSize:"1.8rem", paddingTop:"10px", color:"#333333", fontWeight:"500"}}>
                     <del style={{paddingRight:"15px", color:"rgb(220, 20, 60)"}}>{v.price} USD</del> {parseInt(v.price *(70/100), 10)} USD
                 </div>
                 <div style={item_name}>
                     <Button outline color="secondary" onClick={this.course_details.bind(this, v, i)} > Learn More </Button>
                 </div>
                 </Row>

             </Col>

         )

     })
}


_rObj_m(par){
    const icon = {padding:'15px', fontSize:"4.0rem", color:"rgb(96, 96,266)", border:"1px solid #bbbbbb", borderRadius:"50px", background:"#eee", cursor:"pointer"}
    const item_name = {width:"100%", fontSize:"1.8rem", paddingTop:"20px", color:"#333333", fontWeight:"500", minHeight:"75px",cursor:"pointer", overflow:"hidden" ,textOverflow: "ellipsis", display: "-webkit-box",  WebkitBoxOrient: 'vertical',
   WebkitLineClamp: 2 }
    const item_desc = {width:"100%", fontSize:"2.2rem", padding:"10px", color:"#888888", fontWeight:"400"}
    const item_col ={padding:"10px 10px 40px 10px" }
    const item_col_s ={padding:"20px 20px"}
    const row_courses = {width:"90%" , background:"#fff", borderRadius:"10px", margin:"0 auto", padding:"40px 20px 20px 20px"}
    const row_courses_s = {width:"100%" , background:"#fff", borderRadius:"5px", margin:"0px", padding:"30px 30px 30px 30px"}
    if(this.state.filter_courses.length >0){
        var cs = this.state.filter_courses

    }else{
        cs = this.state.new_courses
        if(this.state.s_r){

            cs = this.state.s_r
        }
    }

    if(par==='similar'){

        cs = this.state.similar_courses

        var n_c = this.state.new_courses
        var n_n_c =[]

        if(this.state.sel_cat){

            for(var i=0; i<n_c.length; i++){

                if(n_c[i]['cats'].includes(this.state.catSorted[this.state.sel_cat-1])){
                    n_n_c.push(n_c[i])
                }
            }
            cs =  n_n_c

            if(n_n_c.length ===0){

                cs = n_c
            }
       }else{
           if(cs.length ===0){
               cs = n_c
           }

       }

    }

    return Object.entries(cs).map(([k, v], i) => {
        if(v.cats.length > 2){
           if(v['image_category']){
                var img_url = v['image_link']
            }else{
                var img_url = "/category+images/big/"+v['cats'][1].replace(/\s/g, '')+".jpg"
            }


        }

        return(
            <Col key={i} xs="12" sm="12" lg="12" style={item_col}>
                <Row style={row_courses} onClick={this.course_details.bind(this, v, i)}  >
                <div style={{width:"100%", minHeight:"150px"}}>
                    <object   data={img_url}  style={{ width:"100%", margin:"0 auto", padding:'2px 2px 2px 2px',  maxHeight:"140px", verticalAlign:"middle"}}>
                                    <img   src={"/brand+images/big/"+v['cats'][0].replace(/\s/g, '')+"BrandImage.jpg"}  style={{ width:"100%", margin:"0 auto", padding:'2px 2px 2px 2px', maxHeight:"140px", verticalAlign:"middle"}}/>
                               </object>

                </div>
                <div style={item_name}>
                    {v.name}
                </div>
                <div style={item_desc}>
                    {v.days}
                    {v.days===1?(<span> day</span>):(<span> days</span>)}
                </div>
                {/* <div style={item_desc}>
                   <div style={{width:"50%", float:"left", textAlign:"right", paddingRight:"40px"}}>
                       {v.start_date}
                   </div>
                   <div style={{width:"50%", float:"left", textAlign:"left", paddingLeft:"40px"}}>
                       {v.end_date}
                   </div>
                </div> */}
                <div style={{width:"100%", fontSize:"1.4rem", paddingTop:"10px", color:"#333333", fontWeight:"500"}}>
                    <del style={{paddingRight:"15px", color:"rgb(220, 20, 60)"}}>{v.price} USD</del> {parseInt(v.price *(70/100), 10)} USD
                </div>
                <div style={item_name}>
                    <Button outline color="secondary" onClick={this.course_details.bind(this, v, i)} > Learn More </Button>
                </div>
                </Row>


            </Col>

        )

    })
}



  render() {
      const settings = {

          infinite: true,
          speed: 500,
          arrows: false,
          vertical: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          fadein:true,
          speed: 1000,
          autoplaySpeed: 10000,
          cssEase: "linear",
    };
    const icon = {padding:'15px', fontSize:"4.0rem", color:"rgb(96, 96,266)", border:"1px solid #bbbbbb", borderRadius:"50px", background:"#eee"}
    const item_name = {width:"100%", fontSize:"1.8rem", paddingTop:"20px", color:"#333333", fontWeight:"500",cursor:"pointer"}
    const item_desc = {width:"100%", fontSize:"1.4rem", padding:"20px", color:"#666666", fontWeight:"400"}
    const item_col ={padding:"40px 20px"}
    const item_col_s ={padding:"20px 20px"}
    const row_courses = {width:"90%" , background:"#fff", borderRadius:"10px", margin:"10px", padding:"30px 20px 20px 20px"}
    const row_courses_s = {width:"100%" , background:"#fff", borderRadius:"5px", margin:"0px", padding:"30px 30px 30px 30px"}
    const catStyle ={padding:"10px 0 0 20px", color:"rgb(0 43 109)", cursor:"pointer"}
    const catStyleSel = {padding:"10px 0 0 20px", color:"#888", cursor:"pointer"}
    var st =  [catStyle, catStyle, catStyle,catStyle,catStyle,catStyle,catStyle]

    st[this.state.sel_cat] = catStyleSel

    //console.log(auth_data.locations[selected_loc].name,selected_loc



    if(this.state.big_screen){


      return (
          <div  >
            <Helmet>
              <title>  |  Main page </title>
            </Helmet>
            <div style={{ width:"100%",  width:"100%",position:'fixed',  height:"64px", top:'0', textAlign:'center', verticalAlign:"middle" , zIndex:"999", padding:"0px 0px 0px 0px", marginRight:"10px", boxShadow:"0px 1px 4px 0px rgba(0,0,0,0.2)", background:"#ffffff" }}>

                <div style={{ width:"40%", textAlign:"left", float:"left"}}>

                    <h2 height="80px"  style={{padding:'2px 2px 2px 0px', margin:"5px 5px 0px 15px"}}> <img src="/img/_logo.png"
                    onClick={this.clear.bind(this)}   style={{height:"50px", cursor:"pointer"}}/></h2>
               </div>
                <div style={{ width:"60%", float:"left", height:"64px", textAlign:'right',alignItems:"center", display:"flex",justifyContent:"flex-end", padding:'2px 25px 2px 2px' }}> <b style={{fontSize:"1.5rem" }}>

                      {this.props.auth.auth.user.username ?(<span style={{paddingRight:"10px"}}> {this.props.auth.auth.user.profile.name} <i  className="fa fa-bars fa-lg" style={{paddingLeft:"10px"}}></i> </span>):(null)}

               </b>
              </div>


          </div>
          <div style={{width:"100%",padding:'0px',  textAlign:"center", overflowX: "hidden"}}>



              <Row style={{width:"100%", marginTop:"80px",height:"100px"}}>
                  <Col xs="12" sm="12" lg="12" style={{padding:"20px 0 0 0"}} >

                          <FormGroup style={{paddingLeft:"20px", width:"700px", margin:"0 auto"}}>


                                              <div stule={{width:"100%", padding:"10px"}}>
                                                  <div style={{width:"100%", border:"1px solid #888888", margin:"0", display:"flex", background:"#fff"}}>
                                                      <div style={{width:"95%", float:"left"}}>
                                                      <Input
                                                       type="search"
                                                       name="search"
                                                       id="exampleSearch"
                                                       value={ this.state.search || ""}
                                                       placeholder="Search"
                                                       style={{border:"1px solid #fff", boxShadow:"none"}}
                                                       onChange={evt => this.updateSearch(evt)}

                                                   /> </div>
                                                     <div onClick={evt => this.updateSearch(null)} style={{width:"5%", float:"left", marginTop:"7px", color:"rgb(154 154 154);", cursor:"pointer"}}>
                                                         {((this.state.search) && (this.state.search.length > 1)) ?(<span >X</span>):(null)}
                                                     </div>
                                                 </div>
                                                 {/* <div style={{width:"10%", float:"left", color:"#666666", paddingLeft:"2px"}}>
                                                      <i class="fa fa-eraser fa-lg mt-4">clear </i>
                                                 </div> */}

                                          </div>





                                           </FormGroup>




                </Col>
                <Col xs="12" sm="12" lg="12"  style={{width:"100%", padding:"0", textAlign:"center"}}>
                    <div style={{width:"700px",  margin:"0 auto"}}>
                    <div style={{ width:"100%", padding:"0px 0px 0 30px", fontWeight:"500", fontSize:"1.6rem", color:"#999999", textAlign:"left"}} >

                            <span onClick={this.catPick.bind(this, 0)} style={st[0]}> All </span>
                            <span onClick={this.catPick.bind(this, 1)} style={st[1]}> { this.state.catSorted[0]}</span>
                            <span onClick={this.catPick.bind(this, 2)} style={st[2]}> { this.state.catSorted[1]}</span>
                            <span onClick={this.catPick.bind(this, 3)} style={st[3]}> { this.state.catSorted[2]}</span>
                            <span onClick={this.catPick.bind(this, 4)} style={st[4]} > { this.state.catSorted[3]}</span>
                            <span onClick={this.catPick.bind(this, 5)} style={st[5]}> { this.state.catSorted[4]}</span>
                            <span onClick={this.catPick.bind(this, 6)} style={st[6]}> { this.state.catSorted[5]}</span>

                    </div>
                    </div>
                </Col>

                {/* <Col xs="2" sm="2" lg="2" style={{padding:"20px"}} >
                    <FormGroup style={{paddingLeft:"20px"}}>

                                       <Input
                                         type="search"
                                         name="search"
                                         id="exampleSearch"
                                         value={ this.state.start || ""}
                                         placeholder="From"
                                         onChange={evt => this.updateInput(evt)}
                                       />
                                     </FormGroup>
                </Col>
                <Col xs="2" sm="2" lg="2" style={{padding:"20px"}}>
                    <FormGroup style={{paddingLeft:"20px"}}>

                                       <Input
                                         type="search"
                                         name="search"
                                         id="exampleSearch"
                                         value={ this.state.end || ""}
                                         placeholder="To"
                                         onChange={evt => this.updateInput(evt)}
                                       />
                                     </FormGroup>
                </Col> */}


            </Row>



       {/* <Slider {...settings}  style={{marginTop:"-150px", color:"#bbb",  fontWeight:"600", letterSpacing: "1px" }} >
         <div>
           <h3 style={{fontSize: "2.5rem",  padding:"50px 0", textTransform:"uppercase"}}> Virtual Classes Made for you  </h3>
         </div>
         <div>
           <h3 style={{fontSize: "2.5rem",  padding:"50px 0", textTransform:"uppercase"}}> Book through  and Save Money </h3>
         </div>
         <div>
           <h3 style={{fontSize: "2.5rem",  padding:"50px 0", textTransform:"uppercase"}}>  </h3>
         </div>


       </Slider> */}
   </div>



   <div style={{width:"100%", padding: "0px",textAlign:"center", height:"500px"}}>
       <Row style={{margin:"0px 10px", minHeight:"500px" }}>
           <Col xs="12" sm="12" lg="12" style={{width:"100%", fontSize:"2.5rem", padding:"0px", color:"#aaaaaa", fontWeight:"500", textAlign:"left", paddingLeft:"50px"}}>
               {this.state.viewCart?(<span> </span>):(<span>Courses</span>)}

           </Col>

           {this.state.course_details_view?(<Col xs="12" sm="12" lg="12" style={{width:"100%", fontSize:"2.8rem", padding:"20px 0px", color:"#000000", fontWeight:"500"}}>
               {this.state.viewCart ?
                   (
                       <div style={{width:"95%", minHeight:"500px",borderRadius:"10px", margin:"0 auto", background:"#fff", paddingTop:"20px"}}>

                   <div style={{width:"100%", textAlign:"left", padding:"20px", fontSize:"1.8rem", color:"#888888"}}>
                       {(this.state.otp==='sent') && (!this.props.auth.auth.isAuthenticated) ?(
                           <div style={{textAlign:'left', maxWidth:"500px"}}> We have sent an SMS to  {this.state.student_info.phone}  <br/>
                                <LoginForm initialValues={this.state.student_info}  style={{background:'#e6e6e6'}}/>
                            </div>
                       ):(<div style={{textAlign:'left', maxWidth:"100%"}}>
                            {(this.props.auth.auth.isAuthenticated)?(
                                <div style={{width:"100%", textAlign:"center"}}>
                                    <Button   style={{ background:"rgb(220, 20, 60)",   borderColor:"rgb(220, 20, 60)"}}
                                                      onClick={this.customer_number.bind(this)}   disabled={this.state.disabled} size="lg" > Please Confirm  </Button>
                                </div>

                            ):(
                                <div style={{textAlign:'left', maxWidth:"500px"}}>
                                         Please share your phone number to proceed further <br/>


                                <CustomerNumber  language="English" onSubmit={this.customer_number.bind(this)} />
                                </div>
                            )}

                        </div>

                       )}


                   </div>
                   <div style={{width:"100%", textAlign:"left", padding:"10px", fontSize:"1.8rem", color:"#888888"}}>
                       <div style={{textAlign:'left', width:"100%"}}> Selected Courses </div> <br/>

                           {this.sel_courses(this)}




                   </div>
                  </div>

              ):(
               <Col  xs="12" sm="12" lg="12" style={{padding:"0px 20px"}}>
                   <Row style={{width:"100%" , background:"#fff", borderRadius:"10px", margin:"0 auto", padding:"30px 20px 20px 20px", minHeight:"500px"}}>
                     <Col  xs="3" sm="3" lg="3" style={{ textAlign:"left", padding:"20px 10px",  fontSize:"1.6rem", fontWeight:"400"}} >
                         <div syule={{width:"100%"}}>


                             {this.state.new_courses[this.state.sel_index]['image_category'] ?(
                                 <img src={"/category+images/big/"+this.state.new_courses[this.state.sel_index]['cats'][this.state.new_courses[this.state.sel_index]['image_category']].replace(/\s/g, '')+".jpg"} />
                             ):( <img src={"/brand+images/big/"+this.state.new_courses[this.state.sel_index]['cats'][0].replace(/\s/g, '')+"BrandImage.jpg"} />)}


                         </div>
                         <div syule={{width:"100%", textAlign:"left"}}>
                             <span style={{color:"#999999"}}> Skills Required:  </span><br/>
                             <ul>
                                 {this.state.skills_required ?(<div dangerouslySetInnerHTML={{__html: this.state.skills_required}}/>

                                 ):(<span>


                                 </span>)}

                             </ul>


                         </div>

                     </Col>

                      <Col  xs="6" sm="6" lg="6">
                   <div style={{width:"100%", fontSize:"2.8rem", padding:"20px", color:"#333333", fontWeight:"500", textAlign:"left"}}>
                       {this.state.new_courses[this.state.sel_index]['name']}

                   </div>

                   <div style={ {width:"100%", fontSize:"2.2rem", padding:"5px 20px", color:"#000000", fontWeight:"400", textAlign:"left"}}>

                         <span style={{color:"#999999"}}> Categories: </span>   {
                             this._cat(this.state.sel_index)
                         }

                   </div>



                   <div style={{width:"100%", textAlign:"left", padding:"20px", fontSize:"2.2rem", color:"#999999"}}> Course Description:
                      <div style={{fontSize:"1.6rem" , fontWeight:"400", paddingTop:'10px', color:"#000000"}}>

                        {this.state.course_description ?(<div dangerouslySetInnerHTML={{__html: this.state.course_description}}/>):(
                            <span>

                            </span>

                        )}



                    </div>

                   </div>
               </Col>
                <Col  xs="3" sm="3" lg="3" >
                    <div style={{width:"100%", textAlign:"center", paddingTop:"20px", fontSize:"2.5rem !important"}}>
                        <Button color="primary"  onClick={this.viewCart.bind(this, this.state.new_courses[this.state.sel_index]._id)} > <span style={{fontSize:"2.2rem" , letterSpacing:"1px"}}> Enroll </span>  </Button>


                    </div>
                    <div style={{width:"100%", fontSize:"2.4rem", padding:"5px 20px", color:"#333333", fontWeight:"500", textAlign:"center",paddingTop:"20px"}}>
                        <del style={{paddingRight:"15px", color:"rgb(220, 20, 60)"}}>{this.state.new_courses[this.state.sel_index]['price']} USD</del> {parseInt(this.state.new_courses[this.state.sel_index]['price'] *(70/100), 10)} USD
                    </div>
                    <div style={ {width:"100%", fontSize:"2.0rem", paddingTop:"10px", color:"#666666", fontWeight:"400", textAlign:"center"}}>

                          {this.state.new_courses[this.state.sel_index]['start_date']} &nbsp; -  &nbsp;

                           {this.state.new_courses[this.state.sel_index]['end_date']}

                    </div>

                </Col>

                   </Row>


               </Col>
                )}
                {this.state.viewCart?(null):(
                    <Row style={{width:"100%" , borderRadius:"10px", margin:"0 auto", padding:"30px 0px 20px 0px", minHeight:"500px"}}>
                        <Col  xs="12" sm="12" lg="12" style={{textAlign:"left", fontSize:"2.5rem",  color:"#aaaaaa", }}>

                            Similar Courses

                        </Col>
                        <Col  xs="12" sm="12" lg="12" style={{textAlign:"center", fontSize:"2.5rem",  color:"#aaaaaa", }}>


                            {this._rObj('similar')}
                        </Col>

                    </Row>
                )}

           </Col>):(<div style={{width:"100%"}}> {this._rObj()} </div>)}





       </Row>


       <div style={{width:"100%", fontSize:"1.6rem", color:"#999999",textAlign:"center", padding:"15px 15px"}}><a href="http://.com"></a> &copy; 2020  Inc</div>






  </div>



        </div>
      );
    }else{
      return (
          <div >

            <Helmet>
              <title>  |  Main page </title>
            </Helmet>
            <div style={{ width:"100%",  width:"100%",position:'fixed',  height:"64px", top:'0', textAlign:'center', verticalAlign:"middle" , zIndex:"999", padding:"0px 0px 0px 0px", marginRight:"10px", boxShadow:"0px 1px 4px 0px rgba(0,0,0,0.2)", background:"#ffffff" }}>

                <div style={{ width:"40%", textAlign:"left", float:"left"}}>

                    <h2 height="80px"  style={{padding:'2px 2px 2px 0px', margin:"5px 5px 0px 15px"}}> <img src="/img/_logo.png" onClick={this.clear.bind(this)}  style={{height:"50px", cursor:"pointer"}}/></h2>
               </div>
                <div style={{ width:"60%", float:"left", height:"64px", textAlign:'right',alignItems:"center", display:"flex",justifyContent:"flex-end", padding:'2px 25px 2px 2px' }}> <b style={{fontSize:"1.5rem" }}>
                  <span style={{paddingRight:"10px"}}>  </span>
               </b>
              </div>


          </div>


                    <div style={{width:"100%",padding:'0px',  textAlign:"center", overflowX: "hidden"}}>



                        <Row style={{width:"100%", margin:"0 auto", minHeight:"75px"}}>
                            <Col xs="12" sm="12" lg="12" style={{padding:"5px", marginTop:"80px", textAlign:"center"}} >

                                <FormGroup style={{padding:"0 10px",  margin:"0 auto"}}>

                                                   <Input
                                                     type="search"
                                                     name="search"
                                                     id="exampleSearch"
                                                     value={ this.state.input || ""}
                                                     placeholder="Search"
                                                     onChange={evt => this.updateInput(evt)}
                                                   />
                                                   <div style={{ width:"100%", padding:"5px 0px", fontWeight:"500", fontSize:"1.4rem", color:"#999999", textAlign:"left"}} >

                                                           <span onClick={this.catPick.bind(this, 0)} style={st[0]}> All </span>
                                                           <span onClick={this.catPick.bind(this, 1)} style={st[1]}> { this.state.catSorted[0]}</span>
                                                           <span onClick={this.catPick.bind(this, 2)} style={st[2]}> { this.state.catSorted[1]}</span>
                                                           <span onClick={this.catPick.bind(this, 3)} style={st[3]}> { this.state.catSorted[2]}</span>
                                                           <span onClick={this.catPick.bind(this, 4)} style={st[4]} > { this.state.catSorted[3]}</span>
                                                           <span onClick={this.catPick.bind(this, 5)} style={st[5]}> { this.state.catSorted[4]}</span>
                                                           <span onClick={this.catPick.bind(this, 6)} style={st[6]}> { this.state.catSorted[5]}</span>

                                                   </div>
                                                 </FormGroup>
                          </Col>
                          {/* <Col xs="6" sm="6" lg="6" style={{padding:"2px"}} >
                              <FormGroup style={{paddingLeft:"20px", marginBottom:"5px"}}>

                                                 <Input
                                                   type="search"
                                                   name="search"
                                                   id="exampleSearch"
                                                   value={ this.state.input || ""}
                                                   placeholder="From"
                                                   onChange={evt => this.updateInput(evt)}
                                                 />
                                               </FormGroup>
                          </Col>
                          <Col xs="6" sm="6" lg="6" style={{padding:"2px"}}>
                              <FormGroup style={{paddingRight:"20px", marginBottom:"5px"}}>

                                                 <Input
                                                   type="search"
                                                   name="search"
                                                   id="exampleSearch"
                                                   value={ this.state.input || ""}
                                                   placeholder="To"
                                                   onChange={evt => this.updateInput(evt)}
                                                 />
                                               </FormGroup>
                          </Col> */}
                      </Row>




             </div>





       <div style={{width:"100%", padding: "0px 0px",padding:'0', textAlign:"center", height:"500px"}}>
           <Row style={{margin:"0px" }}>
               <Col xs="12" sm="12" lg="12" style={{width:"100%", fontSize:"2.0rem", padding:"0 20px", color:"#aaaaaa", fontWeight:"500", textAlign:"left"}}>
                   Courses
               </Col>
               {this.state.course_details_view?(<Col xs="12" sm="12" lg="12" style={{width:"100%", fontSize:"2.8rem", padding:"2px 0px", color:"#000000", fontWeight:"500"}}>
                   {this.state.viewCart ?
                       (
                           <div style={{width:"95%", minHeight:"500px",borderRadius:"10px", margin:"0 auto", background:"#fff", paddingTop:"20px"}}>

                       <div style={{width:"100%", textAlign:"left", padding:"2px", fontSize:"1.8rem", color:"#888888"}}>
                           {(this.state.otp==='sent') && (!this.props.auth.auth.isAuthenticated) ?(
                               <div style={{textAlign:'left', maxWidth:"500px"}}> We have sent an SMS to  {this.state.student_info.phone}  <br/>
                                    <LoginForm initialValues={this.state.student_info}  style={{background:'#e6e6e6'}}/>
                                </div>
                           ):(<div style={{textAlign:'left', maxWidth:"100%"}}>
                                {(this.props.auth.auth.isAuthenticated)?(
                                    <div style={{width:"100%", textAlign:"center"}}>
                                        <Button   style={{ background:"rgb(220, 20, 60)",   borderColor:"rgb(220, 20, 60)"}}
                                                          onClick={this.customer_number.bind(this)}   disabled={this.state.disabled} size="lg" > Please Confirm  </Button>
                                    </div>

                                ):(
                                    <div style={{textAlign:'left', maxWidth:"500px"}}>
                                             Please share your phone number to proceed further <br/>


                                    <CustomerNumber  language="English" onSubmit={this.customer_number.bind(this)} />
                                    </div>
                                )}

                            </div>

                           )}


                       </div>
                       <div style={{width:"100%", textAlign:"left", padding:"1px", fontSize:"1.8rem", color:"#888888"}}>
                           <div style={{textAlign:'left', width:"100%"}}> Selected Courses </div> <br/>

                               {this.sel_courses(this)}




                       </div>
                      </div>

                  ):(
                   <Col  xs="12" sm="12" lg="12" style={{padding:"0px 2px"}}>
                       <Row style={{width:"100%" , background:"#fff", borderRadius:"1px", margin:"0 auto", padding:"3px 2px 2px 2px", minHeight:"500px"}}>
                         <Col  xs="12" sm="12" lg="12" style={{ textAlign:"left", padding:"2px 1px",  fontSize:"1.5rem", fontWeight:"400"}} >
                             <div syule={{width:"100%"}}>
                                 <img src={"/category+images/big/"+ this.state.new_courses[this.state.sel_index]['cats'][this.state.new_courses[this.state.sel_index]['image_category']].replace(/\s/g, '')+".jpg"} />

                             </div>
                             <div syule={{width:"100%", textAlign:"left"}}>
                                 <span style={{color:"#999999"}}> Skills Required:  </span><br/>
                                 <ul>
                                     {this.state.skills_required ?(<div dangerouslySetInnerHTML={{__html: this.state.skills_required}}/>

                                     ):(<span>


                                     </span>)}

                                 </ul>


                             </div>

                         </Col>

                          <Col  xs="12" sm="12" lg="12">
                       <div style={{width:"100%", fontSize:"2.2rem", padding:"2px", color:"#333333", fontWeight:"500", textAlign:"left"}}>
                           {this.state.new_courses[this.state.sel_index]['name']}

                       </div>

                       <div style={ {width:"100%", fontSize:"1.8rem", padding:"2px", color:"#000000", fontWeight:"400", textAlign:"left"}}>

                             <span style={{color:"#999999"}}> Categories: </span>   {
                                 this._cat(this.state.sel_index)
                             }

                       </div>



                       <div style={{width:"100%", textAlign:"left", padding:"2px", fontSize:"1.8rem", color:"#999999"}}> Course Description:
                          <div style={{fontSize:"1.6rem" , fontWeight:"400", paddingTop:'10px', color:"#000000"}}>

                            {this.state.course_description ?(<div dangerouslySetInnerHTML={{__html: this.state.course_description}}/>):(
                                <span>

                                </span>

                            )}



                        </div>

                       </div>
                   </Col>
                    <Col  xs="12" sm="12" lg="12" >
                        <div style={{width:"100%", textAlign:"center", paddingTop:"2px", fontSize:"2.5rem !important"}}>
                            <Button color="primary"  onClick={this.viewCart.bind(this, this.state.new_courses[this.state.sel_index]._id)} > <span style={{fontSize:"1.8rem" , letterSpacing:"1px"}}> Enroll </span>  </Button>


                        </div>
                        <div style={{width:"100%", fontSize:"1.8rem", padding:" 2px", color:"#333333", fontWeight:"500", textAlign:"center",paddingTop:"2px"}}>
                            <del style={{paddingRight:"1px", color:"rgb(220, 20, 60)"}}>{this.state.new_courses[this.state.sel_index]['price']} USD</del> {parseInt(this.state.new_courses[this.state.sel_index]['price'] *(70/100), 10)} USD
                        </div>
                        <div style={ {width:"100%", fontSize:"2.0rem", paddingTop:"1px", color:"#666666", fontWeight:"400", textAlign:"center"}}>

                              {this.state.new_courses[this.state.sel_index]['start_date']} &nbsp; &nbsp;

                               {this.state.new_courses[this.state.sel_index]['end_date']}

                        </div>

                    </Col>

                       </Row>


                   </Col>
                    )}
                    {this.state.viewCart?(null):(
                        <Row style={{width:"100%" , borderRadius:"10px", margin:"0 auto", padding:"3px 0px 2px 0px", minHeight:"500px"}}>
                            <Col  xs="12" sm="12" lg="12" style={{textAlign:"left", fontSize:"2.0rem",  color:"#aaaaaa", }}>

                                Similar Courses

                            </Col>
                            <Col  xs="12" sm="12" lg="12" style={{textAlign:"center", fontSize:"2.0rem",  color:"#aaaaaa", }}>


                                {this._rObj_m('similar')}
                            </Col>

                        </Row>
                    )}

               </Col>):(<div style={{width:"100%"}}> {this._rObj_m()} </div>)}
           </Row>





                </div>



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
