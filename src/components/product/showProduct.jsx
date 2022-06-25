import Axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { productUrl, url } from '../../utils/urls';
import DeleteProduct from './deleteProduct'
//import UpdatePage from './updatePage';
import { Link } from 'react-router-dom';

const ShowProducts = () => {


    let [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, [])


    let getProducts = () => {

        Axios.get(url + productUrl).then(res => {
            setProducts(res.data.data);
            console.log(res.data.data)
        })
    }



    return (
        <>
            <div className="center">
                <h2>This Product</h2>
                <Link to={`/addProduct`}><button>Add Product</button></Link>
                <Link to={`/order`}><button>Place Order</button></Link>

                <table border="1">
                    <thead>
                        <tr>
                            <th>Servicio ID</th>
                            <th>Nombre del servicio</th>
                            <th>Precio del servicio</th>
                            <th>Cantidad del servicio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.productId}>
                                <td>{product.productId}</td>
                                <td>{product.productName}</td>
                                <td>{product.unitPrice}</td>
                                <td>{product.productQty}</td>
                                <td>
                                    <DeleteProduct id={product.productId} />
                                    <Link to={`/updatePage/${product.productId}`}><button>Añadir</button></Link>
                                    <Link to={`/viewProduct/${product.productId}`}><button>Ver servicio</button></Link>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </>
    )
}

export default ShowProducts;