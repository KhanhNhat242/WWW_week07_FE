import { Row } from 'react-bootstrap';
import './Product.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ProductImage, ProductPrice } from '../../interface/Interface';

interface Props {
    productImages: ProductImage[],
    productPrices: ProductPrice[],
}

function Product({ productImages, productPrices }: Props) {

    const p = []

    for(const pi of productImages){
        for(const pr of productPrices){
            if(pi.product.product_id === pr.product.product_id){
                p.push({...pi, ...pr})
            }
        }
    }

    // console.log(arr)

    return ( 
        <div className='prds-wrapper'>
            <Row>
                {
                    p.map((prd) => {
                        return (
                            <div className='prd-wrapper col-sm-3'>
                                <img className='prd-img' src={prd.path} />
                                <div className='price-wrapper'>
                                        <p className='prd-name'>{prd.product.name}</p>
                                        <p className='price'>{prd.price}</p>
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