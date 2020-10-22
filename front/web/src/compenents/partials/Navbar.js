import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
class Navbar extends Component {

   
    render(){

        const logout = () => {
       
       
            /*  axios.delete('http://localhost:3001/api/user/logout')
              .then( (response) => {
                  
                     console.log("Logout : ",response);
                      
                
             
               
              })
              .catch( (error) => {
                console.log(error);
              });*/
              console.log("deconnection")
            
        }
        
        const {token, user} = this.props
        console.log(token, user)
        const authLinks = token !== null ? 
        (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to =""><span className="glyphicon glyphicon-user"></span> {user.name} </Link></li>
                <li><Link to ="" onClick={logout}><span className="glyphicon glyphicon-log-in"></span> Déconnexion</Link></li>
            </ul>
        ) :
        (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to ="/signUp"><span className="glyphicon glyphicon-user"></span> Inscrie </Link></li>
                <li><Link to ="/login"><span className="glyphicon glyphicon-log-in"></span> Connexion</Link></li>
            </ul>
        )
        
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">HomeBeauty</Link>
                    </div>
                    <ul className="nav navbar-nav">
                        <li><Link to="/man">Homme</Link></li>
                        <li><Link to="#">Femme</Link></li>
                        <li><Link to="#">Enfant</Link></li>
                        <li><Link to="/product">Product</Link></li>
                    </ul>
                    {authLinks} 
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Navbar)
