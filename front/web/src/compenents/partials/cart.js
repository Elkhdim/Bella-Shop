import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Cart extends Component {

  

constructor(props){
    super(props);
   
    this.state = {
        cart : [],
       // total : 0
    }

    
   
}
    //console.log(props)

  
    //console.log(props.user._id)
      getOrder = () => {
        axios.get(`http://localhost:3001/api/order/${this.props.user._id}`)
        .then(res  => {
           
           console.log(res)
         //  console.log("aaaabbb : ",items)
            this.setState({
                cart : res.data,
              //  total : this.state.total + res.data.products[items].price
            })
        // items = items + 1
           // this.cart = res.data
        })
        .catch(err => {
            console.log(err)
        })
    }

    /*static getDerivedStateFromProps(props,state) {
       
        console.log(state)
    }*/

    componentDidMount = () => {
   
        this.getOrder();
   
    }
    
    render() {

        //this.getOrder();
       
        //console.log("render cart : ",this.state.cart)
        
        const listCart = this.state.cart
        
       // console.log('listCart ',listCart)   { prd.quantity * prd.price}
     // total = 0;
      const cardItems = listCart !== undefined && listCart.products !== undefined ? listCart.products.map( (prd, index) => 
       
          (
            <p key={index}>
                {prd.quantity + '×' + prd.product.name + ' ' + prd.quantity*prd.price + '  $'} 

                 <button className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i> </button>
                <button className="btn"><i className="fa fa-minus" aria-hidden="true"></i></button>
            </p>
             
            
          )
       ) : (<div>No Yet !</div>)
       /* const listCartProduct =  this.state.cart.products
       const Total =  ({ listCartProduct }) => (
        <h3>
            Price: 
            {listCartProduct.reduce((sum, i) => (
            sum += i.qantity * i.price
            ), 0)}
      
        </h3>
        ) */



        return (
            <div>
                {
                     
                    cardItems
              
                }
                 {
                   //  console.log(Total())
                 }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Cart)
