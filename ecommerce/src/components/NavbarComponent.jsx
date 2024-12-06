import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import AnimationIcon from '@mui/icons-material/Animation';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { AdminContext } from '../contexts/AdminContext';
import axios from 'axios'
import { CartContext } from '../contexts/CartContext';

function NavbarComponent() {
    const { user, userLogout } = React.useContext(UserContext);
    const { admin, adminLogout } = React.useContext(AdminContext);
    const { cartQty, setCartQty } = React.useContext(CartContext);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [isUser, setIsUser] = React.useState(localStorage.getItem('currentUser') || user)
    const [isAdmin, setIsAdmin] = React.useState(localStorage.getItem('currentAdmin') || admin)
    // const [cartCount, setCartCount] = React.useState(0);
    const pages = [{ name: 'Products', path: isAdmin ? "/admin/product" : "/" }, { name: 'About', path: isAdmin ? "/admin/about" : '/about' }, { name: 'Blog', path: '/blog' }];
    const settings = [{ name: 'Profile', path: "/profile" }, { name: 'Account', path: "/account" }, { name: 'Logout', path: "/logout" }];
    const [cartCount, setCartCount] = React.useState(0);
    const navigate = useNavigate()
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (path) => {
        navigate(path)
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const signup = () => {
        navigate("/signup")
    }
    const login = () => {
        navigate("/login")
    }


    // // Logout Function
    const logoutUser = () => {


        if (isUser) {

            console.log("User logged")
            userLogout()
            navigate("/login")
        } else if (isAdmin) {
            console.log("Admin logged")
            adminLogout()
            navigate("/admin")
        }
        handleCloseUserMenu()

    };

    React.useEffect(() => {
        if (isUser) {
            const userId = JSON.parse(localStorage.getItem('currentUser'))._id; // Adjust based on your user data structure
            axios.get(`http://localhost:3000/api/cart/${userId}`)
                .then(response => {
                    setCartQty(response.data.cart.items.length)
                    console.log("---",cartQty);
                })
                .catch(err => console.error('Error fetching cart data:', err));
        }
    }, [isUser]);
    return (
        <>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "black" }}>
                <Container maxWidth="xl" >
                    <Toolbar disableGutters>
                        <AnimationIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            NEXTBUY
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.name} onClick={() => handleCloseNavMenu(page.path)}>
                                        <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page.name}
                                    onClick={() => handleCloseNavMenu(page.path)}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>

                        {isUser && (
                            <IconButton
                                size="large"
                                aria-label="show cart items"
                                color="inherit"
                                onClick={() => navigate('/cart')}
                                sx={{marginRight:2}}
                            >
                                <Badge badgeContent={cartQty} color="error">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        )}
                        {isUser || isAdmin ? <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={isUser.firstName} src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting.name} onClick={() => { setting.name === "Logout" ? logoutUser() : navigate(setting.path) }}>
                                        <Typography sx={{ textAlign: 'center' }}>{setting.name}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box> :
                            <Box sx={{ flexGrow: 0 }}>
                                <Button variant="outlined" onClick={signup} sx={{ marginRight: 1 }} color='black'>Signup</Button>
                                <Button variant="outlined" onClick={login} color='black'>Login</Button>
                            </Box>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}
export default NavbarComponent;