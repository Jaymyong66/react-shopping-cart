import { useRecoilValue } from 'recoil';
import { isCheckedState, mockCoupons, productsState } from './../../store/atoms';
import { totalOrderAmountState } from '../../store/selectors';
import {
  isOverMinOrderAmountCoupon,
  isOverMinQuantityCoupon,
  isWithinAvailableTime,
  validateExpiration,
} from './useAvailableCouponList.util';

const useAvailableCouponList = () => {
  const { orderAmount } = useRecoilValue(totalOrderAmountState);
  const coupons = mockCoupons;
  const products = useRecoilValue(productsState);
  const isCheckedMap = useRecoilValue(isCheckedState);
  const checkoutProducts = products.filter((product) => isCheckedMap[product.id] === true);

  const availableCoupons = coupons.filter((coupon) => {
    if (validateExpiration(coupon.expirationDate) === false) return false;
    if (coupon.minimumAmount) {
      return isOverMinOrderAmountCoupon(orderAmount, coupon);
    }
    if (coupon.buyQuantity && coupon.getQuantity) {
      return isOverMinQuantityCoupon(checkoutProducts, coupon.buyQuantity + coupon.getQuantity);
    }
    if (coupon.availableTime) {
      return isWithinAvailableTime(coupon);
    }
    return false;
  });
  const unAvailableCoupons = coupons.filter((coupon) => !availableCoupons.includes(coupon));

  return { availableCoupons, unAvailableCoupons };
};

export default useAvailableCouponList;
