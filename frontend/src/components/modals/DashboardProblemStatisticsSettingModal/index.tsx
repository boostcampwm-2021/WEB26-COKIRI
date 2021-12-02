import { useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import ModalCommon from 'src/components/modals/Common';
import InputCommon from 'src/components/inputs/Common';
import { Row } from 'src/components/Grid';

import { DASHBOARD_PROBLEM_STATISTICS_SETTING_MODAL_WIDTH } from 'src/globals/constants';

import userAtom from 'src/recoil/user';

import { Fetcher } from 'src/utils';

import { StatisticsType } from 'src/types';

import { Label } from './style';

interface Props {
  onClose: VoidFunction;
  onUpdate: Function;
}

function DashboardProblemStatisticsSettingModal({ onClose, onUpdate }: Props) {
  const user = useRecoilValue(userAtom);

  const [username, setUsername] = useState<string>('');
  const { mutate } = useMutation(() => Fetcher.putProblemStatistics(user, username), {
    onSuccess: (newStatistics: StatisticsType) => {
      onUpdate(newStatistics);
      onClose();
    },
  });

  const handleConfirm = () => {
    mutate();
  };

  return (
    <ModalCommon
      width={DASHBOARD_PROBLEM_STATISTICS_SETTING_MODAL_WIDTH}
      onConfirm={handleConfirm}
      onClose={onClose}
      confirm='업데이트'
      close='취소'
    >
      <Row>
        <Label>username</Label>
        <InputCommon bind={[username, setUsername]} title='username' />
      </Row>
    </ModalCommon>
  );
}

DashboardProblemStatisticsSettingModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default DashboardProblemStatisticsSettingModal;
