import Cookies from 'js-cookie'
import {Redirect, withRouter} from 'react-router-dom'

const Home = props => {
  const token = Cookies.get('jwt_token')

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }

  if (token === undefined) {
    return <Redirect to="/ebank/login" />
  }

  return (
    <div>
      <nav>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div>
        <h1>Your Flexibility, Our Excellence</h1>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
          />
        </div>
      </div>
    </div>
  )
}

export default withRouter(Home)
