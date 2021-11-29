import { useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import ModalCommon from 'src/components/modals/Common';
import InputCommon from 'src/components/inputs/Common';
import { Col, Row } from 'src/components/Grid';

import { HISTORY_INPUT_WIDTH } from 'src/globals/constants';

import userAtom from 'src/recoil/user';
import { dashboardHistoriesSelector } from 'src/recoil/dashboardUserInfo';

import { Fetcher } from 'src/utils';

import { Label } from './style';

interface Props {
  onClose: VoidFunction;
}

function DashboardHistoryAddModal({ onClose }: Props) {
  const user = useRecoilValue(userAtom);
  const [dashboardHistories, setDashboardHistories] = useRecoilState(dashboardHistoriesSelector);
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');

  const { mutate } = useMutation(() => Fetcher.postDashboardHistory(user, content, date), {
    onSuccess: (data) => {
      setDashboardHistories([...dashboardHistories, data]);
      onClose();
    },
  });

  const handleConfirm = () => {
    mutate();
  };

  return (
    <ModalCommon onConfirm={handleConfirm} onClose={onClose} confirm='저장' close='취소'>
      <Col>
        <Row>
          <Label>date</Label>
          <InputCommon bind={[date, setDate]} width={HISTORY_INPUT_WIDTH} />
        </Row>
        <Row>
          <Label>content</Label>
          <InputCommon bind={[content, setContent]} width={HISTORY_INPUT_WIDTH} />
        </Row>
      </Col>
    </ModalCommon>
  );
}

DashboardHistoryAddModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default DashboardHistoryAddModal;
