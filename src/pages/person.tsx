import React, { FC, Suspense, useEffect } from "react";
import { Box, Header, Page, Button, Input } from "zmp-ui";
import {
  phoneState,
  infoState,
  userState,
  userAddressState,
  emailState,
} from "state";
import {
  useRecoilValue,
  useSetRecoilState,
  useRecoilValueLoadable,
  useRecoilState,
} from "recoil";
import { PersonPicker } from "./cart/person-picker";
import { updateSuccess } from "hooks";
import { useSnackbar } from "zmp-ui";

const PersonPage: FC = () => {
const snackbar = useSnackbar();
  const user = useRecoilValueLoadable(userState);
  const phone = useRecoilValueLoadable(phoneState);
  const infor = useRecoilValueLoadable(infoState);

  const [addr, setAddr] = useRecoilState(userAddressState);
  const handleArrdess = (val) => {
    setAddr(val.target.value);
  };

  const [email, setEmail] = useRecoilState(emailState);
  const handleEmail = (val) => {
    setEmail(val.target.value);
  };
  useEffect(() => {
    console.log(infor.contents.email);
    if (infor.contents.email) {
      var val = infor.contents.email;
      setEmail(val);
    }
  });

function updateData(){

    snackbar.openSnackbar({
        type: "success",
        text: "Thông tin đã được cập nhật",
      });
}

  return (
    <Page>
      <Header title="Thông tin cá nhân" />
      <Suspense>
        <div style={{ display: "none" }}>
          {" "}
          <PersonPicker />
        </div>
      </Suspense>
      <Box className="py-3 px-4">
        <Input
          type="text"
          label="Họ tên"
          placeholder="Họ tên"
          className="px-4"
          value={user.contents.name}
        />
        <Suspense>
          <Input
            type="text"
            label="Số điện thoại"
            readOnly={true}
            placeholder="Số điện thoại"
            className="px-4"
            value={phone.contents}
          />
        </Suspense>
        <Input
          type="text"
          label="Email"
          className="px-4"
          placeholder="Email"
          value={email}
          onChange={handleEmail}
        />
        <Input
          type="text"
          label="Địa chỉ"
          className="px-4"
          placeholder="Địa chỉ"
          onChange={handleArrdess}
          value={addr}
        />
        <div className="section-container">
          <Button variant="primary" size="large" onClick={updateData}>
            Cập nhật
          </Button>
        </div>
      </Box>
    </Page>
  );
};
export default PersonPage;
