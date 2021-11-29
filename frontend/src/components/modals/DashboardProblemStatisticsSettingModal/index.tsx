import { useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import ModalCommon from 'src/components/modals/Common';
import InputCommon from 'src/components/inputs/Common';
import { Row } from 'src/components/Grid';

import userAtom from 'src/recoil/user';

import { Fetcher } from 'src/utils';

import { StatisticsType } from 'src/types';

import { Label } from './style';

interface Props {
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onUpdate: (newStatistics: StatisticsType) => void;
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
      width={800}
      onConfirm={handleConfirm}
      onClose={onClose}
      confirm='업데이트'
      close='취소'
    >
      <Row>
        <Label>username</Label>
        <InputCommon bind={[username, setUsername]} />
      </Row>
    </ModalCommon>
  );
}

DashboardProblemStatisticsSettingModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default DashboardProblemStatisticsSettingModal;
