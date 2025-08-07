export interface userType {
  username: string;
  password: string;
  balance: number;
}
interface ratingTpye {
  count: number;
  rate: number;
}
export interface productType {
  rating: ratingTpye;
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
}
// const payload = {
//       item: id,
//       adet: adet,
//     };
export interface shopType {
  item: any;
  adet: number;
}
