import React from 'react';
import { useForm } from 'react-hook-form';
import { url, productUrl } from '../../utils/urls'
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddProduct = () => {
    const { register, handleSubmit } = useForm();

    let onSubmit = (data) => {
        addProduct(data);
    }

    const addProduct = (productData) => {
        axios.post(url + productUrl, productData).then(res => {
            console.log(res);
        })
    }
    return (
        <>

            <p></p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Servicio ID</label>
                <input name="productId" type="number" ref={register} /><br />
                <label>Nombre del servicio</label>
                <input name="productName" type="text" ref={register} /><br />
                <label>Precio del servicio</label>

                <input name="unitPrice" type="number" ref={register} /><br />
                <label>Cantidad del servicio</label>
                <input name="productQty" type="text" ref={register} /><br />
                <button type="submit">Añadir servicio</button>
                <Link to={`/`}><button>Atras</button></Link>
            </form>

        </>
    )
}

export default AddProduct;