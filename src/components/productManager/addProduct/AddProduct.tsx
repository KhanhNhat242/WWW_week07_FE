import { Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import './AddProduct.scss'
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface IState {
    product: {
        name: string,
        description: string,
        unit: string,
        manufacturer: string,
        status: number,
    },
    productPrice: {
        price: number,
        price_date_time: string,
    },
    productImage: {
        path: string,
    }
}

interface IProps {
    isLogIn: boolean
}

function AddProduct({ isLogIn } : IProps) {

    useEffect(() => {
        // console.log(isLogIn)
        if(!isLogIn) navigate('/log-in')
    }, [])

    const [product, setProduct] = useState<IState['product']>({
        name: '',
        description: '',
        unit: '',
        manufacturer: '',
        status: 1,
    })
    const [productPrice, setProductPrice] = useState<IState['productPrice']>({
        price: 0,
        price_date_time: '',
    })
    const [productImage1, setProductImage1] = useState<IState['productImage']>({
        path: '',
    })
    const [productImage2, setProductImage2] = useState<IState['productImage']>({
        path: '',
    })
    const [productImage3, setProductImage3] = useState<IState['productImage']>({
        path: '',
    })

    const navigate = useNavigate()

    const handleInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target

        setProduct({...product, [name]: value})
        setProductPrice({...productPrice, [name]: value})
        setProductImage1({...productImage1, [name]: value})
        setProductImage2({...productImage2, [name]: value})
        setProductImage3({...productImage3, [name]: value})

        navigate('/product')
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        // console.log(productPrice)

        await axios.post('http://localhost:8080/addProduct', product)
        await axios.post('http://localhost:8080/addProductPrice', productPrice)
        await axios.post('http://localhost:8080/addProductImage', productImage1)
        await axios.post('http://localhost:8080/addProductImage', productImage2)
        await axios.post('http://localhost:8080/addProductImage', productImage2)
    }

    return ( 
        <div className='add-prd-wrapper'>
            <form className='add-prd-form'>
                <h2 className='add-prd-title'>Thêm sản phẩm mới</h2>
                <Row style={{marginBottom: 5}}>
                    <div className='col-md-2 add-prd-col'>
                        <label className='add-prd-label'>Tên sản phẩm</label>
                    </div>
                    <div className='col-md-4'>
                        <input className='add-prd-input' type='text' name='name' onChange={(e) => handleInput(e)} />
                    </div>
                    <div className='col-md-2 add-prd-col'>
                        <label className='add-prd-label'>Đơn vị</label>
                    </div>
                    <div className='col-md-4'>
                        <input className='add-prd-input' type='text' name='unit' onChange={(e) => handleInput(e)} />   
                    </div>
                </Row>
                <Row style={{marginBottom: 5}}>
                    <div className='col-md-2 add-prd-col'>
                        <label className='add-prd-label'>Nhà sản xuất</label>
                    </div>
                    <div className='col-md-4'>
                        <input className='add-prd-input' type='text' name='manufacturer' onChange={(e) => handleInput(e)} />
                    </div>
                    <div className='col-md-2 add-prd-col'>
                        <label className='add-prd-label'>Tình trạng</label>
                    </div>
                    <div className='col-md-4'>
                        <select style={{width: '100%', padding: 5}} name='status' onChange={(e) => handleInput(e)}>
                            <option value={1}>Đang kinh doanh</option>
                            <option value={0}>Tạm ngưng</option>
                            <option value={-1}>Ngừng kinh doanh</option>
                        </select>
                    </div>
                </Row>
                <Row>
                    <div className='col-md-3 add-prd-col'>
                        <label className='add-prd-label'>Mô tả sản phẩm</label>
                    </div>
                    <div className='col-md-9'>
                        <input className='add-prd-input' type='text' name='description' onChange={(e) => handleInput(e)} />
                    </div>
                </Row>
                <Row>
                    <div className='col-md-2 add-prd-col'>
                        <label className='add-prd-label'>Giá</label>
                    </div>
                    <div className='col-md-4'>
                        <input className='add-prd-input' type='text' name='price' onChange={(e) => handleInput(e)} />
                    </div>
                    <div className='col-md-2 add-prd-col'>
                        <label className='add-prd-label'>Thời điểm</label>
                    </div>
                    <div className='col-md-4'>
                        <input className='add-prd-input' type='datetime-local' name='price_date_time' onChange={(e) => handleInput(e)} />
                    </div>
                <Row>
                    <div className='col-md-3 add-prd-col'>
                        <label className='add-prd-label'>Ghi chú</label>
                    </div>
                    <div className='col-md-9'>
                        <input className='add-prd-input' type='text' name='note' onChange={(e) => handleInput(e)} />
                    </div>
                </Row>
                </Row>
                <Row style={{display: 'flex', justifyContent: 'center', marginBottom: 5}}>
                    <div className='col-md-3 add-prd-col'>
                        <label className='add-prd-label'>Hình ảnh sản phẩm</label>
                    </div>
                    <div className='col-md-9'>
                        <input className='add-prd-input' type='text' name='path' onChange={(e) => handleInput(e)} />
                        <input className='add-prd-input' type='text' name='path' onChange={(e) => handleInput(e)} />
                        <input className='add-prd-input' type='text' name='path' onChange={(e) => handleInput(e)} />
                    </div>
                </Row>
                <button onClick={(e) => handleSubmit(e)}>Submit</button>
            </form>

        </div>
     );
}

export default AddProduct;