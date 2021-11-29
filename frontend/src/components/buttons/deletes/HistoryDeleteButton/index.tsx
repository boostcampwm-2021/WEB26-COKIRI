import { useMutation } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import DeleteCommon from 'src/components/buttons/deletes/Common';

import userAtom from 'src/recoil/user';
import { dashboardHistoriesSelector } from 'src/recoil/dashboardUserInfo';

import { Fetcher } from 'src/utils';

interface Props {
  content: string;
  historyID: string;
}

function HistoryDeleteButton({ historyID, content }: Props) {
  const user = useRecoilValue(userAtom);
  const [dashboardHistories, setDashboardHistories] = useRecoilState(dashboardHistoriesSelector);

  const { mutate } = useMutation(() => Fetcher.deleteDashboardHistory(user, historyID), {
    onSuccess: () => {
      setDashboardHistories([...dashboardHistories].filter((history) => history._id !== historyID));
    },
  });

  const handleClick = () => {
    mutate();
  };

  return <DeleteCommon onClick={handleClick} content={content} />;
}

HistoryDeleteButton.propTypes = {
  content: PropTypes.string.isRequired,
  historyID: PropTypes.string.isRequired,
};

export default HistoryDeleteButton;
