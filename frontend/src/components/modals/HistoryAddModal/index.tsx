import ModalCommon from 'src/components/modals/Common';

interface Props {
  onClose: () => void;
}

function HistoryAddModal({ onClose }: Props) {
  const onHistoryWrite = () => {};
  return (
    <ModalCommon onConfirm={onHistoryWrite} onClose={onClose} confirm='저장' close='취소'>
      히스토리 추가
    </ModalCommon>
  );
}

export default HistoryAddModal;
