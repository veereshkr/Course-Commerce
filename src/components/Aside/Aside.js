import React, {Component} from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';

class Aside extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <aside className="aside-menu">
        <Nav tabs>
          <NavItem>
            <NavLink className={classnames({ active: this.state.activeTab === '1' })}
                     onClick={() => { this.toggle('1'); }}>
              <i className="icon-list"></i>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({ active: this.state.activeTab === '2' })}
                     onClick={() => { this.toggle('2'); }}>
              <i className="icon-speech"></i>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({ active: this.state.activeTab === '3' })}
                     onClick={() => { this.toggle('3'); }}>
              <i className="icon-settings"></i>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">

          </TabPane>
          <TabPane tabId="2" className="p-3">

          </TabPane>
          <TabPane tabId="3" className="p-3">
            <h6>Settings</h6>



          </TabPane>
        </TabContent>
      </aside>
    )
  }
}

export default Aside;
