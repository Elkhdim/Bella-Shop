import React, { Component } from 'react';
import axios from 'axios';

export class SignUp extends Component {

  constructor(props){
    super(props)
    
     this.state={
       name:"",
       email:"",
       password:""
      // loginErrors:""
     };

   }
   handleChange =(ev)=>{
    this.setState({
      [ev.target.name]: ev.target.value
    });
  }
  
    handleSubmit = (ev) => {
      ev.preventDefault();
    console.log(this.state)
    
  
      axios.post('http://localhost:3001/api/user/register', this.state)
      .then( (response) => {
        console.log("Le compte a été enregitré avec succes :",response);
      })
      .catch( (error) => {
        console.log("Erreur d'enregitrement :",error);
      });
      
    }
    /*
    <div className="form-group">
              <label >Confirmer le mot de passe:</label>
              <input type="password" className="form-control" id="pwd2" value={this.state.Cpassword} name="Cpassword" onChange={this.handleChange}/>
            </div> 
     */
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
               
             
            <div className="form-group">
                <label> Nom :  </label>
                <input type="text" className="form-control" id="lastname" value={this.state.name} name="name" onChange={this.handleChange}/>
             </div> 


             <div className="form-group">
              <label >Email address:</label>
              <input type="email" className="form-control" id="email" value={this.state.email} name="email" onChange={this.handleChange}/>
            </div>

            

            <div className="form-group">
              <label >Mot de passe:</label>
              <input type="password" className="form-control" id="pwd" value={this.state.password} name="password" onChange={this.handleChange}/>
            </div>

           

            
            <button type="submit" className="btn btn-default">Inscrie</button>
          
            </form>
        )
    }
}

export default SignUp
