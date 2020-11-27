import React, { useState, Component } from 'react';
import homme from '../../image/homme.png';
import axios from 'axios';
import { connect } from 'react-redux';
import io from "socket.io-client";

//const socket = io('http://localhost:3000/')
class Item extends Component {

    //console.log(props)

    postNewProduct = () => {
        // ev.preventDefault();

        console.log(this.props.user, this.props.product)
        this.props.addToCart(this.props.product);
        axios.post('http://localhost:3001/api/order/add', {

            user: this.props.user._id,
            product: { product: this.props.product._id, quantity: 1, price: this.props.product.price }



        }).then(response => {
               // socket.emit('msocket work succafly')
                //console.log("data is send :", response, 'props: ', this.props);
                //this.props.addToCart(this.props.product);
                //console.log(response)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="col-sm-4">
                <div className="text-center">
                    <div >
                        <img src={homme} className="img-thumbnail" alt="" />
                    </div>
                    <div>
                        <button type="button" onClick={() => this.postNewProduct()} className="btn btn-success btn-lg " >+</button>
                    </div>
                    <div>
                        <h4>{this.props.product.name} - {this.props.product.price} $</h4>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        token: state.auth.token,
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      addToCart : (product) => {
        dispatch({
          type : 'ADD_TO_CART',
          product : product
        })
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Item)
