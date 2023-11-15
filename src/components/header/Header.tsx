import './Header.scss'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import {Navbar, Container, Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

interface IProps{
    isLogIn: boolean,
    setIsLogIn: React.Dispatch<React.SetStateAction<boolean>>,
    count: number
}

function Header({isLogIn, setIsLogIn, count}: IProps) {

    const handleSignOut = () => {
        if(isLogIn) setIsLogIn(false)
    }

    return ( 
        <>
            <Navbar expand="lg" className="bg-body-tertiary nav-wrapper">
                <Container>
                    <Link to="/">TRANG CHỦ</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='nav-right'>
                    <Nav className="me-auto">
                            <Link className='nav-item' to='/product-manager' style={{display: `${isLogIn ? 'block' : 'none'}`}}>Chỉnh sửa sản phẩm</Link>
                            <Link className='nav-item' to="/product">Sản phẩm</Link>
                            <Link className='nav-item' to="/shopping-cart"><FontAwesomeIcon icon={faCartShopping} /> <span className='quantity'>{count}</span> </Link>
                            <Link className='nav-item' to="/log-in" onClick={handleSignOut}>{!isLogIn ? 'Đăng nhập' : 'Đăng xuất'}</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
     );
}

export default Header;