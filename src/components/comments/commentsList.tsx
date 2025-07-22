
'use client';

import React, { useState, useEffect } from 'react';
import { getComments } from 'src/hooks/useWpApi';
import { IComment } from 'src/interfaces/IComment';
import Comments from './comments';

interface CommentListProps {
    postId: number;
}

const organizeComments = (comments: IComment[]) => {
    const commentMap: { [key: number]: IComment[] } = {};
    comments.forEach(comment => {
        commentMap[comment.id] = [];
    });
    comments.forEach(comment => {
        if (comment.parent !== 0) {
            commentMap[comment.parent].push(comment);
        }
    });
    return comments.filter(comment => comment.parent === 0).map(comment => ({
        ...comment,
        replies: commentMap[comment.id]
    }));
};

const CommentsList: React.FC<CommentListProps> = ({ postId }) => {
    const [comments, setComments] = useState<IComment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const fetchedComments = await getComments(postId);
                setComments(fetchedComments);
            } catch (error) {
                console.error('Erro ao carregar comentários:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [postId]);

    const organizedComments = organizeComments(comments);

    if (loading) {
        return (
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Comentários</h2>
                <p>Carregando comentários...</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Comentários</h2>
            <Comments comments={organizedComments} />
        </div>
    );
};

export default CommentsList;