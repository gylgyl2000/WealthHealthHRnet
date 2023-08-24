import { Navbar, Nav } from 'rsuite'
import { useNavigate, Link } from 'react-router-dom'
import { forwardRef, useEffect, useState } from 'react'
import { HandleThemeButton } from '../../components/Buttons'

export default function Header({ handle }) {
    const [connected, setConnected] = useState(false)
    const navigate = useNavigate()
    function logIn() {
        setConnected(!connected)
    }

    useEffect(() => {
        if (!connected) {
            navigate('/WealthHealthHRnet/')
        }
    }, [connected, navigate])

    const NavLink = forwardRef(({ href, children, ...rest }, ref) => (
        <Link ref={ref} to={href} {...rest}>
            {children}
        </Link>
    ));

    return (
        <Navbar appearance="inverse">
            <Navbar.Brand as={NavLink} href='/WealthHealthHRnet/'>
                <span style={{ fontSize: '1.7rem', top: '-10px', position: 'relative', fontWeight: 'bold'}}>HRnet</span>
            </Navbar.Brand>
            {connected ? (
                <>
                    <Nav>
                        <Nav.Item as={NavLink} href='/WealthHealthHRnet/create-employee'>Create Employee</Nav.Item>
                        <Nav.Item as={NavLink} href='/WealthHealthHRnet/current-employees'>Current Employees</Nav.Item>
                    </Nav>
                    <HandleThemeButton handle={handle} />
                    <Nav pullRight>
                        <Nav.Item onSelect={logIn}>Log out</Nav.Item>
                    </Nav>
                </>

            ) : (
                <>
                <HandleThemeButton handle={handle} />
                <Nav pullRight>
                    <Nav.Item onSelect={logIn}>Sign in</Nav.Item>
                </Nav>
                </>
            )}
        </Navbar>
    )
}