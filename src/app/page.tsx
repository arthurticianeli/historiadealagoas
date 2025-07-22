import BannerGrande from "src/components/banner/bannerGrande";
import PostsDestaque from "src/components/posts/postsDestaque";
import PostsMainList from "src/components/postsMainList/postsMainList";
import NewsSection from "../components/news/newsSection";
import ApiTest from "../components/debug/ApiTest";

export default async function Home() {
  return (
    <>
      <ApiTest />
      <PostsDestaque />
      <BannerGrande position="topo-2" />
      <NewsSection />
      <PostsMainList />
    </>
  );
}