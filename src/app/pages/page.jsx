'use client';

import Link from 'next/link'; // Добавьте импорт Link
import { useEffect, useState } from 'react';
import { TetrisLoader } from '../loader/page';

export function Home() {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await fetch('/posts.json');
				const fetchedData = await res.json();
				setData(fetchedData);
			} catch (error) {
				console.error('Ошибка загрузки:', error);
			} finally {
				setIsLoading(false);
			}
		}

		fetchData();
	}, []);

	if (isLoading) return <TetrisLoader />;
	if (!data || !data.posts) return <p>Нет данных</p>;

	return (
		<div className='max-w-6xl mx-auto p-6'>
			<div className='flex justify-between items-center mb-8'>
				<h1 className='text-4xl font-bold text-gray-800'>Блог</h1>
				<Link href='/pages/create-post'>
					<button className='px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer'>
						Создать пост
					</button>
				</Link>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{data.posts.map((post) => (
					<div
						key={post.id}
						className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1'
					>
						<Link href={`/post/${post.id}`} className='block h-full'>
							<div className='p-5'>
								<h2 className='text-xl font-bold text-gray-800 mb-3 line-clamp-2'>
									{post.title}
								</h2>
								<p className='text-gray-600 mb-4 line-clamp-3'>
									{post.content}
								</p>
								<div className='flex justify-end'>
									<span className='text-sm text-gray-500'>{post.date}</span>
								</div>
							</div>
						</Link>
					</div>
				))}
			</div>

			{data.posts.length === 0 && (
				<div className='text-center py-10'>
					<p className='text-xl text-gray-500'>
						Нет постов. Создайте первый пост!
					</p>
				</div>
			)}
		</div>
	);
}
