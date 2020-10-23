import React, { useState } from 'react';
import homme from '../../image/homme.png';
import axios from 'axios';
import { connect } from 'react-redux';

const Item = (props) => {

    //console.log(props)

    const postNewProduct = () => {
        // ev.preventDefault();

        console.log(props.user, props.product)
        axios.post('http://localhost:3001/api/order/add', {

            user: props.user._id,
            product: { product: props.product._id, quantity: 1, price: props.product.price }



        })
            .then(response => {

                console.log("data is send :", response);


            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <div className="col-sm-4">
            <div className="text-center">
                <div >
                    <img src={homme} className="img-thumbnail" alt="" />
                </div>
                <div>
                    <button type="button" onClick={postNewProduct} className="btn btn-success btn-lg " >+</button>
                </div>
                <div>
                    <h4>{props.product.name} - {props.product.price} $</h4>
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        token: state.auth.token,
        user: state.auth.user
    }
}
export default connect(mapStateToProps)(Item)
