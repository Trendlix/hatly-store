import React, { useEffect, useState } from 'react'
// import phonesImage from "../img/image0-1536x1152.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch
} from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link'
import { fetchProduct } from "../API/product";
import notFound from "../img/logo2.png";
import { motion } from 'framer-motion';
import Image from 'next/image';

const SearchProduct = (props) => {
    const [products, setProducts] = useState([])
    const [searcProduct, setSearcProduct] = useState('')
    const [loading, setLoading] = useState(true)
    const [show, setShow] = useState(false)


    const getProducts = async () => {

        try {
            setLoading(true);
            const res = await fetchProduct.get(`/searchProduct/${searcProduct}`);
            setProducts(res.data);
            setLoading(false);
        } catch (er) { }
    };

    useEffect(
        () => {
            if (searcProduct !== "") {
                getProducts();
                setShow(true)
            } else {
                setShow(false)
            }
        }, [searcProduct]
    )


    return (
        <>
            <div className="row align-items-center p-1" style={{ border: '1px solid #394b8c', borderRadius: '0.25rem', backgroundColor: 'white' }} >
                <div className="col-auto searchContainer">
                    <FontAwesomeIcon
                        icon={faSearch}
                        color={ props.color}
                    ></FontAwesomeIcon>
                </div>
                <div className="col p-0">

                    <input onKeyUp={(e) => {
                        setSearcProduct(e.target.value)
                    }}
                        onBlur={(e) => {
                            setTimeout(() => {
                                setShow(false)
                            }, 500)
                        }}
                        className="form-control search"
                        style={{ backgroundColor: 'transparent', border: 'none' }}
                        placeholder="Search products"
                    ></input>
                </div>
            </div>
            {show ? (<motion.div className='row'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                style={{ position: 'relative', zIndex: '999' }}
            >
                <div className='col-12 p-2' align="center" style={{ position: 'absolute', width: '100%', backgroundColor: "white" }} >
                    {loading ? (<div className="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>) : (products.length === 0 ? 'Not Found' : products.map((product, i) => {
                        return (<Link onClick={() => {
                            window.scroll({
                                top: 0,
                                left: 0,
                                behavior: "smooth",
                            });
                        }} to={`/product/${product.id}`}>
                            <div className='row align-items-center'>
                                <Image className='col-2 p-2' src={product.image ? `https://hatlystore.tswsp.net${product.image}` : notFound} alt="" width="100%" />
                                <h6 style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }} className='col-9'>{product.item_name}</h6>
                            </div>
                        </Link>)
                    }))

                    }
                </div>
            </motion.div>) : ''}

        </>
    )
}

export default SearchProduct