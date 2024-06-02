import { useRecoilValue } from 'recoil';
import useLocalStorage from '@hooks/useLocalStorage';
import useNavigatePage from '@hooks/useNavigatePage';
import { fetchCartItemState } from '@store/productStore';
import Header from '@components/Header/Header';
import Button from '@components/common/Button';
import CartList from './components/CartList';
import CartTitle from './components/CartTitle';
import CartTotals from './components/CartTotals';
import ROUTES from '@constants/routes';
import styles from './Cart.module.css';

export default function CartPage() {
  const products = useRecoilValue(fetchCartItemState);
  const navigateCartPage = useNavigatePage(ROUTES.cart);
  const navigateCheckoutPage = useNavigatePage(ROUTES.checkout);

  useLocalStorage();
  return (
    <>
      <Header>
        <Button variant="header" onClick={navigateCartPage}>
          SHOP
        </Button>
      </Header>

      {products.length === 0 ? (
        <div className={styles.noneProductContainer}>장바구니에 담은 상품이 없습니다.</div>
      ) : (
        <>
          <div className={styles.cartBodyWrapper}>
            <CartTitle productsCount={products.length} />
            <CartList products={products} />
            <CartTotals />
          </div>
        </>
      )}
      <Button onClick={navigateCheckoutPage} variant="footer" disabled={products.length === 0}>
        주문 하기
      </Button>
    </>
  );
}
