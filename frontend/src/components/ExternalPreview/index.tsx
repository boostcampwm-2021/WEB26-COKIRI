import PropTypes from 'prop-types';

import RepoContent from 'src/components/contents/RepoContent';
import ProblemContent from 'src/components/contents/ProblemContent';
import ButtonCommon from 'src/components/buttons/Common';

import { ExternalType, ProblemInfoType, RepoInfoType } from 'src/types';

import { Cover, LinkButton, Wrapper, ButtonHolder } from './style';

interface Props {
  externalType: string;
  external?: ExternalType;
  onDelete: () => void;
}

function ExternalPreview({ external, externalType, onDelete }: Props) {
  if (externalType === '') {
    return null;
  }
  return (
    <Wrapper>
      <Cover />
      {externalType === 'repo' && (
        <RepoContent
          content={external!.content!}
          info={external!.info as RepoInfoType}
          link={external!.link}
        />
      )}
      {externalType === 'problem' && (
        <ProblemContent
          content={external!.content!}
          info={external!.info as ProblemInfoType}
          link={external!.link}
        />
      )}
      {/* {externalType === 'blog' && <RepoPreview />} */}
      <LinkButton href={external!.link} target='_blank' rel='noreferrer noopener'>
        바로가기
      </LinkButton>
      <ButtonHolder onClick={onDelete}>
        <ButtonCommon>삭제</ButtonCommon>
      </ButtonHolder>
    </Wrapper>
  );
}

ExternalPreview.propTypes = {
  externalType: PropTypes.string.isRequired,
  external: PropTypes.objectOf(PropTypes.any),
  onDelete: PropTypes.func.isRequired,
};

ExternalPreview.defaultProps = {
  external: {},
};

export default ExternalPreview;
