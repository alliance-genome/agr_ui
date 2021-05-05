import React from 'react';
import tw, { css } from 'twin.macro';

export function NewsListItem({
  title = '',
  date = '',
  excerpt = '',
  author = {},
  URL = '',
}) {
  return (
    <a tw="shadow grid grid-cols-2 p-4 mb-4" href={URL}>
      <h3 tw="col-span-full text-xl text-justify text-primary">{title}</h3>
      <span tw="text-gray-500">{author.name}</span>
      <span tw="justify-self-end text-gray-500">
        {new Date(date).toDateString()}
      </span>
      <div
        tw="col-span-full text-justify mt-2"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
    </a>
  );
}

export default NewsListItem;
