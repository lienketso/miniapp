import React, { FC, Suspense, useEffect } from "react";
import { Box, Header, Page, Button, Input } from "zmp-ui";
import {
  phoneState,
  infoState,
  userState,
  userAddressState,
  emailState,
  ubgxuState,
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
import axios from 'axios';
import { getConfig } from "utils/config";

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

  const [xu, setXu] = useRecoilState(ubgxuState);

  useEffect(() => {
    var xu = numberWithCommas(infor.contents.ubgxu);
    console.log(infor.contents.ubgxu, xu);
    setXu(xu);
    if (infor.contents.email) {
      setEmail(infor.contents.email);
    }
  });
  function numberWithCommas(x) {
    if (!x) {
      return 0;
    }
    console.log(x);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function updateData() {
    if(!email){
        debugger;
        snackbar.openSnackbar({
            type: "error",
            text: "Bạn chưa điền email",
          });
          return;
    }
    if(!addr){
        snackbar.openSnackbar({
            type: "error",
            text: "Bạn chưa điền địa chỉ",
          });
          return;
    }

    const host = getConfig((config) => config.app.host);
    axios.post(host+"/api/post-edit-customer-by-phone", {
        name:user.contents.name,
        phone:phone.contents,
        email: email,
        address: addr
      })
      .then((response) => {
        console.log(response);
      });
    snackbar.openSnackbar({
      type: "success",
      text: "Thông tin đã được cập nhật",
    });
  }

  return (
    <Page>
      <Header title="Thông tin cá nhân" />
      <Box className="py-3 px-4">
        <Input
          type="text"
          label="Họ tên"
          placeholder="Họ tên"
          className="px-4"
          value={user.contents.name}
        />
        <Input
          type="text"
          label="Ví điểm"
          placeholder="Ví điểm"
          className="px-4"
          value={xu + " đ"}
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
        <div className="section-container content-center text-center">
          <Button variant="primary" size="large" onClick={updateData}>
            Cập nhật
          </Button>
        </div>
      </Box>
    </Page>
  );
};

export default PersonPage;
