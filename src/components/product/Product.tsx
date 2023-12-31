import { Row } from 'react-bootstrap';
import './Product.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { OrderProduct, ProductImage, ProductPrice } from '../../interface/Interface';
import { useNavigate } from 'react-router-dom';
import React from 'react';

interface Props {
    productImages: ProductImage[],
    productPrices: ProductPrice[],
    setCount: React.Dispatch<React.SetStateAction<number>>,
    count: number,
    setOrderProducts: React.Dispatch<React.SetStateAction<OrderProduct[]>>,
    orderProducts: OrderProduct[],
}

function Product({ productImages, productPrices, setCount, count, setOrderProducts, orderProducts }: Props) {

    const p = []
    const q = {quantity: 1}
    const navigate = useNavigate()

    for(const pi of productImages){
        for(const pr of productPrices){
            if(pi.product.product_id === pr.product.product_id){
                const op = {orderPrice: pr.price}
                p.push({...pi, ...pr, ...q, ...op})
            }
        }
    }

    const handleOrder:(arg0: OrderProduct) => void = (prd: OrderProduct) => {
        let flag: number = 0
        let currentId: number = 0

        if(orderProducts.length == 0){
            setOrderProducts([...orderProducts, prd])
            setCount(count + 1)
            navigate('/shopping-cart')
        }
        else if(orderProducts.length != 0){
            for(const op of orderProducts){
                if(prd.product.product_id === op.product.product_id){
                    currentId = op.product.product_id
                    flag = 1
                    break
                }
                else{
                    flag = 2
                }
            }
        }

        if(flag == 1){
            setOrderProducts((prev) => {
                prev.map((p) => {
                    if(p.product.product_id === currentId){
                        p.orderPrice = p.orderPrice + p.price
                        p.quantity = p.quantity + 1
                    }
                    return {...p}
                })
            return prev
            })
            navigate('/shopping-cart')
        }
        else if(flag == 2){
            setOrderProducts([...orderProducts, prd])
            setCount(count + 1)
            navigate('/shopping-cart')
        }
    }

    return ( 
        <div className='prds-wrapper'>
            <Row>
                {
                    p.map((prd) => {
                        return (
                            <div className='prd-wrapper col-sm-3' key={prd.product.product_id}>
                                <img className='prd-img' src={prd.path} />
                                <div className='price-wrapper'>
                                    <Row className='price-row'>
                                        <div className='col-lg-6 price-col'>
                                            <p className='prd-name'>{prd.product.name}</p>
                                            <p className='price'>{prd.price}</p>
                                        </div>
                                        <div className='col-lg-6'>
                                            <button className='order-btn' onClick={() => handleOrder(prd)}>Đặt hàng</button>
                                        </div>
                                    </Row>
                                </div>
                            </div>
                        )
                    })
                }
            </Row>
        </div>
     );
}

export default Product;