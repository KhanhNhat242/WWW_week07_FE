import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './ProductManager.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

interface IProps{
    isLogIn: boolean
}

function ProductManager({ isLogIn } : IProps) {
    const navigate = useNavigate()

    useEffect(() => {
        // console.log(isLogIn)
        if(!isLogIn) navigate('/log-in')
    }, [])

    return ( 
        <div className='prd-man-wrapper'>
            <h2 className='prd-man-title'>Product Manager page</h2>   
            <div className='prd-man-btn-wrapper'>
                <button className='prd-man-btn'>
                    <Link to='/product-manager/add-product'>Thêm sản phẩm mới</Link>
                </button>
                <button className='prd-man-btn'>
                    <Link to='/product-manager/edit-product'>Chỉnh sửa thông tin sản phẩm</Link>
                </button>
            </div> 
        </div>
    );
}

export default ProductManager;