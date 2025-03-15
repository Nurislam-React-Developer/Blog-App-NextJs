  import fs from 'fs';
	import path from 'path';

	export default async function handler(req, res) {
		if (req.method === 'POST') {
			try {
				// Считываем текущие данные
				const filePath = path.join(process.cwd(), 'posts.json');
				const data = await fs.promises.readFile(filePath, 'utf8');
				const posts = JSON.parse(data).posts;

				// Добавляем новый пост
				const newPost = req.body;
				posts.push(newPost);

				// Сохраняем в файл
				await fs.promises.writeFile(
					filePath,
					JSON.stringify({ posts }, null, 2),
					'utf8'
				);

				res.status(200).json({ message: 'Пост добавлен!' });
			} catch (err) {
				res.status(500).json({ error: err.message });
			}
		}
	}