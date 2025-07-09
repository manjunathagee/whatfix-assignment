declare module 'headerMfe/Header' {
  interface HeaderProps {
    title?: string;
    cartCount?: number;
    onCategoryClick?: (category: string) => void;
    onCartClick?: () => void;
    onUserSwitch?: (userId: string) => void;
    currentUser?: string;
    theme?: 'light' | 'dark';
  }

  const Header: React.ComponentType<HeaderProps>;
  export default Header;
}

declare module 'leftNavMfe/LeftNav' {
  interface NavigationItem {
    id: string;
    label: string;
    icon: string;
    url: string;
    badge?: number;
  }

  interface LeftNavProps {
    items?: NavigationItem[];
    activeItem?: string;
    onItemClick?: (item: NavigationItem) => void;
    theme?: 'light' | 'dark';
  }

  const LeftNav: React.ComponentType<LeftNavProps>;
  export default LeftNav;
}

declare module 'cartMfe/Cart' {
  const Cart: React.ComponentType;
  export default Cart;
}

declare module 'ordersMfe/Orders' {
  const Orders: React.ComponentType;
  export default Orders;
}

declare module 'profileMfe/Profile' {
  const Profile: React.ComponentType;
  export default Profile;
}

declare module 'checkoutMfe/Checkout' {
  const Checkout: React.ComponentType;
  export default Checkout;
}

declare module 'paymentMfe/Payment' {
  const Payment: React.ComponentType;
  export default Payment;
}