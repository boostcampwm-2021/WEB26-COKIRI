import PropTypes from 'prop-types';
import DOMPurify from 'isomorphic-dompurify';

import { Row } from 'src/components/Grid';

import { ProblemInfoType } from 'src/types';

interface Props {
  title: string;
  content: string;
  link: string;
  info: ProblemInfoType;
}

function ProblemContent({ content, info, link, title }: Props) {
  return (
    <>
      <h1>{title}</h1>
      <Row justifyContent='space-between'>
        <p>티어 {info?.tear}</p>
        <p>푼 사람 {info?.solvedUserCount}</p>
        <p>시도 횟수 {info?.totalTryCount}</p>
      </Row>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
      <a target='_blank' href={link} rel='noreferrer noopener'>
        문제 보러가기
      </a>
    </>
  );
}

ProblemContent.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.any).isRequired,
  link: PropTypes.string.isRequired,
};

export default ProblemContent;
