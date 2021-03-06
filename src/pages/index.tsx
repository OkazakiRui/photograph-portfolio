import { PostItem } from 'apis/post';
import Layout from 'components/Layout';
import { getAllGenre, getAllPost } from 'libs/apiClient';
import type { NextPage } from 'next';
import PhotoList from 'components/PhotoList';
import { GenreItem } from 'apis/genre';
import { NextSeo } from 'next-seo';
import { openGraph } from 'libs/next-seo.config';

type Props = {
  posts: PostItem[];
  genres: GenreItem[];
};
const Index: NextPage<Props> = ({ posts, genres }) => (
  <>
    <NextSeo title="Home" openGraph={openGraph} />
    <Layout genres={genres}>
      <PhotoList posts={posts} />
    </Layout>
  </>
);

export const getStaticProps = async () => {
  const posts = await getAllPost('selected');
  const genres = await getAllGenre();

  return {
    props: {
      posts: posts.contents,
      genres: genres.contents,
    },
  };
};

export default Index;
