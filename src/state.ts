import { atom, selector, selectorFamily } from "recoil";
import { getLocation, getPhoneNumber, getUserInfo } from "zmp-sdk";
import coffeeIcon from "static/category-coffee.svg";
import matchaIcon from "static/category-matcha.svg";
import foodIcon from "static/category-food.svg";
import milkteaIcon from "static/category-milktea.svg";
import drinksIcon from "static/category-drinks.svg";
import breadIcon from "static/category-bread.svg";
import juiceIcon from "static/category-juice.svg";
import logo from "static/logo.png";
import { Category, CategoryId } from "types/category";
import { Product, Variant,HotCategory } from "types/product";
import { DetailProduct } from "types/detail-product";
import { Cart } from "types/cart";
import { Notification } from "types/notification";
import { calculateDistance } from "utils/location";
import { Store } from "types/delivery";
import { calcFinalPrice, getDummyImage } from "utils/product";
import { getConfig } from "../src/utils/config";
import { wait } from "utils/async";

export const userState = selector({
  key: "user",
  get: () => getUserInfo({}).then((res) => res.userInfo),
});
//Danh sách category nổi bật 
export const categoriesState = selector<Category[]>({
  key: "categories",
  get: async () => {
    await wait(2000);
    const host =getConfig((config) => config.app.host);
    const response = await  fetch(host+'/api/get-feature-category');
    const data = await response.json();
    return data
  }
  
});

//Sản phẩm bán chạy
export const productsState = selector<Product[]>({
  key: "products",
  get: async () => {
    await wait(2000);
    const host =getConfig((config) => config.app.host);
    const response = await  fetch(host+'/api/get-feature-product');
    const data = await response.json();
    return data
    ;
  },
});

//Sản phẩm nổi bật
export const hotCategoryState = selector<HotCategory[]>({
  key: "hotItems",
  get: async () => {
    await wait(2000);
    const host =getConfig((config) => config.app.host);
    const response = await  fetch(host+'/api/get-hot-category');
    const data = await response.json();
    return data
    ;
  },
});

//Hiển thị sản phẩm chi tiết
export const detailProductState = selector<DetailProduct>({
  key: "detailProduct",
  get: async () => {   
    const host =getConfig((config) => config.app.host);
    const response = await  fetch(host+'/api/get-detail-product'+selectedProductIdState);
    const data = await response.json();
    return data
    ;
  },
});

//Danh sách sản phẩm theo category 
export const productsByCategoryState = selectorFamily<Product[], CategoryId>({
  key: "productsByCategory",
  get:
    (categoryId) =>
    async () => {
      const host =getConfig((config) => config.app.host);
      const response =  await  fetch(host+'/api/get-infor-category?id='+ categoryId);
      const data = await response.json();     
      return data.productItems.data;
    },
});

//thong tin danh muc san pham
export const categoryInforState = selector({
  "key":"categoryInfor",
  get: async() => {
    await wait(2000);
    const host =getConfig((config) => config.app.host);
    const response = await  fetch(host+'/api/get-infor-category');
    const data = await response.json();
    return data
  }
});

export const recommendProductsState = selector<Product[]>({
  key: "recommendProducts",
  get: ({ get }) => {
    const products = get(productsState);
    return products.filter((p) => p.price);
  },
});

export const selectedCategoryIdState = atom({
  key: "selectedCategoryId",
  default: "92",
});

export const selectedProductIdState = atom({
  key: "selectedProductId",
  default: 0,
});

export const cartState = atom<Cart>({
  key: "cart",
  default: [],
});

export const totalQuantityState = selector({
  key: "totalQuantity",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce((total, item) => total + item.quantity, 0);
  },
});

export const totalPriceState = selector({
  key: "totalPrice",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce(
      (total, item) =>
        total + item.quantity * calcFinalPrice(item.product),
      0,
    );
  },
});

export const notificationsState = atom<Notification[]>({
  key: "notifications",
  default: [
    {
      id: 1,
      image: "https://ezlife.vn/storage/banner/logo-ezlife.png",
      title: "Chào bạn đến với siêu thị EZlife",
      content:
        "Cảm ơn đã lựa chọn siêu thị EZlife để mua sắm",
    },
    // {
    //   id: 2,
    //   image: logo,
    //   title: "Giảm 50% lần đầu mua hàng",
    //   content: "Nhập WELCOME để được giảm 50% giá trị đơn hàng đầu tiên order",
    // },
  ],
});

export const keywordState = atom({
  key: "keyword",
  default: "",
});

export const resultState = selector<Product[]>({
  key: "result",
  get: async ({ get }) => {
    const keyword = get(keywordState);
    console.log(keyword);
    if (!keyword.trim()) {
      return [];
    }
    const products = get(productsState);
    await wait(500);
    return products.filter((product) =>
      product.name.trim().toLowerCase().includes(keyword.trim().toLowerCase()),
    );
  },
});

export const storesState = atom<Store[]>({
  key: "stores",
  default: [
    {
      id: 1,
      name: "EZlife",
      address:
        "Số 23, ngõ 121/39 TDP Đình, Đại Mỗ, Nam Từ Liêm, Hà Nội",
      lat: 10.741639,
      long: 106.714632,
    },
  ],
});

export const nearbyStoresState = selector({
  key: "nearbyStores",
  get: ({ get }) => {
    // Get the current location from the locationState atom
    const location = get(locationState);

    // Get the list of stores from the storesState atom
    const stores = get(storesState);

    // Calculate the distance of each store from the current location
    if (location) {
      const storesWithDistance = stores.map((store) => ({
        ...store,
        distance: calculateDistance(
          location.latitude,
          location.longitude,
          store.lat,
          store.long,
        ),
      }));

      // Sort the stores by distance from the current location
      const nearbyStores = storesWithDistance.sort(
        (a, b) => a.distance - b.distance,
      );

      return nearbyStores;
    }
    return [];
  },
});

export const selectedStoreIndexState = atom({
  key: "selectedStoreIndex",
  default: 0,
});

export const selectedStoreState = selector({
  key: "selectedStore",
  get: ({ get }) => {
    const index = get(selectedStoreIndexState);
    const stores = get(nearbyStoresState);
    return stores[index];
  },
});

export const selectedDeliveryTimeState = atom({
  key: "selectedDeliveryTime",
  default: +new Date(),
});

export const requestLocationTriesState = atom({
  key: "requestLocationTries",
  default: 0,
});

export const requestPhoneTriesState = atom({
  key: "requestPhoneTries",
  default: 0,
});

export const locationState = selector<
  { latitude: string; longitude: string } | false
>({
  key: "location",
  get: async ({ get }) => {
    const requested = get(requestLocationTriesState);
    if (requested) {
      const { latitude, longitude, token } = await getLocation({
        fail: console.warn,
      });
      if (latitude && longitude) {
        return { latitude, longitude };
      }
      if (token) {
        console.warn(
          "Sử dụng token này để truy xuất vị trí chính xác của người dùng",
          token,
        );
        console.warn(
          "Chi tiết tham khảo: ",
          "https://mini.zalo.me/blog/thong-bao-thay-doi-luong-truy-xuat-thong-tin-nguoi-dung-tren-zalo-mini-app",
        );
        console.warn("Giả lập vị trí mặc định: VNG Campus");
        return {
          latitude: "10.7287",
          longitude: "106.7317",
        };
      }
    }
    return false;
  },
});

export const phoneState = selector<string | boolean>({
  key: "phone",
  get: async ({ get }) => {
    const requested = get(requestPhoneTriesState);
    if (requested) {
      const { number, token } = await getPhoneNumber({ fail: console.warn });
      if (number) {
        return number;
      }
      console.warn(
        "Sử dụng token này để truy xuất số điện thoại của người dùng",
        token,
      );
      console.warn(
        "Chi tiết tham khảo: ",
        "https://mini.zalo.me/blog/thong-bao-thay-doi-luong-truy-xuat-thong-tin-nguoi-dung-tren-zalo-mini-app",
      );
      console.warn("Giả lập số điện thoại mặc định: 0337076898");
      return "0337076898";
    }
    return false;
  },
});
