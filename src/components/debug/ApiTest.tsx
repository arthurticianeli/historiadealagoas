'use client';

import { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: { rendered: string };
}

interface Category {
  id: number;
  name: string;
}

export default function ApiTest() {
  const [apiUrl, setApiUrl] = useState('');
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se a variável de ambiente está disponível no client
    const url = process.env.NEXT_PUBLIC_API_URL;
    setApiUrl(url ?? 'Não definida');

    const testApi = async () => {
      try {
        if (!url) {
          throw new Error('NEXT_PUBLIC_API_URL não está definida');
        }

        // Testar busca de posts
        const postsResponse = await fetch(`${url}/wp/v2/posts?per_page=5`);
        if (!postsResponse.ok) {
          throw new Error(`Erro ao buscar posts: ${postsResponse.status}`);
        }
        const postsData = await postsResponse.json();
        setPosts(postsData);

        // Testar busca de categorias
        const categoriesResponse = await fetch(`${url}/wp/v2/categories?exclude=1`);
        if (!categoriesResponse.ok) {
          throw new Error(`Erro ao buscar categorias: ${categoriesResponse.status}`);
        }
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    testApi();
  }, []);

  const getStatus = () => {
    if (loading) return '⏳ Carregando...';
    if (error) return `❌ ${error}`;
    return '✅ Sucesso';
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', margin: '20px', borderRadius: '8px' }}>
      <h2>🧪 Teste de API WordPress</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <strong>URL da API:</strong> {apiUrl}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong>Status:</strong> {getStatus()}
      </div>

      {posts && (
        <div style={{ marginBottom: '15px' }}>
          <strong>Posts encontrados:</strong> {posts.length}
          <ul>
            {posts.slice(0, 3).map((post: Post) => (
              <li key={post.id}>
                {post.title.rendered} (ID: {post.id})
              </li>
            ))}
          </ul>
        </div>
      )}

      {categories && (
        <div style={{ marginBottom: '15px' }}>
          <strong>Categorias encontradas:</strong> {categories.length}
          <ul>
            {categories.slice(0, 5).map((category: Category) => (
              <li key={category.id}>
                {category.name} (ID: {category.id})
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ fontSize: '12px', color: '#666' }}>
        Ambiente: {process.env.NODE_ENV}
      </div>
    </div>
  );
}
