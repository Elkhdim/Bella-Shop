import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Payment from './payment'
import socketClient  from "socket.io-client";
class Cart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cart: []
        }
    }

    removeProduct = (product) => {

        axios.post('http://localhost:3001/api/order/minus', {
            user: this.props.user._id,
            product: product
        }).then(response => {
            console.log("data is send :", response);
            this.getOrder();
        }).catch((error) => {
            console.log('Minus failed: ', error);
        });

    }

    deleteProduct = (product) => {

        axios.post('http://localhost:3001/api/order/delete', {
            user: this.props.user._id,
            product: product
        }).then(response => {
            console.log("data is send :", response);
        }).catch((error) => {
            console.log('Delete failed: ', error);
        });

    }

    //console.log(props.user._id)
    getOrder = () => {
        axios.get(`http://localhost:3001/api/order/${this.props.user._id}`)
            .then(res => {

                console.log(res)
            
                this.setState({
                    cart: res.data,
                  
                })
           
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
        const cardItems = (listCart !== undefined && listCart.products !== undefined) ?
            listCart.products.map((prd, index) => 
                <div key={index}>
                    <div className="row">
                        <div className="col-sm-6">
                            
                            {prd.quantity + '×' + prd.product.name + ' ' + prd.quantity * prd.price + '  $'}
                        
                        </div>
                        <div className="col-sm-3">
                            <button className="btn " onClick={() => this.removeProduct(prd)}><i className="fa fa-minus" aria-hidden="true"></i></button>
                        </div>
                        <div className="col-sm-3">
                            <button className="btn btn-danger" onClick={() => this.deleteProduct(prd)}><i className="fa fa-trash" aria-hidden="true"></i> </button>
                        </div>  
                    </div>
                    <br/>
                    
                </div>

        
            )
            : <div>No Yet !</div>

           
           
          

            const totalPrice = (listCart !== undefined && listCart.products !== undefined) ?
            listCart.products.reduce((sum,total)=>sum = sum + total.quantity * total.price,0):<div></div>
            const buttonPayment = (cardItems !='No Yet !')?  <Payment total = {totalPrice}/> : <div></div>

       
        return (
            <div>
                {
                    cardItems
                }
               <h2> Total : 
                {
                    totalPrice
                }</h2>
                {
                    //  console.log(Total())
                    buttonPayment
                    
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
