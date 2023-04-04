import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import { ReactComponent as CrwnLogo } from "../../../assets/crown.svg";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/user/user.selector";
import {
  NavigationContainer,
  Logo,
  NavLink,
  NavLinks,
} from "./navigation.styles.jsx";
import { signOutUser } from "../../../utlis/firebase/firebase.utils";
import CartIcon from "../../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../../components/card-dropdown/card-dropdown.component";
import { selectIsCartOpen } from "../../../store/cart/cart.selector";
const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  return (
    <Fragment>
      <NavigationContainer>
        <Logo className="nav-link" to="/">
          <CrwnLogo className="logo" />
        </Logo>
        <NavLinks>
          <NavLink to="/shop">Shop</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">Sign In</NavLink>
          )}
          <CartIcon></CartIcon>
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
