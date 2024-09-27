import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter, Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  handleUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  handlePasswordChange = event => {
    this.setState({password: event.target.value})
  }

  handleSubmit = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {user_id: username, pin: password}
    const url = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        const jwtToken = data.jwt_token
        Cookies.set('jwt_token', jwtToken, {expires: 3})
        const {history} = this.props
        this.setState({username: '', password: '', errorMsg: ''})
        history.replace('/')
      } else {
        this.setState({errorMsg: data.error_msg})
      }
    } catch (error) {
      this.setState({errorMsg: 'Something went wrong. Please try again.'})
    }
  }

  render() {
    const {username, password, errorMsg} = this.state

    const token = Cookies.get('jwt_token')

    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-content">
          <div className="login-image">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
            />
          </div>
          <form onSubmit={this.handleSubmit}>
            <h1>Welcome Back!</h1>
            <label htmlFor="userId">User ID</label>
            <input
              id="userId"
              value={username}
              type="text"
              onChange={this.handleUsernameChange}
              placeholder="Enter User ID"
            />
            <label htmlFor="pin">PIN</label>
            <input
              id="pin"
              value={password}
              type="password"
              onChange={this.handlePasswordChange}
              placeholder="Enter PIN"
            />
            <button type="submit">Login</button>
            {errorMsg && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)
