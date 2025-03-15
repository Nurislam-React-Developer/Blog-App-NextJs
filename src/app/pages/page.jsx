'use client';

import Link from 'next/link';
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
	if (!data || !data.posts || data.posts.length === 0) {
		return (
			<div className='max-w-6xl mx-auto p-6 pt-20'>
				<div className='text-center'>
					<h1 className='text-4xl font-bold text-gray-800 mb-6'>Блог пуст</h1>
					<p className='text-gray-500 mb-8'>
						Начните с создания первого поста!
					</p>
					<Link href='/create-post'>
						<button className='px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200'>
							Создать пост
						</button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className='max-w-7xl mx-auto p-6 pt-10'>
			<div className='flex items-center justify-between mb-12'>
				<h1 className='text-4xl font-extrabold text-gray-900'>Блог</h1>
				<Link href='/create-post'>
					<button className='px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium rounded-lg shadow-md hover:bg-emerald-700 transition duration-200'>
						Создать пост
					</button>
				</Link>
			</div>

			<div className='flex flex-col gap-20'>
				{data.posts.map((post) => (
					<Link
						key={post.id}
						href={`/post/${post.id}`}
						className='block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition duration-300'
					>
						<div className='p-6 bg-white'>
							<h2 className='text-2xl font-semibold text-gray-800 mb-4'>
								{post.title}
							</h2>
							<div className='mb-6'>
								<p className='text-gray-600 mb-4'>
									<strong>Содержание:</strong> {post.content}
								</p>
								<p className='text-gray-500 mb-4'>
									<strong>Дата:</strong>{' '}
									{new Date(post.date).toLocaleDateString()}
								</p>
							</div>
							<div className='flex items-center justify-between'>
								<span className='text-sm text-gray-500'>Пост №{post.id}</span>
								<svg
									className='w-6 h-6 text-gray-400 transform transition duration-200 hover:text-gray-600'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M17 8l4 4m0 0l-4 4m4-4H3'
									/>
								</svg>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
