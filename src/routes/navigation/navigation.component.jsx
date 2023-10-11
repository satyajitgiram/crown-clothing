import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import {NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles.jsx';
import Path2Fashion from '../../assets/path2fashion-logo.png';

const Navigation = () =>{

    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    console.log(currentUser);

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <img src={Path2Fashion} className="logo" alt="Path2Fashion Logo"/>
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/shop">
                        SHOP
                    </NavLink>
                    { currentUser ? (
                        <NavLink  as='span' onClick={signOutUser} >SIGN OUT</NavLink>
                    ) : (<NavLink to="/auth">
                        SIGN IN
                    </NavLink>
                    )}
                    <CartIcon/>
                </NavLinks>
                { isCartOpen && <CartDropdown/> }
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation