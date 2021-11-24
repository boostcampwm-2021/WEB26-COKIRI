import { useMutation } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import ModalCommon from 'src/components/modals/Common';

import userAtom from 'src/recoil/user';
import { dashboardHistoriesSelector } from 'src/recoil/dashboardUserInfo';

import { Fetcher } from 'src/utils';

interface Props {
  onClose: () => void;
  historyID: string;
}

function DashboardHistoryDeleteModal({ onClose, historyID }: Props) {
  const user = useRecoilValue(userAtom);
  const [dashboardHistories, setDashboardHistories] = useRecoilState(dashboardHistoriesSelector);

  const { mutate } = useMutation(() => Fetcher.deleteDashboardHistory(user, historyID), {
    onSuccess: () => {
      setDashboardHistories([...dashboardHistories].filter((history) => history._id !== historyID));
      onClose();
    },
  });

  const handleConfirm = () => {
    mutate();
  };

  return (
    <ModalCommon onConfirm={handleConfirm} onClose={onClose} confirm='삭제' close='취소'>
      히스토리를 삭제하시겠습니까?
    </ModalCommon>
  );
}

DashboardHistoryDeleteModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  historyID: PropTypes.string.isRequired,
};

export default DashboardHistoryDeleteModal;
