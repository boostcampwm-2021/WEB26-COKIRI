import PropTypes from 'prop-types';

import { moment } from 'src/utils';

import { Time } from './style';

interface Props {
  time: string;
}

function TimeFromNow({ time }: Props) {
  const ago = moment.getFromNow(time);
  return <Time>{ago}</Time>;
}

TimeFromNow.propTypes = {
  time: PropTypes.string.isRequired,
};

export default TimeFromNow;
