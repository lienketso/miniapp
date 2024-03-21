import React, { FC,Suspense,useEffect,useLayoutEffect } from "react";
import { ListRenderer } from "components/list-renderer";
import { useRecoilState, useRecoilValue ,useRecoilValueLoadable} from "recoil";
import { orderState } from "state";
import { Box, Header, Page, Text } from "zmp-ui";
import axios from 'axios';
import { Divider } from "components/divider";
import { phoneState } from "state";
import { getConfig } from "utils/config";

const OrderList: FC = () => { 
  const [order,setOrder] = useRecoilState(orderState);
  const phone = useRecoilValueLoadable(phoneState);
  
  useEffect(() => {
   
    console.log(phone)
    const host = getConfig((config) => config.app.host);

    async function fetchData() {

      try {
       
        var url = host+'/api/get-list-order-by-user-phone?phone='+phone
        await axios.get(url)
        .then(response => 
          {
            console.log(response.data)
            if(response.data && response.data.length>0 && response.data != "{}"){
              setOrder(response.data);
            }
          
          })
        .catch(error => console.log(error));
    
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);


  if (order.length === 0) {
    return (
      <Box className="flex-1 bg-background p-4 flex justify-center items-center">
        <Text size="xSmall" className="text-gray">
          Không có đơn hàng nào
        </Text>
      </Box>
    );
  }
  return (
    <Box className="bg-background">
      <ListRenderer 
        noDivider
        items={order}
        renderLeft={(item) => (
          <img className="w-10 h-10 rounded-full" src="https://ezlife.vn/storage/banner/logo-ezlife.png" />
        )}
        renderRight={(item) => (
          <Box key={item.id}>
            <Text.Header>Đơn hàng {item.id}</Text.Header>
            <Text
              size="small"
              className="text-gray"
            >
              {item.status}
            </Text>
          </Box>
        )}
      />
    </Box>
  );
};

const OrderPage: FC = () => {

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) { console.log('handleScroll') }
  }

  return (
    <Page onScroll={handleScroll}>
      <Header title="Danh sách đơn hàng" showBackIcon={true} />
      <Divider />
      <Suspense>
      <OrderList />
      </Suspense>
    </Page>
  );
};

export default OrderPage;
