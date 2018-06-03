import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'

import { startLogout } from '../actions/auth'

interface StateProps {
  isAuthenticated: Boolean
}

interface DispatchProps {
  startLogout: () => void
}

type Props = StateProps & DispatchProps

export class Header extends Component<Props> {
  state = {
    dropdownOpen: false
  }

  toggleDropdown = () =>
    this.setState({ dropdownOpen: !this.state.dropdownOpen })

  render() {
    const { isAuthenticated, startLogout } = this.props

    return (
      <header className="nav-header">
        <FontAwesomeIcon icon="bars" className="bars" />
        <Link to="/dashboard" className="seam-sm">
          Seam
        </Link>
        <div className="search-group">
          <FontAwesomeIcon icon="search" className="icon" />
          <input type="text" className="input" placeholder="Search" />
        </div>

        <FontAwesomeIcon icon="bell" className="alerts" />

        <Dropdown
          isOpen={this.state.dropdownOpen}
          toggle={this.toggleDropdown}
          className="dropdown-root"
        >
          <DropdownToggle className="dropdown-toggle">
            <div
              className="image"
              style={
                {
                  // background: `url(${photo}) center / cover no-repeat`
                }
              }
            />
            <FontAwesomeIcon icon="angle-down" className="icon" />
          </DropdownToggle>
          <DropdownMenu
            right
            className="dropdown-menu"
            style={{
              display: this.state.dropdownOpen === false ? 'none' : 'block'
            }}
          >
            <DropdownItem className="dropdown-item">
              <Link to="/settings">Settings</Link>
            </DropdownItem>
            <DropdownItem className="dropdown-item">
              {isAuthenticated ? (
                <p className="logout" onClick={() => startLogout()}>
                  Logout
                </p>
              ) : null}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </header>
    )
  }
}

const mapStateToProps = (state): StateProps => {
  return {
    isAuthenticated: !!state.auth.token
  }
}

export default connect<StateProps, DispatchProps>(mapStateToProps, {
  startLogout
})(Header)
