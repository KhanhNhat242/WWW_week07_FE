import './Header.scss'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'

interface IProps{
    isLogIn: boolean,
    setIsLogIn: React.Dispatch<React.SetStateAction<boolean>>
}

function Header({isLogIn, setIsLogIn}: IProps) {

    const handleSignOut = () => {
        if(isLogIn) setIsLogIn(false)
    }

    return ( 
        <>
            <Navbar expand="lg" className="bg-body-tertiary nav-wrapper">
                <Navbar.Brand href="/">TRANG CHỦ</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='nav-right'>
                    <Nav className="me-auto">
                        <Link className='nav-item' to='/product-manager' style={{display: `${isLogIn ? 'block' : 'none'}`}}>Chỉnh sửa sản phẩm</Link>
                        <Link className='nav-item' to="/product">Sản phẩm</Link>
                        <Link className='nav-item' to="/shopping-cart"><FontAwesomeIcon icon={faCartShopping} /></Link>
                        <Link className='nav-item' to="/log-in" onClick={handleSignOut}>{!isLogIn ? 'Đăng nhập' : 'Đăng xuất'}</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
     );
}

export default Header;