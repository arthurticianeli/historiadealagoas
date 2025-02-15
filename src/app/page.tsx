import PostsDestaque from "src/components/posts/postsDestaque";
import PostsMainList from "src/components/postsMainList/postsMainList";
import NewsSection from "../components/news/newsSection";

export default async function Home() {
  return (
    <>
      <PostsDestaque />
      <NewsSection />
      <PostsMainList />
    </>
  );
}