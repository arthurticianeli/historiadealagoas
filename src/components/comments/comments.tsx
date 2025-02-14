
import { format } from 'date-fns';
import Image from 'next/image';
import { IComment } from 'src/interfaces/IComment';
import WpApiParser from '../wpApiParser/wpApiParser';

const Comments: React.FC<{ comments: IComment[] }> = ({ comments }) => {

    return (
        <div className='space-y-4'>
            {comments.map(comment => (
                <ul key={comment.id} className="space-y-4">
                    <li key={comment.id} className="p-4 border rounded-lg shadow-sm">
                        <div className='flex items-center space-x-2 mb-1'>
                            <Image src={comment.author_avatar_urls[24]} alt={comment.author_name} width={24} height={24} className="rounded-full" />
                            <h3 className="text-lg font-semibold">{comment.author_name}</h3>
                        </div>
                        <p className="text-xs text-gray-600">{format(new Date(comment.date), 'dd/MM/yyyy HH:mm')}</p>
                        <WpApiParser content={comment?.content?.rendered} />

                        {comment.replies && comment.replies.length > 0 && (
                            <ul className="space-y-4">
                                <li key={comment.id} className="p-4 border rounded-lg shadow-sm">
                                    <div className='flex items-center space-x-2 mb-1'>
                                        <Image src={comment.author_avatar_urls[24]} alt={comment.author_name} width={24} height={24} className="rounded-full" />
                                        <h3 className="text-lg font-semibold">{comment.author_name}</h3>
                                    </div>
                                    <p className="text-xs text-gray-600">{format(new Date(comment.date), 'dd/MM/yyyy HH:mm')}</p>
                                    <WpApiParser content={comment?.content?.rendered} />
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            ))}
        </div>
    );
}

export default Comments;