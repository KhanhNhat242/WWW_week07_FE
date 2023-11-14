import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import './ShoppingCart.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

function ShoppingCart() {
    return ( 
        <div className='shopping-cart-wrapper'>
            <h2 className='shopping-cart-title'>Giỏ hàng</h2>
            <Row className='item-row'>
                <div className='col-sm-3'>
                    <img className='item-img' src='https://pos.nvncdn.net/16a837-71503/ps/20220322_EVgUTsE1ipZN6UaPzBlm9opz.jpg' />
                </div>
                <div className='col-sm-3'>
                    <p className='item-name'>Khoai lang nhat huu co</p>
                    <p className='item-price'>51000</p>
                </div>
                <div className='quantity-wrapper col-sm-3'>
                    <button className='change-quantity-btn'>-</button>
                    <p className='quantity'>2</p>
                    <button className='change-quantity-btn'>+</button>
                </div>
                <div className='sum-wrapper col-sm-3'>
                    <p className='sum-price-title'>Tổng tiền</p>
                    <p className='item-price'>51000</p>
                    <button className='delete-btn'><FontAwesomeIcon icon={faTrash} /> Xóa</button>
                </div>
            </Row>
        </div>    
    );
}

export default ShoppingCart;