"use client";

import React, { useEffect } from "react";
import WPAPI from "wpapi";
import PostCover from "./components/layout/posts/postCover";
import useCategories from "./hooks/useCategories";
import { IPost } from "./interfaces/IPost";

export default function Home() {
  const [data, setData] = React.useState<{ [key: string]: IPost[] }>({});
  const [error, setError] = React.useState<Error | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const wp = new WPAPI({ endpoint: apiUrl });
  const { categories } = useCategories();

  useEffect(() => {
    if (categories.length > 0) {
      const fetchPosts = async (category: { id: number; name: string }) => {
        try {
          const posts: IPost[] = await wp.posts().categories(category.id).perPage(9);
          setData(prevData => ({
            ...prevData,
            [category.name]: posts
          }));
        } catch (err) {
          setError(err as Error);
        }
      };

      categories.forEach(category => {
        fetchPosts(category);
      });
    }
  }, [categories]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className=" mx-auto">
      {categories.map(category => (
        <div key={category.id} className="my-10">
          <h2 className="text-2xl font-bold mb-4 p-4 md:p-0">{category.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {data[category.name]?.map(post => (
              <PostCover key={post.id} post={post} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}