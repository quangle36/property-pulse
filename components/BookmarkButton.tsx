import React from 'react';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { FaBookmark } from 'react-icons/fa';
const BookmarkButton = ({ property }: any) => {
	const { data: session } = useSession();
	const userId = session?.user.id;

	const [isBookmarked, setIsBookmarked] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!userId) return;
		const checkBookmarkStatus = async () => {
			try {
				const res = await fetch('/api/bookmark/check', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ propertyId: property._id }),
				});
				if (res.status === 200) {
					const data = await res.json();
					setIsBookmarked(data.isBookmarked);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		checkBookmarkStatus();
	}, [property._id, userId]);

	const handleClick = async () => {
		if (!userId) {
			toast.error('You need to sign in to bookmark a property');
			return;
		}

		try {
			const res = await fetch('/api/bookmark', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ propertyId: property._id }),
			});
			if (res.status === 200) {
				const data = await res.json();
				toast.success(data.message);
				setIsBookmarked(data.isBookmarked);
			}
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong');
		}
	};
	if (loading)
		return (
			<button
				onClick={handleClick}
				className="bg-gray-300 animate-pulse w-full py-2 px-4 rounded-full flex items-center justify-center"
			>
				<div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
				<div className="w-1/2 h-4 bg-gray-400 rounded"></div>
			</button>
		);

	return isBookmarked ? (
		<button
			onClick={handleClick}
			className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
		>
			<FaBookmark className="fas fa-bookmark mr-2"></FaBookmark> Remove Bookmark
		</button>
	) : (
		<button
			onClick={handleClick}
			className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
		>
			<FaBookmark className="fas fa-bookmark mr-2"></FaBookmark> Bookmark
			Property
		</button>
	);
};

export default BookmarkButton;
