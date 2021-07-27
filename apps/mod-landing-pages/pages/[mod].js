import React, { useMemo } from 'react';
import tw from 'twin.macro';
import Link from 'next/link';
import { AppShell } from '@alliancegenome/app-shell';
import NewsListItem from '../components/news-list-item/news-list-item';
import {
  getOrganizationById,
  getAllMembers,
} from '@alliancegenome/shared-assets';

const ALL_MOD_IDS = getAllMembers().map(({ id }) => id);

export function Index({ mod, news = {} }) {
  const renderLink = useMemo(
    () => ({ to, closeMenu, children, ...props }) => {
      const [_, subpath, segment] = /^\/members\/((\w+).*)/i.exec(to) || [];
      if (segment && ALL_MOD_IDS.includes(segment)) {
        return (
          <Link href={subpath} passHref>
            <a onClick={closeMenu}>{children}</a>
          </Link>
        );
      } else {
        return (
          <a href={to} {...props}>
            {children}
          </a>
        );
      }
    },
    []
  );

  const { name: organizationName } = getOrganizationById(mod);

  return (
    <AppShell renderLink={renderLink} mod={mod}>
      <main tw="max-w-screen-xl px-3 md:px-10 py-10 mx-auto grid lg:grid-cols-3 gap-10">
        <h1 tw="lg:col-span-3 text-5xl py-10">Welcome to {organizationName}</h1>
        <section tw="lg:col-span-2">
          <h2 tw="text-3xl pb-2">About</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </section>
        <section tw="lg:row-span-3">
          <h2 tw="text-3xl pb-2">Resources</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </section>
        <section>
          <h2 tw="text-3xl pb-2">News</h2>
          {news.posts && news.posts.length ? (
            news.posts.map((post) => (
              <NewsListItem key={post.title} {...post} />
            ))
          ) : (
            <p>No news has been posted.</p>
          )}
        </section>
        <section>
          <h2 tw="text-3xl pb-2">Meetings</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </section>
      </main>
    </AppShell>
  );
}

export async function getStaticProps({ params = {} }) {
  const { mod } = params;
  const news = await fetch(
    mod === 'sgd'
      ? 'https://public-api.wordpress.com/rest/v1.1/sites/yeastgenomeblog.wordpress.com/posts/?number=5'
      : `https://public-api.wordpress.com/rest/v1.1/sites/alliancecms.wordpress.com/posts/?category=${mod}%20News&number=5`
  ).then((response) => {
    return response.json();
  });
  return {
    props: {
      mod,
      news,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: ALL_MOD_IDS.map((mod) => ({
      params: { mod },
    })),
    fallback: false,
  };
}

export default Index;
