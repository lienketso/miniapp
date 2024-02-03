import { ProductItem } from "components/product/item";
import { Section } from "components/section";
import React, { FC, Suspense } from "react";
import { useRecoilValue } from "recoil";
import { hotCategoryState } from "state";
import { Box } from "zmp-ui";
import { ProductItemSkeleton } from "components/skeletons";

export const HotCategoryContent: FC = () => {
  const HotCate = useRecoilValue(hotCategoryState);
  return (
    <>
      {HotCate.map((category, index) => {
        return (
          <Section title={category.name} id="{category.id}">
            <Box className="grid grid-cols-2 gap-4">
              {category.products.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </Box>
          </Section>
        );
      })}
    </>
  );
};
export const ProductListFallback: FC = () => {
    const products = [...new Array(12)];
  
    return (
      <Section title="Sản phẩm nội bật">
        <Box className="grid grid-cols-2 gap-4">
          {products.map((_, i) => (
            <ProductItemSkeleton key={i} />
          ))}
        </Box>
      </Section>
    );
  };
export const HotProductList: FC = () => {
  return (
    <Suspense fallback={<ProductListFallback />}>
      <HotCategoryContent />
    </Suspense>
  );
};
