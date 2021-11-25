import PropTypes from 'prop-types';
import dompurify from 'dompurify';

import { Row, Col } from 'src/components/Grid';

import { RepoInfoType } from 'src/types';

interface Props {
  title: string;
  content: string;
  link: string;
  info: RepoInfoType;
}

function RepoContent({ content, link, info, title }: Props) {
  const sanitizer = dompurify.sanitize;
  return (
    <>
      <h1>{title}</h1>
      <Row justifyContent='space-between'>
        <p>별 {info.starCount}</p>
        <p>포크 {info.forkCount}</p>
        {Object.keys(info.language ?? {}).map((language) => (
          <Col key={language}>
            <p>{language}</p>
            <p>{info.language[language]}%</p>
          </Col>
        ))}
      </Row>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: sanitizer(content) }} />
      <a target='_blank' href={link} rel='noreferrer noopener'>
        글 보러가기
      </a>
    </>
  );
}

RepoContent.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.any).isRequired,
  link: PropTypes.string.isRequired,
};

export default RepoContent;
