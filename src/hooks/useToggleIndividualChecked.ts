import { useRecoilState } from 'recoil';
import { isCheckedState } from '../store/atoms';
import areAllItemsChecked from '../utils/areAllItemsChecked';

type HookProps = {
  id: number;
  setAllChecked: (allChecked: boolean) => void;
};

const useToggleIndividualChecked = ({ id, setAllChecked }: HookProps) => {
  const [isCheckedMap, setIsCheckedMap] = useRecoilState(isCheckedState);
  const isChecked = isCheckedMap[id];

  const handleToggleSelect = (id: number) => {
    const newIsChecked = !isChecked;
    const newAtom = {
      ...isCheckedMap,
      [id]: newIsChecked,
    };
    const isAllChecked = areAllItemsChecked(newAtom);

    setIsCheckedMap(newAtom);
    setAllChecked(isAllChecked);
  };

  return { handleToggleSelect };
};

export default useToggleIndividualChecked;
