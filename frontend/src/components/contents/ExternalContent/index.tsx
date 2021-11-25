import { useState } from 'react';

import RepoContent from 'src/components/contents/RepoContent';
import BlogContent from 'src/components/contents/BlogContent';
import ProblemContent from 'src/components/contents/ProblemContent';

import { ExternalType, ProblemInfoType, RepoInfoType } from 'src/types';

import { Wrapper, Cover, MoreButton, LinkButton } from './style';

interface Props {
  external: ExternalType;
}

function ExternalContent({ external }: Props) {
  const [isExpand, setIsExpand] = useState(false);
  const handleMoreClick = () => {
    setIsExpand(true);
  };
  const { title, content, info, link } = external;
  return (
    <Wrapper expanded={isExpand}>
      <Cover hidden={isExpand} />
      {!isExpand && <MoreButton onClick={handleMoreClick}>더보기</MoreButton>}
      {!isExpand && (
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

export default ExternalContent;
