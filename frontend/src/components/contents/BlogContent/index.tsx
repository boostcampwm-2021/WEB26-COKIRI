import PropTypes from 'prop-types';
import dompurify from 'dompurify';

interface Props {
  content: string;
  link: string;
}

function BlogContent({ content, link }: Props) {
  const sanitizer = dompurify.sanitize;
  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: sanitizer(content) }} />
      <a target='_blank' href={link} rel='noreferrer noopener'>
        글 보러가기
      </a>
    </>
  );
}

BlogContent.propTypes = {
  content: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default BlogContent;
