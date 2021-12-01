import PropTypes from 'prop-types';

import ButtonCommon from 'src/components/buttons/Common';

interface Props {
  postID: string;
  likeCount: number;
  onLikes: Function;
}

function LikesButton({ postID, likeCount, onLikes }: Props) {
  const handleClick = () => onLikes(postID);
  return (
    <ButtonCommon onClick={handleClick} title='like-list'>
      좋아요 {likeCount}개
    </ButtonCommon>
  );
}

LikesButton.propTypes = {
  postID: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  onLikes: PropTypes.func,
};

LikesButton.defaultProps = {
  onLikes: () => {},
};

export default LikesButton;
