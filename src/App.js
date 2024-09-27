import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/login'
import Home from './components/Home'
import NotFound from './components/notfound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
