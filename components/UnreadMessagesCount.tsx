'use client';
import { Session } from 'next-auth';
import React, { useEffect, useState } from 'react';
import { GlobalContextType, useGlobalContext } from '@/context/GlobalContext';
const UnreadMessagesCount = ({ session }: { session: Session }) => {
	const { unreadCount, setUnreadCount } =
		useGlobalContext() as GlobalContextType;

	useEffect(() => {
		if (!session) return;
		const fetchUnreadMessages = async () => {
			try {
				const res = await fetch(`/api/messages/unread-count`);
				if (res.status === 200) {
					const data = await res.json();
					setUnreadCount(data);
				}
			} catch (error) {}
		};
		fetchUnreadMessages();
	}, []);

	return (
		unreadCount > 0 && (
			<span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
				{unreadCount}
				{/* <!-- Replace with the actual number of notifications --> */}
			</span>
		)
	);
};

export default UnreadMessagesCount;
