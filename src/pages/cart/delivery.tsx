import { ElasticTextarea } from "components/elastic-textarea";
import { ListRenderer } from "components/list-renderer";
import React, { FC, Suspense } from "react";
import { Box, Icon, Input, Text } from "zmp-ui";
import { PersonPicker, RequestPersonPickerPhone } from "./person-picker";
import { RequestStorePickerLocation, StorePicker } from "./store-picker";
import { TimePicker } from "./time-picker";
import { userAddressState } from "state";
import { useRecoilValue, useRecoilState } from "recoil";

export const Delivery: FC = () => {
  const [addr, setAddr] = useRecoilState(userAddressState);
  const handleArrdess = (val) => {
    setAddr(val.target.value);
  };
  return (
    <Box className="space-y-3 px-4">
      <Text.Header>Thông tin người nhận</Text.Header>
      <ListRenderer
        items={[
          // {
          //   left: <Icon icon="zi-location" className="my-auto" />,
          //   right: (
          //     <Suspense fallback={<RequestStorePickerLocation />}>
          //       <StorePicker />
          //     </Suspense>
          //   ),
          // },
          // {
          //   left: <Icon icon="zi-clock-1" className="my-auto" />,
          //   right: (
          //     <Box flex className="space-x-2">
          //       <Box className="flex-1 space-y-[2px]">
          //         <TimePicker />
          //         <Text size="xSmall" className="text-gray">
          //           Thời gian nhận hàng
          //         </Text>
          //       </Box>
          //       <Icon icon="zi-chevron-right" />
          //     </Box>
          //   ),
          // },
          {
            left: <Icon icon="zi-user" className="my-auto" />,
            right: (
              <Suspense>
                <PersonPicker />
              </Suspense>
            ),
          },
          {
            left: <Icon icon="zi-note" className="my-auto" />,
            right: (
              <Box flex>
                <ElasticTextarea
                  placeholder="Địa chỉ nhận hàng ..."
                  className="border-none px-0 w-full focus:outline-none"
                  maxRows={4}
                  value={addr}
                  onChange={handleArrdess}
                />
              </Box>
            ),
          },
        ]}
        limit={4}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
    </Box>
  );
};
