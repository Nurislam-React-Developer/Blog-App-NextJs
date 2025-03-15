import fs from 'fs';
import path from 'path';

export async function POST(req) {
	const data = await req.json();
	const newPost = {
		id: Date.now(),
		title: data.title,
		content: data.content,
		date: new Date().toISOString().slice(0, 10),
	};

	try {
		const filePath = path.join(process.cwd(), 'public', 'posts.json');
		const existingData = await fs.promises.readFile(filePath, 'utf8');
		const existingPosts = JSON.parse(existingData).posts;

		existingPosts.push(newPost);

		await fs.promises.writeFile(
			filePath,
			JSON.stringify({ posts: existingPosts }, null, 2),
			'utf8'
		);

		return new Response(JSON.stringify({ message: 'Пост добавлен!' }), {
			status: 200,
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message }), {
			status: 500,
		});
	}
}
