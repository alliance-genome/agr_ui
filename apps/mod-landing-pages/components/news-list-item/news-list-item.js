import React from 'react';
import tw, { css } from 'twin.macro';

export function NewsListItem({
  title = '',
  date = '',
  excerpt = '',
  author = {},
}) {
  return (
    <div>
      <h3 tw="text-xl">{title}</h3>
      <span>{author.name}</span>
      <span>{date}</span>
      <div dangerouslySetInnerHTML={{ __html: excerpt }} />
    </div>
  );
}

export default NewsListItem;
