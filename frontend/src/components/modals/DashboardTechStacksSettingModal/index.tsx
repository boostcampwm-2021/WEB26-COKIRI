import { useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IoMdSearch } from 'react-icons/io';
import PropTypes from 'prop-types';

import ModalCommon from 'src/components/modals/Common';
import InputCommon from 'src/components/inputs/Common';
import IconButton from 'src/components/buttons/IconButton';
import SearchedTechStacksModal from 'src/components/modals/SearchedTechStacksModal';
import TechStackDeleteButton from 'src/components/buttons/deletes/TechStackDeleteButton';
import { Row, Col } from 'src/components/Grid';

import {
  DASHBOARD_TECH_STACK_SETTING_MODAL_WIDTH,
  DASHBOARD_TECH_STACK_INPUT_WIDTH,
} from 'src/globals/constants';

import userAtom from 'src/recoil/user';
import dashboardUserInfoAtom, { dashboardHistoriesSelector } from 'src/recoil/dashboardUserInfo';

import { StackType } from 'src/types';

import { Fetcher } from 'src/utils';

import { Label, Stacks, Stack } from './style';

interface Props {
  onClose: VoidFunction;
}

function DashboardTechStacksSettingModal({ onClose }: Props) {
  const user = useRecoilValue(userAtom);
  const [dashboardUserInfo, setDashboardUserInfo] = useRecoilState(dashboardUserInfoAtom);
  const dashboardHistories = useRecoilValue(dashboardHistoriesSelector);
  const [techStacks, setTechStacks] = useState<{ [field: string]: StackType[] }>(
    dashboardUserInfo.techStacks ?? {},
  );
  const [newField, setNewField] = useState('');
  const [techStack, setTechStack] = useState('');
  const [isModalShow, setIsModalShow] = useState(false);
  const fields = Object.keys(techStacks);
  const { mutate } = useMutation(
    () => Fetcher.putDashboardUserInfo(user, { ...dashboardUserInfo, techStacks }),
    {
      onSuccess: (dashboard) => {
        setDashboardUserInfo({ ...dashboard, dashboardHistories });
        onClose();
      },
    },
  );

  const handleConfirm = () => {
    mutate();
  };

  const switchIsModalShow = () => {
    setIsModalShow((prevState) => !prevState);
  };

  const handleSelect = (newTechStack: StackType) => {
    const newTechStacks = { ...techStacks };
    if (newTechStacks[newField]) {
      newTechStacks[newField] = [...newTechStacks[newField], newTechStack];
    } else {
      newTechStacks[newField] = [newTechStack];
    }
    setNewField('');
    setTechStack('');
    setTechStacks(newTechStacks);
  };

  const handleDeleteTechStack = (whichField: string, deletedTechStack: string) => {
    setTechStacks((prevState) => {
      const deletedTechStacks = { ...prevState };
      const deletedField = [...deletedTechStacks[whichField]].filter(
        (stack) => stack.techStack !== deletedTechStack,
      );
      if (!deletedField.length) {
        delete deletedTechStacks[whichField];
      } else {
        deletedTechStacks[whichField] = deletedField;
      }
      return deletedTechStacks;
    });
  };

  return (
    <ModalCommon
      width={DASHBOARD_TECH_STACK_SETTING_MODAL_WIDTH}
      onConfirm={handleConfirm}
      onClose={onClose}
      confirm='저장'
      close='취소'
      title='Tech Stacks'
    >
      <Row>
        <Col>
          <Row alignItems='center'>
            <Label>field</Label>
            <InputCommon
              bind={[newField, setNewField]}
              placeholder=''
              width={DASHBOARD_TECH_STACK_INPUT_WIDTH}
              title='field'
            />
          </Row>
          <Row alignItems='center'>
            <Label>tech stack</Label>
            <InputCommon
              bind={[techStack, setTechStack]}
              placeholder=''
              width={DASHBOARD_TECH_STACK_INPUT_WIDTH}
              title='tech-stack'
            />
            <IconButton onClick={switchIsModalShow} title='search'>
              <IoMdSearch />
            </IconButton>
            {isModalShow && (
              <SearchedTechStacksModal
                techStack={techStack}
                onClose={switchIsModalShow}
                onSelect={handleSelect}
              />
            )}
          </Row>
        </Col>
        <Col>
          {fields.map((field) => (
            <Col key={field} alignItems='center'>
              <p>{field}</p>
              <Stacks>
                {techStacks[field].map((stack) => (
                  <Row key={stack.techStack} alignItems='center'>
                    <Stack color={stack.color!}>{stack.techStack}</Stack>
                    <TechStackDeleteButton
                      techStack={stack.techStack!}
                      field={field}
                      onDeleteTechStack={handleDeleteTechStack}
                    />
                  </Row>
                ))}
              </Stacks>
            </Col>
          ))}
        </Col>
      </Row>
    </ModalCommon>
  );
}

DashboardTechStacksSettingModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default DashboardTechStacksSettingModal;
