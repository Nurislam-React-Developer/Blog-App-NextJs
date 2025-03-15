import { useRouter } from 'next/router';

export default function Post({ posts }) {
	const router = useRouter();
	const { id } = router.query;

	const post = posts.find((p) => p.id === +id);

	return (
		<div>
			<h1>{post?.title}</h1>
			<p>{post?.content}</p>
			<p>Дата: {post?.date}</p>
			<Link href='/'>
				<a>Назад</a>
			</Link>
		</div>
	);
}

export async function getStaticPaths() {
	const res = await fetch('posts.json');
	const data = await res.json();
	const paths = data.posts.map((post) => ({
		params: { id: post.id.toString() },
	}));

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps() {
	const res = await fetch('posts.json');
	const data = await res.json();
	return {
		props: {
			posts: data.posts,
		},
	};
}
