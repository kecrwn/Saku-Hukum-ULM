import { bookKnowledgeBase } from "@/lib/books";
import BookReader from "@/components/BookReader";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export function generateStaticParams() {
  return Object.keys(bookKnowledgeBase).map((id) => ({
    id: id,
  }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const book = bookKnowledgeBase[params.id];
  if (!book) return { title: "Not Found" };
  
  return {
    title: `${book.title} | Ruang Baca Saku Hukum ULM`,
    description: book.description || `Membaca ${book.title} karya ${book.author}`
  };
}

export default function BookPage({ params }: { params: { id: string } }) {
  const book = bookKnowledgeBase[params.id];
  
  if (!book) {
    notFound();
  }

  // Ensure id is set on the book object if missing
  const bookWithId = { ...book, id: params.id };

  return <BookReader book={bookWithId} />;
}
