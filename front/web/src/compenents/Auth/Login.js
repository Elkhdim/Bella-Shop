import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
//import { Redirect } from 'react-router'
import Home from '../home/Home'
import { Link, BrowserRouter, Route } from 'react-router-dom';
 class Login extends Component {

 constructor(props){
 super(props)
 console.log(this.props)
  this.state={
    email:"yasser@gmail.com",
    password:"123456789",
    errorMessage : ''
   
  };

}

handleChange = (ev) =>{
  this.setState({
   [ev.target.name]: ev.target.value

  });
}

    
 
  handleSubmit = (ev) => {
    ev.preventDefault();
  
  console.log(this.state) 
  

    axios.post('http://localhost:3001/api/user/login', {email : this.state.email,password : this.state.password})
    .then( (response) => {
      
           console.log(response);
            this.props.userLogin(response.data.token,response.data.user);
            // Redirection
            this.props.history.push('/')
           // if(re)
    })
    .catch( (error) => {
      console.log(error);
    this.setState({
       errorMessage : "Email ou mot de passe incorrect"
     })
    });
    
  }


    render() {
   

        return (
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label >Address email:</label>
              <input type="email" className="form-control" id="email"  value={this.state.email} name="email" onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <label >Mot de pass:</label>
              <input type="password" className="form-control" id="password" value={this.state.password} name="password" onChange={this.handleChange}/>
            </div>
            {
     
              this.state.errorMessage != '' &&
              <h3 className="error"> { this.state.errorMessage } </h3> 
            }
            <div className="checkbox">
              <label><input type="checkbox" /> Remember me</label>
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
        
          </form>
        
        
          
        )
        
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin : (token,user) => {
      dispatch({
        type : 'LOGIN_USER',
        token : token,
        user : user
        
      })
    }
  }
}

export default connect(null,mapDispatchToProps)(Login)
