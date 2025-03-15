'use client';

import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function CreatePost() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const newPost = {
				title,
				content,
				date: new Date().toISOString().slice(0, 10),
			};

			await axios.post('/api/create-post', newPost);
			setTitle('');
			setContent('');
			toast.success('Пост успешно создан!');
			setTimeout(() => {
				window.location.href = '/';
			}, 1500); // Redirect after showing the toast
		} catch (error) {
			console.error('Ошибка:', error);
			toast.error('Ошибка при создании поста');
		}
	};

	return (
		<div className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg my-8'>
			<h1 className='text-3xl font-bold mb-6 text-center text-gray-800'>
				Создать пост
			</h1>
			<form onSubmit={handleSubmit} className='space-y-6'>
				<div>
					<label className='block mb-2 text-lg font-medium text-gray-700'>
						Заголовок:
					</label>
					<input
						type='text'
						placeholder='Введите заголовок'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
						className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
					/>
				</div>
				<div>
					<label className='block mb-2 text-lg font-medium text-gray-700'>
						Содержание:
					</label>
					<textarea
						placeholder='Введите содержание'
						value={content}
						onChange={(e) => setContent(e.target.value)}
						required
						rows='6'
						className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
					/>
				</div>
				<div className='flex items-center justify-between mt-8'>
					<Link href='/'>
						<button
							type='button'
							className='px-5 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-medium flex items-center'
						>
							<span>← Назад</span>
						</button>
					</Link>
					<button
						type='submit'
						className='px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 font-medium'
					>
						Создать пост
					</button>
				</div>
			</form>
		</div>
	);
}
