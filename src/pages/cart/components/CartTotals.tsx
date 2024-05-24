import { useRecoilValue } from 'recoil';
import { totalOrderAmountState } from '../../../store/selectors';
import NoticeLabel from '../../../components/common/NoticeLabel/NoticeLabel';
import SubtitleSpaceBetween from '../../../components/common/SubtitleSpaceBetween/SubtitleSpaceBetween';
import Divider from '../../../components/common/Divider/Divider';

import formatKoreanCurrency from '../../../utils/formatKoreanCurrency';
import { NOTICE_MESSAGE } from '../../../constants/messages';
import styles from '../Cart.module.css';

export default function CartTotals() {
  const { orderAmount, deliveryCharge, totalAmount } = useRecoilValue(totalOrderAmountState);
  return (
    <div className={styles.cartTotalsContainer}>
      <NoticeLabel>{NOTICE_MESSAGE.shipping}</NoticeLabel>
      <Divider />
      <SubtitleSpaceBetween subtitle="주문 금액" content={`${formatKoreanCurrency(orderAmount)}`} />
      <SubtitleSpaceBetween subtitle="배송비" content={`${formatKoreanCurrency(deliveryCharge)}`} />
      <Divider />
      <SubtitleSpaceBetween
        subtitle="총 결제 금액"
        content={`${formatKoreanCurrency(totalAmount)}`}
      />
    </div>
  );
}
