import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

export type InferGetStaticPathsType<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? R
  : never;

export type MarkdownContent = MDXRemoteSerializeResult<
  Record<string, unknown>,
  Record<string, string>
>;
