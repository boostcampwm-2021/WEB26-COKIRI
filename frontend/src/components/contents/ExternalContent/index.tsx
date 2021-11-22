import { useState } from 'react';

import RepoContent from 'src/components/contents/RepoContent';
import BlogContent from 'src/components/contents/BlogContent';
import ProblemContent from 'src/components/contents/ProblemContent';

import { ExternalType, ProblemInfoType } from 'src/types';

import { Wrapper, Cover, MoreButton, LinkButton } from './style';

interface Props {
  external: ExternalType;
}

function ExternalContent({ external }: Props) {
  const [isExpand, setIsExpand] = useState(false);
  const handleMoreClick = () => {
    setIsExpand(true);
  };
  const handleLinkClick = () => {};

  return (
    <Wrapper expanded={isExpand}>
      <Cover hidden={isExpand} />
      {!isExpand && <MoreButton onClick={handleMoreClick}>더보기</MoreButton>}
      {!isExpand && (
        <LinkButton onClick={handleLinkClick} href={external.link} target='_blank'>
          바로가기
        </LinkButton>
      )}
      {(() => {
        if (external.type === 'algorithm') {
          return (
            <ProblemContent
              content={external.content}
              info={external.info! as ProblemInfoType}
              link={external.link}
            />
          );
        }
        if (external.type === 'github') {
          return <RepoContent content={external.content} />;
        }
        if (external.type === 'tistory') {
          return <BlogContent content={external.content} />;
        }
        return null;
      })()}
    </Wrapper>
  );
}

export default ExternalContent;
