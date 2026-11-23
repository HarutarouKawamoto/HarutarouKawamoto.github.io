import { useState } from 'react';
import type { Product } from '../types';

interface ProductTitleProps {
  product: Product;
  logoClassName: string;
}

// ロゴがある作品はロゴを、ない作品（または読み込みに失敗したとき）は作品名を文字で出す
export function ProductTitle({ product, logoClassName }: ProductTitleProps) {
  const [hasLogoError, setHasLogoError] = useState(false);

  if (!product.logoUrl || hasLogoError) return <>{product.title}</>;

  return (
    <img
      src={product.logoUrl}
      alt={product.title}
      // 寸法を先に渡し、読み込み中も見出しの場所を確保する（空の見出し・レイアウトのずれを防ぐ）
      width={product.logoSize?.width}
      height={product.logoSize?.height}
      onError={() => setHasLogoError(true)}
      className={logoClassName}
    />
  );
}
