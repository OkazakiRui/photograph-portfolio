import type { NextPage } from 'next';
import { getAllGenre, getAllPost, getGenreIdByName } from 'libs/apiClient';
import { PostItem } from 'apis/post';
import React from 'react';
import { GenreItem } from 'apis/genre';
import Layout from 'components/Layout';
import PhotoList from 'components/PhotoList';
import { NextSeo } from 'next-seo';
import { openGraph } from 'libs/next-seo.config';

type Props = {
  posts: PostItem[];
  genres: GenreItem[];
  currentGenre: string;
};

const Category: NextPage<Props> = ({ posts, genres, currentGenre }) => (
  <>
    <NextSeo title={currentGenre || 'No Category'} openGraph={openGraph} />
    <Layout genres={genres}>
      <PhotoList posts={posts} />
    </Layout>
  </>
);

export const getStaticPaths = async () => {
  const categories = await getAllGenre();

  return {
    paths: categories.contents.map((category) => ({
      params: { id: category.genreName },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { contents } = await getGenreIdByName(params.id);
  if (!contents) throw new Error('データがありません。');
  const posts = await getAllPost(contents[0].id);
  const genres = await getAllGenre();

  return {
    props: {
      posts: posts.contents,
      genres: genres.contents,
      currentGenre: contents[0].genreJPName,
    },
  };
};

export default Category;
