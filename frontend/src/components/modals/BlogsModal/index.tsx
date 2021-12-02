import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import ModalCommon from 'src/components/modals/Common';
import ButtonCommon from 'src/components/buttons/Common';
import NavigateIconButton from 'src/components/buttons/NavigateIconButton';
import { Col } from 'src/components/Grid';

import { Fetcher } from 'src/utils';

import userAtom from 'src/recoil/user';

import { Wrapper, Blogs } from './style';

interface Props {
  onSelect: Function;
  onClose: VoidFunction;
}

function BlogsModal({ onClose, onSelect }: Props) {
  const user = useRecoilValue(userAtom);
  const { hasExternalBlog } = user;

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { data: blogs } = useQuery(['blogs', user._id], () => Fetcher.getUserBlogs(user));

  const handleConfirm = () => {
    onSelect(blogs![selectedIndex]);
  };

  const handleBlogClick = (index: number) => {
    if (index === selectedIndex) {
      setSelectedIndex(-1);
    } else {
      setSelectedIndex(index);
    }
  };

  return (
    <Wrapper>
      <ModalCommon
        onClose={onClose}
        close='취소'
        confirm='선택'
        onConfirm={handleConfirm}
        disabled={selectedIndex === -1}
        title={hasExternalBlog ? '게시글을 선택하세요' : '연동된 블로그가 없습니다'}
      >
        {hasExternalBlog ? (
          <Blogs>
            {(blogs ?? []).map(({ postID, postTitle }, index) => (
              <Col key={postID}>
                <ButtonCommon
                  onClick={() => handleBlogClick(index)}
                  clicked={index === selectedIndex}
                  title='blog'
                >
                  {postTitle}
                </ButtonCommon>
              </Col>
            ))}
          </Blogs>
        ) : (
          <NavigateIconButton href={`/users/${user.username}/settings`} title='external-auth'>
            연동하러 가기
          </NavigateIconButton>
        )}
      </ModalCommon>
    </Wrapper>
  );
}

BlogsModal.propTyes = {
  onClose: PropTypes.func.isRequired,
};

export default BlogsModal;
