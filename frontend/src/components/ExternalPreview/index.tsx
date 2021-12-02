import PropTypes from 'prop-types';

import RepoContent from 'src/components/contents/RepoContent';
import ProblemContent from 'src/components/contents/ProblemContent';
import BlogContent from 'src/components/contents/BlogContent';
import ButtonCommon from 'src/components/buttons/Common';

import { ExternalType, ProblemInfoType, RepoInfoType } from 'src/types';

import { Cover, LinkButton, Wrapper, ButtonHolder } from './style';

interface Props {
  external: ExternalType;
  onDelete: VoidFunction;
}

function ExternalPreview({ external, onDelete }: Props) {
  const { title, content, info, link, type } = external;
  if (!type) {
    return null;
  }
  return (
    <Wrapper>
      <Cover />
      {type === 'repository' && (
        <RepoContent
          title={title ?? ''}
          content={content ?? ''}
          info={info as RepoInfoType}
          link={link}
        />
      )}
      {type === 'problem' && (
        <ProblemContent
          title={title ?? ''}
          content={content ?? ''}
          info={info as ProblemInfoType}
          link={link}
        />
      )}
      {type === 'tistory' && (
        <BlogContent title={title ?? ''} content={content ?? ''} link={link} />
      )}
      <LinkButton href={external.link} target='_blank' rel='noreferrer noopener'>
        바로가기
      </LinkButton>
      <ButtonHolder onClick={onDelete}>
        <ButtonCommon title='delete'>삭제</ButtonCommon>
      </ButtonHolder>
    </Wrapper>
  );
}

ExternalPreview.propTypes = {
  external: PropTypes.objectOf(PropTypes.any),
  onDelete: PropTypes.func.isRequired,
};

ExternalPreview.defaultProps = {
  external: {},
};

export default ExternalPreview;
