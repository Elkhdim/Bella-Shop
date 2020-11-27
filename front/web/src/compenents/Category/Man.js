import React, { Component } from 'react';
import axios from 'axios';
import Item from '../partials/item';
import Cart from '../partials/cart';
import { connect } from 'react-redux';
import Login from '../Auth/Login'
import './style.css'
var dataProduct = []
class Man extends Component {
    constructor(props){
        super(props);
        console.log("Props : ", this.props)
        this.state={
            items: [],
            addOrder : []
        }
       

    }

    

    
    

    getManProduct = () => {
       // ev.preventDefault();
      
        console.log('mounted')
        axios.get('http://localhost:3001/api/product/Homme')
        .then(response => {
            
            console.log("Res :",response);
            this.setState ({
                items : response.data
            })

            // console.log('State :',this.state.items)
            dataProduct = response.data;
            console.log('dataP :',dataProduct)
        })
        .catch( (error) => {
            console.log(error);
        });
    }
    
  
    
    componentDidMount() {
   
        this.getManProduct()
    }

    render() {
        const isAuth = this.props.token
        //console.log(user.name)
        const products = this.state.items
        const productList = products.map((prd, index) => {
            return (
                <Item product={prd} key={index} />
            )
        })

        return (
            
         
            
                isAuth ? (
                      <div className="row">

                <div className="col-sm-9">
                    <div className="row">
                        <div className="col">
                            <div className="text-center">
                                <h2>-- Comment ça marche --</h2>
                                _______________________
                        

                            </div>

                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="text-center">
                                <h4>
                                    Tapez un text de description
                                </h4>
                            
                                
                            </div>

                        </div>

                        <div className="col-sm-6">
                            <div className="text-center">
                                <h4>
                                    coller une video de description ou quelque chose
                                </h4> 
                            </div>

                        </div>
                    </div>
                
                    <div className="row">
                        <div className="col">
                            <div className="text-center">
                                <h2>-- Presentation --</h2>
                            
                                
                            </div>

                        </div>
                    </div>
                        <div className="row">
                        {productList} 
                        
                        </div>

                    </div>
                <div className="col-sm-3">
                    <div className="fixed">
                          <Cart />
                    </div>
                  
                </div>
                
              
        </div>
                ):(<div>
                   <p>Merci de connect pour voire les contenus</p> 
                    <Login />
                </div>)
            
            
          
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

export default connect(mapStateToProps)(Man)
