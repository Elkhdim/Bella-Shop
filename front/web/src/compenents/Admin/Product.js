import React, { Component } from 'react';
import axios from 'axios';

export class Product extends Component {

  constructor(props){
    super(props)
    
     this.state={
       name:"",
       price:0,
       quantity:0,
       category:""
      // loginErrors:""
     };
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleChange=this.handleChange.bind(this);
   }
   handleChange(ev){
    this.setState({
      [ev.target.name]: ev.target.value
    });
  }
  
    handleSubmit(ev) {
      ev.preventDefault();
    console.log(this.state)
    
  
      axios.post('http://localhost:3001/api/product/add', this.state)
      .then( (response) => {
        console.log("Le compte a été enregitré avec succes :",response);
      })
      .catch( (error)=> {
        console.log("Erreur d'enregitrement :",error);
      });
      
    }
   
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
               
             
            <div className="form-group">
                <label> Nom de produit:  </label>
                <input type="text" className="form-control" id="name" value={this.state.name} name="name" onChange={this.handleChange}/>
             </div> 


             <div className="form-group">
              <label >Prix:</label>
              <input type="number" className="form-control" id="price" value={this.state.price} name="price" onChange={this.handleChange}/>
            </div>

            

            <div className="form-group">
              <label >Quantité:</label>
              <input type="number" className="form-control" id="quantity" value={this.state.quantity} name="quantity" onChange={this.handleChange}/>
            </div>

            <div className="form-group">
              <label >Categorie:</label>
              <input type="text" className="form-control" id="category" value={this.state.category} name="category" onChange={this.handleChange}/>
            </div>

           

            
            <button type="submit" className="btn btn-default">Ajouter</button>
          
            </form>
        )
    }
}

export default Product
