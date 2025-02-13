
import React from 'react';
import { getComments } from 'src/hooks/useWpApi';
import { IComment } from 'src/interfaces/IComment';
import Comments from './renderComments';

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

const CommentsList: React.FC<CommentListProps> = async ({ postId }) => {
    const comments = await getComments(postId);
    const organizedComments = organizeComments(comments);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Comentários</h2>
            <Comments comments={organizedComments} />

        </div>
    );
};

export default CommentsList;