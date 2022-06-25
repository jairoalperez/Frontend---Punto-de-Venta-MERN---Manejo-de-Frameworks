import Axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { productUrl, url } from '../../utils/urls';


const UpdatePage = (props) => {

    let { id } = props.match.params

    let [product, setProduct] = useState([]);


    const { register, handleSubmit } = useForm();

    let onSubmit = async (data) => {

        data.productQty = Number(product.productQty) + Number(data.productQty)

        await Axios.post(url + productUrl + id, data).then(res => {
            setProduct(res.data.data);
        })
    }

    //Actualizacion

    useEffect(() => {
        getProduct();
    }, [])

    let getProduct = () => {
        Axios.get(url + productUrl + id).then(res => {
            setProduct(res.data[0]);
        })
    }

    return (
        <>

            <p><b>Servico ID</b> : {product.productId}</p>
            <p><b>Nombre del servico</b> : {product.productName}</p>
            <p><b>Cantidad</b> : {product.productQty}</p>
            <p><b>Precio</b> : {product.unitPrice}</p>


            <form onSubmit={handleSubmit(onSubmit)} >
                <>
                    <input name="productId" type="hidden" value={product.productId} ref={register} />
                    <input name="productName" type="hidden" value={product.productName} ref={register} />
                    <input name="unitPrice" type="hidden" value={product.unitPrice} ref={register} />
                </>
                <label>Cantidad</label>
                <input name="productQty" type="text" ref={register} />
                <button type="submit">Actualizar</button>
            </form>
            <Link to={`/`}><button>Atras</button></Link>

        </>
    )
}


export default UpdatePage;