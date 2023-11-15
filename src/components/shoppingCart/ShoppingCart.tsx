import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row } from "react-bootstrap";
import './ShoppingCart.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from "react";
import { OrderProduct } from "../../interface/Interface";

interface Props {
    orderProducts: OrderProduct[],
}

function ShoppingCart({ orderProducts }: Props) {

    // const [quantities, setQuantities] = useState<number[]>([])
    // const [prices, setPrices] = useState<number[]>([])
    const [prd, setPrd] = useState<OrderProduct[]>(orderProducts)

    const handleInc:(arg0: number, arg1: number) => void = (i: number, q: number) => {
        prd[i].quantity = q++
        setPrd(prd)
        console.log(prd)
    }

    prd.forEach((o) => o.quantity = 1)

    return ( 
        <div className='shopping-cart-wrapper'>
            <h2 className='shopping-cart-title'>Giỏ hàng</h2>
            {
                prd.map((o, i) => {
                    // console.log(quantities[i])
                    // if(!quantities[i])
                    //     quantities[i] = 1
                    // prices[i] = o.price
                    if(!o.quantity)
                        o.quantity = 1
                    const quan:number = o.quantity
                    return (
                        <Row className='item-row' key={o.product.product_id}>
                            <div className='col-sm-3'>
                                <img className='item-img' src={o.path} />
                            </div>
                            <div className='col-sm-3'>
                                <p className='item-name'>{o.product.name}</p>
                                <p className='item-price'>{o.price}</p>
                            </div>
                            <div className='quantity-wrapper col-sm-3'>
                                <button className='change-quantity-btn'>-</button>
                                <p className='quantity'>{quan}</p>
                                <button className='change-quantity-btn' onClick={() => handleInc(i, quan)}>+</button>
                            </div>
                            <div className='sum-wrapper col-sm-3'>
                                <p className='sum-price-title'>Tổng tiền</p>
                                <p className='item-price'>{o.price}</p>
                                <button className='delete-btn'><FontAwesomeIcon icon={faTrash} /> Xóa</button>
                            </div>
                        </Row>
                    )
                })
            }
            <div className='order-price-wrapper'>
                <p className='order-price-title'>Thành tiền <span className='order-price'>100000</span></p>
                <div className="submit-wrapper">
                    <button className="continue-shopping-btn">Tiếp tục mua sắm</button>
                    <button className="submit-order-btn">Đặt hàng ngay</button>
                </div>
            </div>
        </div>    
    );
}

export default ShoppingCart;