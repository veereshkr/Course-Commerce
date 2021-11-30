import React, {Component} from 'react';
import {
   DropdownItem, DropdownMenu, DropdownToggle, Nav, NavbarBrand, NavbarToggler, Dropdown, NavItem, NavLink
} from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';
const navColorWeight = {color:'#606060', fontWeight:'600',borderBottom:'0px solid #ffffff'}

class Header extends Component {
  logout(e) {

    e.preventDefault();
    console.log('All right, See you again!');
    this.props.logout();
  }


  constructor(props) {
    super(props);
    var selected;
    if(this.props.auth.selected !==null){
      selected = true
    }else{
      selected = false
    }
    this.props.auth.modal =false
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false, selected:selected, modalOpen:false, big_screen:true
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
      this.setState({big_screen: window.innerWidth > 760});
  }


  render() {

    return (
      <header className="app-header navbar" style={{borderBottom:'1px solid #bbbbbb'}}>
        <NavbarToggler style={navColorWeight} className="d-lg-none" onClick={this.mobileSidebarToggle}>
          {this.state.selected ? (<i className="fa fa-reorder fa-lg " style={{ fontSize:'1.7rem',lineHeight:'0.25em', color:"#606060"}}></i>):(<span></span>)}
        </NavbarToggler>
        <NavbarBrand  style={{borderBottom:"1px solid #bbbbbb"}} href="#"></NavbarBrand>
        <NavbarToggler style={navColorWeight} className="d-md-down-none" onClick={this.sidebarToggle}>
          {this.state.selected ? (<i className="fa fa-reorder fa-lg " style={{ fontSize:'1.7rem',lineHeight:'0.25em', color:"#606060"}}></i>):(<span></span>)}</NavbarToggler>
        <Nav className="d-md-down-none" navbar>
          {/*<NavItem className="px-3">
            <NavLink href="#" style={{color:'#fff', fontWeight:'600'}}>Home</NavLink>
          </NavItem>*/}

        </Nav>
        <Nav className="ml-auto" navbar style={{paddingRight:"10px", marginTop:"-2px"}}>
          <NavItem className="d-md-down-none">
            <NavLink href="#" style={navColorWeight}><i className="icon-bell"></i>
              {/* <Badge pill color="danger">2</Badge> */}
            </NavLink>
          </NavItem>

          <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle nav caret style={navColorWeight} >
              {/*<img src={'img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>*/}
              {this.state.big_screen ?(<span className="d-md-down-none" >
                  {this.props.auth.user.profile.name ?(<span style={{color:"#606060"}}> {this.props.auth.user.profile.name} </span>):(<span>
                      {this.props.auth.user.username}
                  </span>)}

              </span>):(<span>
                  {this.props.auth.user.profile.name ?(<span style={{color:"#606060"}}> {this.props.auth.user.profile.name.substring(0, 4)}.. </span>):(<span>
                      {this.props.auth.user.username.substring(0, 4)}..
                  </span>)}

              </span>)}

            </DropdownToggle>
            <DropdownMenu style={{fontSize:"1.6rem", marginTop:'20px'}}>
              {/* <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem> */}
              <DropdownItem  ><a href="/manage_account" style={{textDecoration: "none", color:"#000000"}}><i className="fa fa-gears"></i> Settings </a></DropdownItem>

            </DropdownMenu>
          </Dropdown>
        </Nav>
        {/* <NavbarToggler className="d-md-down-none" onClick={this.asideToggle} style={navColorWeight}><i className="icon-options-vertical"></i></NavbarToggler> */}
      </header>
    );
  }
}
Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
export default connect(mapStateToProps, { logout })(Header);
