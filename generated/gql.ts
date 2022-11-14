/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "mutation createProductReview($review: ReviewCreateInput!) {\n  createReview(data: $review) {\n    id\n  }\n}": types.CreateProductReviewDocument,
    "query getProductsList {\n  products {\n    id\n    name\n    price\n    slug\n    description\n    images {\n      url\n    }\n  }\n}\n\nquery getProductDetailsBySlug($slug: String) {\n  product(where: {slug: $slug}) {\n    id\n    name\n    description\n    price\n    images {\n      url\n    }\n    slug\n  }\n}\n\nquery getProductsListSlugs {\n  products {\n    slug\n  }\n}": types.GetProductsListDocument,
};

export function graphql(source: "mutation createProductReview($review: ReviewCreateInput!) {\n  createReview(data: $review) {\n    id\n  }\n}"): (typeof documents)["mutation createProductReview($review: ReviewCreateInput!) {\n  createReview(data: $review) {\n    id\n  }\n}"];
export function graphql(source: "query getProductsList {\n  products {\n    id\n    name\n    price\n    slug\n    description\n    images {\n      url\n    }\n  }\n}\n\nquery getProductDetailsBySlug($slug: String) {\n  product(where: {slug: $slug}) {\n    id\n    name\n    description\n    price\n    images {\n      url\n    }\n    slug\n  }\n}\n\nquery getProductsListSlugs {\n  products {\n    slug\n  }\n}"): (typeof documents)["query getProductsList {\n  products {\n    id\n    name\n    price\n    slug\n    description\n    images {\n      url\n    }\n  }\n}\n\nquery getProductDetailsBySlug($slug: String) {\n  product(where: {slug: $slug}) {\n    id\n    name\n    description\n    price\n    images {\n      url\n    }\n    slug\n  }\n}\n\nquery getProductsListSlugs {\n  products {\n    slug\n  }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;