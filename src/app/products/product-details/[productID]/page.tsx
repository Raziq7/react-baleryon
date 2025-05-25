import ProductDetailsClient from './ProductDetailsClient';

interface PageProps {
  params: Promise<{ productID: string }>;
}

export default async function ProductDetails({ params }: PageProps) {
  const { productID } = await params;
  return <ProductDetailsClient productID={productID} />;
}
