import PostsDestaque from "src/components/posts/postsDestaque";
import PostsMainList from "src/components/postsMainList/postsMainList";

export default async function Home() {
  return (
    <>
      <PostsDestaque />
      {/* <BannerGrande position="topo-2" /> */}
      {/* <NewsSection /> */}
      <PostsMainList />
    </>
  );
}