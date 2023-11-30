import { Col, Row } from 'react-bootstrap';
import './Payment.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { OrderProduct } from '../../interface/Interface';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

interface Props{
    orderProducts: OrderProduct[],
    setOrderProducts: React.Dispatch<React.SetStateAction<OrderProduct[]>>,
    count: number,
    setCount: React.Dispatch<React.SetStateAction<number>>,
}

interface Customer{
    phone: string,
    name: string,
    email: string,
    address: string,
}

interface Product{
    quantity: number,
    price: number, 
    id: number,
}

function Payment({ orderProducts, setOrderProducts, count, setCount }: Props) {
    const [customer, setCustomer] = useState<Customer>({
        phone: '',
        name: '',
        email: '',
        address: '',
    })
    const [note, setNote] = useState<string>('')
    
    const navigate = useNavigate()

    let sum: number = 0

    const handleInput:(arg0: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        setCustomer({...customer, [name]: value})
    }

    const handleOrder:() => void = async () => {
        if(customer.name === '' || customer.phone === '' || customer.email === '' || customer.address === '' || note === ''){
            alert('Vui lòng nhập đầy đủ thông tin')
        }
        else{
            const listProduct:Product[] = []
    
            orderProducts.forEach((op) => {
                listProduct.push({
                    quantity: op.quantity,
                    price: op.orderPrice,
                    id: op.product.product_id,
                })
            })
    
            await axios.post('http://localhost:8080/addCustomer', customer)
            await axios.post('http://localhost:8080/addOrder')
    
            listProduct.forEach( async (lp) => {
                const quantity:number = lp.quantity
                const price: number = lp.price
                const id:number = lp.id
    
                await axios.post('http://localhost:8080/addOrderDetail', null, {params: { quantity, price, note, id }})
            })
    
            alert('Đặt hàng thành công')
    
            setOrderProducts([])
            setCount(0)

            navigate('/product')
        }
    }

    return ( 
        <div className="payment-wrapper">
            <Row>
                <Col className='payment-left'>
                    <h2 className='payment-title'>Thông tin khách hàng</h2>
                    <form className='payment-form'>
                        <input className='payment-input' name='name' placeholder='Họ và tên' onChange={(e) => handleInput(e)} />
                        <input className='payment-input' name='phone' placeholder='Số điện thoại' onChange={(e) => handleInput(e)} />
                        <input className='payment-input' name='email' placeholder='Email' onChange={(e) => handleInput(e)} />
                        <input className='payment-input' name='address' placeholder='Địa chỉ' onChange={(e) => handleInput(e)} />
                        <input className='payment-input' name='note' placeholder='Ghi chú' value={note} onChange={(e) => setNote(e.target.value)} />
                    </form>
                </Col>
                <Col className='payment-right'>
                    <h2 className='payment-title'>{`Đơn hàng (${count} sản phẩm)`}</h2>
                    <Row className='payment-prd-wrapper'>
                        <div className="col-md-2 ">
                            <></>
                        </div>
                        <div className="col-md-6">
                            <p className='payment-prd-name'>Tên sản phẩm</p>
                        </div>
                        <div className="col-md-2">
                            <p className='payment-quantity'>Số lượng</p>
                        </div>
                        <div className="col-md-2">
                            <p className='payment-prd-price'>Đơn giá</p>
                        </div>
                    </Row>
                    {
                        orderProducts.map((o) => {
                            sum = sum + o.orderPrice

                            return (
                                <Row className='payment-prd-wrapper'>
                                    <div className="col-md-2 ">
                                        <img className='payment-prd-img' src={o.path} />
                                    </div>
                                    <div className="col-md-6">
                                        <p className='payment-prd-name'>{o.product.name}</p>
                                    </div>
                                    <div className="col-md-2">
                                        <p className='payment-quantity'>{o.quantity}</p>
                                    </div>
                                    <div className="col-md-2">
                                        <p className='payment-prd-price'>{o.orderPrice}</p>
                                    </div>
                                </Row>
                            )
                        })
                    }
                    <Row>
                        <Col className='detail'>
                            <p>Tạm tính</p>
                        </Col>
                        <Col className='detail'>
                            <p className='payment-prd-price'>{sum}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Phí vận chyển</p>
                        </Col>
                        <Col>
                            <p className='payment-prd-price'>30000</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Tổng cộng</p>
                        </Col>
                        <Col>
                            <p className='payment-prd-price'>{sum + 30000}</p>
                        </Col>
                    </Row>
                    <Row className='payment-btn-wrapper'>
                        <button className='back-btn' onClick={() => navigate('/shopping-cart')}><FontAwesomeIcon icon={faAngleLeft} /> Quay về giỏ hàng</button>
                        <button className='payment-order-btn' onClick={() => handleOrder()}>Đặt hàng</button>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default Payment;