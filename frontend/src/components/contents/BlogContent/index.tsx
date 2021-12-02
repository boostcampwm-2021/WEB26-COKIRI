import PropTypes from 'prop-types';
import DOMPurify from 'isomorphic-dompurify';

interface Props {
  title: string;
  content: string;
  link: string;
}

function BlogContent({ content, link, title }: Props) {
  return (
    <>
      <h1>{title}</h1>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
      <a target='_blank' href={link} rel='noreferrer noopener'>
        글 보러가기
      </a>
    </>
  );
}

BlogContent.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default BlogContent;
