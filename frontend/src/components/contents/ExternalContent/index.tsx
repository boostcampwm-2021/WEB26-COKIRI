import { useState } from 'react';
import PropTypes from 'prop-types';

import RepoContent from 'src/components/contents/RepoContent';
import BlogContent from 'src/components/contents/BlogContent';
import ProblemContent from 'src/components/contents/ProblemContent';

import { ExternalType, ProblemInfoType, RepoInfoType } from 'src/types';

import { Wrapper, Cover, MoreButton, LinkButton } from './style';

interface Props {
  widthExpanded?: boolean;
  external: ExternalType;
}

function ExternalContent({ external, widthExpanded }: Props) {
  const [isHeightExpand, setIsHeightExpand] = useState(false);
  const handleMoreClick = () => {
    setIsHeightExpand(true);
  };
  const { title, content, info, link } = external;
  return (
    <Wrapper heightExpanded={isHeightExpand} widthExpanded={widthExpanded!}>
      <Cover hidden={isHeightExpand} />
      {!isHeightExpand && <MoreButton onClick={handleMoreClick}>더보기</MoreButton>}
      {!isHeightExpand && (
        <LinkButton href={external.link} target='_blank' rel='noreferrer noopener'>
          바로가기
        </LinkButton>
      )}
      {(() => {
        if (external.type === 'problem') {
          return (
            <ProblemContent
              title={title ?? ''}
              content={content ?? ''}
              info={info! as ProblemInfoType}
              link={link}
            />
          );
        }
        if (external.type === 'repository') {
          return (
            <RepoContent
              title={title ?? ''}
              content={content ?? ''}
              info={info! as RepoInfoType}
              link={link}
            />
          );
        }
        if (external.type === 'tistory') {
          return <BlogContent title={title ?? ''} content={content ?? ''} link={link} />;
        }
        return null;
      })()}
    </Wrapper>
  );
}

ExternalContent.propTypes = {
  widthExpanded: PropTypes.bool,
  external: PropTypes.objectOf(PropTypes.any).isRequired,
};

ExternalContent.defaultProps = {
  widthExpanded: false,
};

export default ExternalContent;
