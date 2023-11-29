import { Col, Row } from 'react-bootstrap';
import './Payment.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { OrderProduct } from '../../interface/Interface';
import { useNavigate } from 'react-router-dom';

interface Props{
    orderProducts: OrderProduct[],
    count: number,
}

function Payment({ orderProducts, count }: Props) {
    const navigate = useNavigate()

    console.log(orderProducts)


    let sum: number = 0

    return ( 
        <div className="payment-wrapper">
            <Row>
                <Col className='payment-left'>
                    <h2 className='payment-title'>Thông tin khách hàng</h2>
                    <form className='payment-form'>
                        <input className='payment-input' placeholder='Họ và tên' />
                        <input className='payment-input' placeholder='Số điện thoại' />
                        <input className='payment-input' placeholder='Email' />
                        <input className='payment-input' placeholder='Địa chỉ' />
                        <input className='payment-input' placeholder='Ghi chú' />
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
                        <button className='payment-order-btn'>Đặt hàng</button>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default Payment;