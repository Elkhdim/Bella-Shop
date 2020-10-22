import React,{Component} from 'react';
import Navbar from './compenents/partials/Navbar';
import Home from './compenents/home/Home';
import Login from './compenents/Auth/Login';
import SignUp from './compenents/Auth/SignUp';
import Man from './compenents/Category/Man';
import Dashboard from './compenents/Admin/Dashboard'
import Order from './compenents/Admin/Order'
import Product from './compenents/Admin/Product';
import { Link, BrowserRouter, Route } from 'react-router-dom';
// import AuthServices from './compenents/services/AuthServices'
import './App.css';

// const Auth = new AuthServices();

class App extends Component {
  render() {
    const isAdmin = false
    return (
      <BrowserRouter>
        { isAdmin ? (
          <div className="row">
            <div className="col-sm-3"> 
                <ul>
                  <li>
                    <Link to="/admin">Dashboard</Link>
                  </li>

                  <li>
                    <Link to="/admin/product">Product</Link>
                  </li>

                  <li>
                    <Link to="/admin/order">Orders</Link>
                  </li>

                </ul>
              </div>
            <div className="col-sm-9">
            <Route path="/admin" exact component={Dashboard} />
            <Route path="/admin/product"  component={Product} />
            <Route path="/admin/order"  component={Order} />
                </div>
          </div>
        ) : (
          <div>
            <Navbar />
            <div className="container mt-2">
            <Route path="/" exact component={Home} />
              <Route path="/login"  component={Login} />
              <Route path="/signUp"  component={SignUp} />
              <Route path="/man"  component={Man} />
              <Route path="/product"  component={Product} />
            </div>
          </div>
        )}
      </BrowserRouter>
    );
  }

  /*
    onClick={this.handleLogout.bind(this)} 
  
    handleLogout = () =>{

      Auth.logout();
      
        <Redirect to="/login" />
      
      //this.props.history.replace('/login');
  
    }
  */
}

export default App;
