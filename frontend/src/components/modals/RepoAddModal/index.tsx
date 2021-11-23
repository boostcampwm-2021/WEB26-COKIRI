import ModalCommon from 'src/components/modals/Common';

interface Props {
  onClose: () => void;
}

function RepoAddModal({ onClose }: Props) {
  const onHistoryWrite = () => {};
  return (
    <ModalCommon onConfirm={onHistoryWrite} onClose={onClose} confirm='저장' close='취소'>
      레포 추가
    </ModalCommon>
  );
}

export default RepoAddModal;
