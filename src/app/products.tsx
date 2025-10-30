// src/data/products.ts

export interface Product {
  id: number;
  imageLink: string;
  title: string;

}

const products: Product[] = [
  {
    id: 1,
    imageLink: "https://www.youtube.com/embed/tKuN_rXMLFE?si=usRJOp4_6XJaVVKe",
    title: "مشروع تطبيق متجر الكتروني",

  },
  {
    id: 2,
    imageLink: "https://www.youtube.com/embed/RRpcdpZaVX8?si=0KdWGVkKQtOpcsxd",
    title: " تطبيق الساعة العالمية ",

  },
  {
    id: 3,
    imageLink: "https://www.youtube.com/embed/9xNhcBD9Uws?si=oWHhBbeyDZnK62Ci",
    title: "مشروع تطبيق متجر الكتروني",
  },
  {
    id: 4,
    imageLink: "https://www.youtube.com/embed/lU0UTuonEGE?si=ccU9G609Rx25LoFw",
    title: "موقع ادارة المهام اليومية",
  },
  {
    id: 5,
    imageLink: "https://www.youtube.com/embed/y70pE25wKm0?si=WBiH_u03rVYoMAZN",
    title: "موقع شخصي",
  },
  {
    id: 6,
    imageLink: "https://www.youtube.com/embed/T7Y8MU8w1rA?si=0h_4YMTl4uMbA7d3",
    title: "موقع شركة",
  },
  {
    id: 7,
    imageLink: "https://www.youtube.com/embed/oSo_O25J6vY?si=EKceBoQTtqXy-1n2",
    title: "موقع فيسبوك",
  },
  {
    id: 8,
    imageLink: "https://www.youtube.com/embed/HAsmrthQaF0?si=D0AwcpccvHgRdurp",
    title: "موقع متجر الكتروني",
  },
  {
    id: 9,
    imageLink: "https://www.youtube.com/embed/2JwlKsFLYVo?si=knMhvAEC2Bsqb_Lq",
    title: "موقع بروفايل",
  },
  {
    id: 10,
    imageLink: "https://www.youtube.com/embed/2FVUw78OpOE?si=kBm7ZLaz7EwwwMwi",
    title: "موقع داش بورد",
  },
  {
    id: 11,
    imageLink: "https://www.youtube.com/embed/6w6fm3Tfgb4?si=NxWJEHIXzK6Q9xSt",
    title: "موقع مينيو مطعم",
  },
  {
    id: 12,
    imageLink: "https://www.youtube.com/embed/mOWBEqfkVzI?si=Qsd4GuZ2bxHYhH46",
    title: "موقع  افلام ",
  },
];

export default products;
