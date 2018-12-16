import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import FontAwesome from 'react-fontawesome';
import onClickOutside from "react-onclickoutside";

import './DropdownMultiple.css'

const url = 'https://whatsroaring-api.herokuapp.com/getEvents'
const orange = '#fb8c00'

class DropdownMultiple extends Component{
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      headerTitle: this.props.title
    }
  }

  static getDerivedStateFromProps(nextProps){
    const count = nextProps.list.filter(function(a) { return a.selected; }).length;
    if(count === 0){
      return {headerTitle: nextProps.title}
    }
    else if(count === 1){
      return {headerTitle: `${count} ${nextProps.titleHelper}`}
    }
    else if(count > 1){
      return {headerTitle: `${count} ${nextProps.titleHelper}s`}
    }
  }

  handleClickOutside(){
    this.setState({
      listOpen: false
    })
  }

  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  render(){
    const{list, toggleItem} = this.props
    const{listOpen, headerTitle} = this.state
    return(
      <div className="dd-wrapper">
      <div className="dd-header" onClick={() => this.toggleList()}>
          <div className="dd-header-title">{headerTitle}</div>
          {listOpen
            ? <FontAwesome name="angle-up" size="2x"/>
            : <FontAwesome name="angle-down" size="2x"/>
          }
      </div>
       {listOpen && <ul className="dd-list">
         {list.map((item) => (
           <li className="dd-list-item" key={item.title} onClick={() => toggleItem(item.id, item.key)}>
            {item.selected && "*"} {item.title}
           </li>
          ))}
        </ul>}
      </div>
    )
  }

}

export default onClickOutside(DropdownMultiple);
