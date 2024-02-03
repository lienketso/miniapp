import React, { FC } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { getDummyImage } from "utils/product";
import { Box } from "zmp-ui";

export const Banner: FC = () => {
  return (
    <Box className="bg-white" pb={4}>
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
        }}
        autoplay
        loop
        cssMode
      >
        {/* {[1, 2, 3, 4, 5]
          .map((i) => getDummyImage(`banner-${i}.jpg`))
          .map((banner, i) => (
            <SwiperSlide key={i} className="px-4">
              <Box
                className="w-full rounded-lg aspect-[2/1] bg-cover bg-center bg-skeleton"
                style={{ backgroundImage: `url(${banner})` }}
              />
            </SwiperSlide>
          ))} */}
           <SwiperSlide key="1" className="px-4">
          <Box
            className="w-full rounded-lg aspect-[2/1] bg-cover bg-center bg-skeleton"
            style={{
              backgroundImage: `url(https://ezlife.vn/storage/anh/z5079425644259-d47af86a64f79ff7b617260905049e62.jpg)`,
            }}
          />
        </SwiperSlide>
        <SwiperSlide key="2" className="px-4">
          <Box
            className="w-full rounded-lg aspect-[2/1] bg-cover bg-center bg-skeleton"
            style={{
              backgroundImage: `url(https://ezlife.vn/storage/banner/banner-raucu-2-1920x625.jpg)`,
            }}
          />
        </SwiperSlide>
        <SwiperSlide key="3" className="px-4">
          <Box
            className="w-full rounded-lg aspect-[2/1] bg-cover bg-center bg-skeleton"
            style={{
              backgroundImage: `url(https://ezlife.vn/storage/anh/z5076746228090-e09bef464633ddefa4bc9717f0acea4c-1.jpg)`,
            }}
          />
        </SwiperSlide>
        <SwiperSlide key="4" className="px-4">
          <Box
            className="w-full rounded-lg aspect-[2/1] bg-cover bg-center bg-skeleton"
            style={{
              backgroundImage: `url(https://ezlife.vn/storage/anh/baner-mua-sam-1.jpg)`,
            }}
          />
        </SwiperSlide>
        <SwiperSlide key="5" className="px-4">
          <Box
            className="w-full rounded-lg aspect-[2/1] bg-cover bg-center bg-skeleton"
            style={{
              backgroundImage: `url(https://ezlife.vn/storage/banner/banner-vita-2.jpg)`,
            }}
          />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};
