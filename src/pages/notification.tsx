import React, { FC,Suspense,useEffect,useLayoutEffect } from "react";
import { ListRenderer } from "components/list-renderer";
import { useRecoilState, useRecoilValue } from "recoil";
import { notificationsState } from "state";
import { Box, Header, Page, Text } from "zmp-ui";
import axios from 'axios';
import { Divider } from "components/divider";
import { phoneState } from "state";
import { getConfig } from "utils/config";

const NotificationList: FC = () => { 
  const [noti,setNoti] = useRecoilState(notificationsState);
  const phone = useRecoilValue(phoneState);
  
  useEffect(() => {
   
    console.log(phone)
    const host = getConfig((config) => config.app.host);

    async function fetchData() {

      try {
       
        var url = host+'/api/get-list-notification-by-phone?phone='+phone
        await axios.get(url)
        .then(response => 
          {
            console.log(response.data)
            if(response.data && response.data.length>0 && response.data != "{}"){
              setNoti(response.data);
            }
          
          })
        .catch(error => console.log(error));
    
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <Box className="bg-background">
      <ListRenderer
        noDivider
        items={noti}
        renderLeft={(item) => (
          <img className="w-10 h-10 rounded-full" src={!item.image ?"https://ezlife.vn/storage/banner/logo-ezlife.png":item.image} />
        )}
        renderRight={(item) => (
          <Box key={item.id}>
            <Text.Header>{item.title}</Text.Header>
            <Text
              size="small"
              className="text-gray"
            >
              {item.content}
            </Text>
          </Box>
        )}
      />
    </Box>
  );
};

const NotificationPage: FC = () => {

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) { console.log('handleScroll') }
  }

  return (
    <Page onScroll={handleScroll}>
      <Header title="Thông báo" showBackIcon={false} />
      <Divider />
      <Suspense>
      <NotificationList />
      </Suspense>
    </Page>
  );
};

export default NotificationPage;
