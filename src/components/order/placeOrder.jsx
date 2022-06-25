import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import Axios from 'axios';
import { orderUrl, url } from '../../utils/urls';
import { Link } from 'react-router-dom';


const PlaceOrder = ({ DBproducts }) => {


    let [order, setOrder] = useState({});
    let [product, setProduct] = useState([]);
    let [checkoutData, setCheckoutData] = useState([]);
    let [products, setProducts] = useState([]);
    let [productQty, setProductQty] = useState('');
    let [Bill, setBill] = useState(0);
    let [checkoutID, setCheckoutID] = useState('');


    // Añadiendo servicios a la orden
    useEffect(() => {
        setOrder(
            { products, Bill }
        )

    }, [products])


    // Boton de submit 
    let handleSubmit = (e) => {
        e.preventDefault();
        let QtyPrice = Number(product.unitPrice) * Number(productQty);
        setBill(Number(QtyPrice) + Number(Bill));
        setProducts(prev => [
            ...prev,
            {
                _id: product._id,
                productName: product.productName,
                unitPrice: product.unitPrice,
                QtyPrice: QtyPrice,
                Qty: productQty,
            }
        ])

    }


    //Guardando la orden en la base de datos
    const placeOrder = () => {
        console.log(order)
        Axios.post(url + orderUrl, order).then(res => {
            console.log(res.data._id);
            setCheckoutID(res.data._id);
        })
    }


    return (
        <>
            <p>Bill : {Bill}</p>

            <form onSubmit={handleSubmit} >
                <Select name="productName" onChange={e => setProduct(e.target.value)}>
                    {
                        // console.log(products)
                        DBproducts.map(product => (
                            <MenuItem key={product.productId} value={product}>{product.productName}</MenuItem>
                        ))
                    }
                </Select>
                <input type="text" name="productQty" value={productQty} onChange={e => setProductQty(e.target.value)} />
                <Button type="submit" variant="contained" color="primary" >Añadir</Button>
            </form>

            <div>
                {
                    products.map(productz => (
                        <div>
                            <p>Servicio : {productz.productName}   </p>
                            <p>Precio : {productz.unitPrice}</p>
                            <p>Cantidad : {productz.Qty}</p>
                            <p>Precio total del servicio : {productz.QtyPrice}</p>
                            <hr />

                        </div>
                    ))
                }
            </div>
            <Button onClick={placeOrder} variant="contained" color="primary" >Realizar orden</Button>

            <Link to={`/setOrder/`}><Button variant="contained" color="primary">Ver ordenes</Button></Link>
            <Link to={`/orderProducts/${checkoutID}`}><Button variant="contained" color="primary">Confirmar orden</Button></Link>
        </>
    )
}

export default PlaceOrder;