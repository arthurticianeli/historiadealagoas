'use client';

import { format } from 'date-fns';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { getMediaSubtitle } from 'src/hooks/useWpApi';
import { IPost } from 'src/interfaces/IPost';
import Button from '../button/button';
import Chip from '../chip/chip';
import CommentForm from '../comments/commentForm';
import CommentsList from '../comments/commentsList';
import ShareButtons from '../shareButtons/shareButtons';
import WpApiParser from '../wpApiParser/wpApiParser';
import './post.css';

interface PostCardProps {
    post: IPost;
    category: string;
}

const Post: React.FC<PostCardProps> = ({ post, category }) => {
    const [showFullContent, setShowFullContent] = useState(false);
    const [mediaSubtitle, setMediaSubtitle] = useState('');
    
    const formattedDate = post?.date ? format(new Date(post.date), 'dd/MM/yyyy') : '';
    const postUrl = typeof window !== 'undefined' ? window.location.href : '';

    useEffect(() => {
        const fetchMediaSubtitle = async () => {
            const subtitle = await getMediaSubtitle(post.featured_media);
            setMediaSubtitle(subtitle);
        };
        
        fetchMediaSubtitle();
    }, [post.featured_media]);

    // Função para extrair os 3 primeiros parágrafos do conteúdo
    const getFirstParagraph = (content: string) => {
        if (!content) return '';
        
        // Procura pelos primeiros 3 parágrafos
        const regex = /<p[^>]*>[\s\S]*?<\/p>/gi;
        const matches = [];
        let match;
        let count = 0;
        
        while ((match = regex.exec(content)) !== null && count < 3) {
            matches.push(match[0]);
            count++;
        }
        
        return matches.join('');
    };

    // Função para obter o conteúdo após os 3 primeiros parágrafos
    const getRemainingContent = (content: string) => {
        if (!content) return '';
        
        const regex = /<p[^>]*>[\s\S]*?<\/p>/gi;
        let count = 0;
        let lastIndex = 0;
        
        while (regex.exec(content) !== null && count < 3) {
            lastIndex = regex.lastIndex;
            count++;
        }
        
        if (count >= 3) {
            return content.substring(lastIndex);
        }
        
        return '';
    };

    const contentToShow = post?.content?.rendered || '';
    const firstParagraph = getFirstParagraph(contentToShow);
    const remainingContent = getRemainingContent(contentToShow);
    const hasMoreContent = remainingContent.trim().length > 0;

    const toggleContent = () => {
        setShowFullContent(!showFullContent);
    };

    return (
        <div className="w-100 px-6 mb-4">
            <Chip category={category} />
            <h2 className="text-4xl font-bold mb-2">{post?.title?.rendered}</h2>

            <p className="mb-2 text-xs">Publicado em {formattedDate} por Edberto Ticianeli</p>

            <div className="mb-4">
                {post?.jetpack_featured_media_url && (
                    <a href={post?.jetpack_featured_media_url} target="_blank" rel="noreferrer" >
                        <Image
                            src={post?.jetpack_featured_media_url}
                            alt={post?.title?.rendered}
                            className="mx-auto rounded-md"
                            width={700}
                            height={475}
                            style={{
                                height: "auto",
                                width: "100%",
                            }}
                        />
                    </a>
                )
                }
                <div className="text-right italic text-sm">
                <WpApiParser content={mediaSubtitle} />
                </div>
            </div>
            <ShareButtons postUrl={postUrl} postTitle={post?.title?.rendered || ''} />
            <div className="m-auto">
                {/* Sempre mostra os 3 primeiros parágrafos */}
                <WpApiParser content={firstParagraph} />
                
                {/* Botão "Mostrar Mais" aparece apenas se houver mais conteúdo e não estiver expandido */}
                {hasMoreContent && !showFullContent && (
                    <div className="flex justify-center items-center mt-4">
                        <Button type='button' onClick={toggleContent} className="btn btn-primary">
                            Mostrar Mais
                        </Button>
                    </div>
                )}
                
                {/* Mostra o restante do conteúdo quando expandido */}
                {showFullContent && (
                    <>
                        <WpApiParser content={remainingContent} />
            
                        <ShareButtons postUrl={postUrl} postTitle={post?.title?.rendered || ''} />
            
                        <CommentsList postId={post.id} />
                        <CommentForm postId={post.id} />
                    </>
                )}
            </div>

        </div >
    );
};

export default Post;