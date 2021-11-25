import { useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import ModalCommon from 'src/components/modals/Common';
import InputCommon from 'src/components/inputs/Common';
import DashboardJobObjectives from 'src/components/DashboardJobObjectives';
import JobObjectiveAddButton from 'src/components/buttons/dashboardSettings/JobObjectiveAddButton';
import { Row, Col } from 'src/components/Grid';

import userAtom from 'src/recoil/user';
import dashboardUserInfoAtom from 'src/recoil/dashboardUserInfo';

import { Fetcher } from 'src/utils';

import { Label } from './style';

interface Props {
  onClose: () => void;
}

function DashboardLinkSettingModal({ onClose }: Props) {
  const user = useRecoilValue(userAtom);
  const [dashboardUserInfo, setDashboardUserInfo] = useRecoilState(dashboardUserInfoAtom);
  const [jobObjectives, setJobObjectives] = useState<string[]>(
    dashboardUserInfo.jobObjectives ?? [],
  );
  const [jobObjective, setJobObjective] = useState('');
  const [github, setGitHub] = useState(dashboardUserInfo.github ?? '');
  const [blog, setBlog] = useState(dashboardUserInfo.blog ?? '');
  const [solvedac, setSolvedac] = useState(dashboardUserInfo.solvedac ?? '');

  const { mutate } = useMutation(
    () =>
      Fetcher.putDashboardUserInfo(user, {
        ...dashboardUserInfo,
        jobObjectives,
        github,
        blog,
        solvedac,
      }),
    {
      onSuccess: (dashboard) => {
        setDashboardUserInfo(dashboard);
        onClose();
      },
    },
  );

  const handleConfirm = () => {
    mutate();
  };

  const handleAddJobObjective = () => {
    setJobObjectives((prevState) => [...prevState, jobObjective]);
  };

  const handleDeleteJobObjective = (deletedJobObjective: string) => {
    setJobObjectives((prevState) => [...prevState].filter((job) => deletedJobObjective !== job));
  };

  return (
    <ModalCommon
      width={1000}
      onConfirm={handleConfirm}
      onClose={onClose}
      confirm='저장'
      close='취소'
    >
      <Row>
        <Col>
          <Row>
            <Label>desired job</Label>
            <InputCommon bind={[jobObjective, setJobObjective]} placeholder='' />
            <JobObjectiveAddButton onAddJobObjective={handleAddJobObjective} />
          </Row>
          <Row>
            <Label>GitHub</Label>
            <InputCommon bind={[github, setGitHub]} placeholder={github} />
          </Row>
          <Row>
            <Label>blog</Label>
            <InputCommon bind={[blog, setBlog]} placeholder={blog} />
          </Row>
          <Row>
            <Label>solved.ac</Label>
            <InputCommon bind={[solvedac, setSolvedac]} placeholder={solvedac} />
          </Row>
        </Col>
        <DashboardJobObjectives
          jobObjectives={jobObjectives}
          onDeleteJobObjective={handleDeleteJobObjective}
        />
      </Row>
    </ModalCommon>
  );
}

DashboardLinkSettingModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default DashboardLinkSettingModal;
