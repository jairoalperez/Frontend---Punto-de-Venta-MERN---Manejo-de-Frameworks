import { ListItem, ListItemText } from '@material-ui/core';
import Axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { orderUrl, url } from '../../utils/urls';

const ShowOrderProducts = (props) => {

    let { id } = props.match.params
    console.log(id);

    let [orderProducts, setOrderProducts] = useState([]);
    let [orderStuff, setOrderStuff] = useState([]);


    useEffect(() => {
        getOrderProducts();

    }, [])

    const getOrderProducts = () => {
        Axios.get(url + orderUrl + id).then(res => {
            console.log(res.data);
            setOrderProducts(res.data.products);
            setOrderStuff(res.data);

        })
    }

    return (
        <>
            <h1>Servicios</h1>
            {
                orderProducts.map(order => (
                    <ListItem>
                        <span><b>Servicio :</b></span><ListItemText primary={order.productName} />
                        <span><b>Cantidad :</b></span><ListItemText primary={order.Qty} />
                        <span><b>Precio :</b></span><ListItemText primary={order.QtyPrice} />
                    </ListItem>

                ))
            }

            <p><b>Recibo</b> : {orderStuff.bill}</p>

        </>
    )

}

export default ShowOrderProducts;

