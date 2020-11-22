import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'

 class Login extends Component {

 constructor(props){
 super(props)
 
  this.state={
    email:"yasser@gmail.com",
    password:"123456789"
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
  

    axios.post('http://localhost:3001/api/user/login', this.state)
    .then( (response) => {
        
           console.log(response);
            this.props.userLogin(response.data.token,response.data.user)
            
      
   
     
    })
    .catch( (error) => {
      console.log(error);
     
    });
    
  }


    render() {
    //  const err = this.state.error
      if (this.state.isSigned) {
        // redirect to home if signed up
        return <Redirect to = {{ pathname: "/" }} />;
      }

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
         // err ? (<div>Email ou Mot de passe incorrect</div>):(<div></div>)
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
