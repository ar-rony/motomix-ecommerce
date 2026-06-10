import { Suspense } from 'react';
import CategoryContent from './CategoryContent';

export default function CategoryPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading category...</div>}>
      <CategoryContent />
    </Suspense>
  );
}