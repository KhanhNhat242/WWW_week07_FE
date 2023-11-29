import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row } from "react-bootstrap";
import './ShoppingCart.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from "react";
import { OrderProduct } from "../../interface/Interface";
import { useNavigate } from "react-router-dom";

interface Props {
    orderProducts: OrderProduct[],
    count: number,
    setCount: React.Dispatch<React.SetStateAction<number>>,
    setOrderProducts: React.Dispatch<React.SetStateAction<OrderProduct[]>>,
}

function ShoppingCart({ orderProducts, count, setCount, setOrderProducts }: Props) {
    const [prd, setPrd] = useState<OrderProduct[]>(orderProducts)
    const [flag, setFlag] = useState<number>(0)
    const [totalPrice, setTotalPrice] = useState<number>(0)

    const navigate = useNavigate()

    const handleInc:(arg0: number) => void = (id: number) => {
        setPrd((prev) => {
            prev.map((p) => {
                if(p.product.product_id == id){
                    p.quantity = p.quantity + 0.5
                    if(((p.quantity/0.5)%2) == 0){
                        p.orderPrice = p.orderPrice + p.price
                        setTotalPrice(totalPrice + p.price)
                    }
                    return {...p}
                }
                return p
            })
            return prev
        })
    }

    const handleDec:(arg0: number) => void = (id: number) => {
        setPrd((prev) => {
            prev.map((p) => {
                if(p.product.product_id == id && p.quantity > 1){
                    p.quantity = p.quantity - 0.5
                    if(((p.quantity/0.5)%2) == 0){
                        p.orderPrice = p.orderPrice - p.price
                        setTotalPrice(totalPrice - p.price)
                    }
                    return {...p}
                }
                return p
            })
            return prev
        })
    }

    const handleDelete:(arg0: number, arg1: number) => void = (orderPrice: number, index: number) => {
        const newPrd = [...prd]

        newPrd.splice(index, 1)

        setOrderProducts(newPrd)
        setPrd(newPrd)
        setTotalPrice(totalPrice - orderPrice)
        setCount(count - 1)
    }

    const handlePayment:() => void = () => {
        setOrderProducts(prd)
        navigate('/payment')
    }

    useEffect(() => {
        for(const p of prd){
            setTotalPrice(prev => {
                return prev + p.orderPrice/2
            })
        }
    }, [])

    const render:() => JSX.Element[] = () => {
        return prd.map((o, index) => {
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
                        <button className='change-quantity-btn' onClick={() => {
                            setFlag(flag + 1)
                            handleDec(o.product.product_id)
                        }}>-</button>
                        <p className='quantity'>{o.quantity}</p>
                        <button className='change-quantity-btn' onClick={() =>{
                            setFlag(flag + 1)
                            handleInc(o.product.product_id)}}>+</button>
                    </div>
                    <div className='sum-wrapper col-sm-3'>
                        <p className='sum-price-title'>Tổng tiền</p>
                        <p className='item-price'>{o.orderPrice}</p>
                        <button className='delete-btn' onClick={() => handleDelete(o.orderPrice, index)}><FontAwesomeIcon icon={faTrash} /> Xóa</button>
                    </div>
                </Row>
            )
        })
    }

    const reRender:() => JSX.Element[] = () => {
        return render()
    }

    return ( 
        <div className='shopping-cart-wrapper'>
            <h2 className='shopping-cart-title'>{`Giỏ hàng (${count} sản phẩm)`}</h2>
            {   
                flag == 0 ? render() : reRender()
            }
            {
                count == 0 ? <></> : (
                    <div className='order-price-wrapper'>
                        <p className='order-price-title'>Thành tiền <span className='order-price'>{totalPrice}</span></p>
                        <div className="submit-wrapper">
                            <button className="continue-shopping-btn">Tiếp tục mua sắm</button>
                            <button className="submit-order-btn" onClick={() => handlePayment()}>Đặt hàng ngay</button>
                        </div>
                    </div>
                )
            }     
        </div>    
    );
}

export default ShoppingCart;