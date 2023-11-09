import { Row } from 'react-bootstrap';
import './Product.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

function Product() {
    return ( 
        <div className='prds-wrapper'>
            <Row>
                <div className='prd-wrapper col-md-3'>
                    <img className='prd-img' src='https://pos.nvncdn.net/16a837-71503/ps/20220322_CzUUJb8hqJLMkdJSghkAuGaT.jpg' />
                    <div className='price-wrapper'>
                            <p className='prd-name'>Xa lach My huu co</p>
                            <p className='price'>51000</p>
                    </div>
                </div>
            </Row>
        </div>
     );
}

export default Product;