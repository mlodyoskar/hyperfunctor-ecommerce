import { MDXRemote } from 'next-mdx-remote';
import Link from 'next/link';
import { MarkdownContent } from '../types';

interface Props {
	content: MarkdownContent;
}

export const Markdown = ({ content }: Props) => {
	const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

	return (
		<MDXRemote
			{...content}
			components={{
				a: ({ href, children }) => {
					if (href?.startsWith('https') || (href?.startsWith('http') && !href.startsWith(APP_URL))) {
						return (
							<a rel="noopener noreferrer" href={href}>
								{children}
							</a>
						);
					} else {
						return href ? <Link href={href}>{children}</Link> : <a></a>;
					}
				},
			}}
		/>
	);
};
