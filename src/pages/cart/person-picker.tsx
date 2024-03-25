import { ListItem } from "components/list-item";
import React, { FC } from "react";
import { useRecoilValue, useSetRecoilState ,useRecoilState} from "recoil";
import { phoneState, requestPhoneTriesState, userState,infoState,emailState } from "state";

export const PersonPicker: FC = () => {
  const user = useRecoilValue(userState);
  const phone = useRecoilValue(phoneState);

  if (!phone) {
 
    return <RequestPersonPickerPhone />;
  }else{
    // lấy thông tin user từ server
   useRecoilValue(infoState)
  }

  return <ListItem title={`${user.name} - ${phone}`} subtitle="Người nhận" />;
};

export const RequestPersonPickerPhone: FC = () => {
  const retry = useSetRecoilState(requestPhoneTriesState);
  return (
    <ListItem
      onClick={() => retry((r) => r + 1)}
      title="Chọn người nhận"
      subtitle="Vui lòng cấp quyền truy cập số điện thoại của bạn"
    />
  );
};
