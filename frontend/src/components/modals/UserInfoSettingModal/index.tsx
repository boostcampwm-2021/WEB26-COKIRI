import ModalCommon from 'src/components/modals/Common';

interface Props {
  onClose: () => void;
}

function UserInfoSettingModal({ onClose }: Props) {
  const onUserInfoSetting = () => {};
  return (
    <ModalCommon onConfirm={onUserInfoSetting} onClose={onClose} confirm='저장' close='취소'>
      유저 정보 수정
    </ModalCommon>
  );
}

export default UserInfoSettingModal;
