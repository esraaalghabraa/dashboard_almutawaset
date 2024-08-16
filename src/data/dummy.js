import { MdOutlineCategory } from "react-icons/md";
import { IoStorefrontOutline } from "react-icons/io5";
import { RiAdvertisementLine } from "react-icons/ri";
import { HiOutlineUsers } from "react-icons/hi2";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { LuLayoutDashboard } from "react-icons/lu";

export const links = [
  {
    path:'ecommerce',
    title: 'لوحة التحكم',
    icon: <LuLayoutDashboard/>,
  },
  {
    path:'ads',
    title: 'الاعلانات',
    icon: <RiAdvertisementLine/>,
  },
  {
    path:'stores',
    title: 'المتاجر',
    icon: <IoStorefrontOutline/>,
  },
  {
    title: 'الأقسام',
    icon: <MdOutlineCategory/>,
    children:[
      {
        path:'main-category',
        title: 'أقسام المستوى الأول',
      },
      {
        path:'sub1-category',
        title: 'أقسام المستوى الثاني',
      },
      {
        path:'sub2-category',
        title: 'أقسام المستوى الثالث',
      },
    ]
  },
  {
    title: 'المستخدمين',
    icon: <HiOutlineUsers/>,
    children:[
      {
        path:'traders',
        title: 'التجار',
      },
      {
        path:'customers',
        title: 'الزبائن',
      },
      {
        path:'marketers',
        title: 'المسوقين',
      },
      {
        path:'delivery_agents',
        title: 'عمال التوصيل',
      },
    ]
  },
  {
    title: 'الطلبات',
    icon: <HiOutlineClipboardDocumentList/>,
    children:[
      {
        path:'orders-creating-stores',
        title: 'طلبات إنشاء المتاجر',
      },
      {
        path:'orders-updating-stores',
        title: 'طلبات تعديل المتاجر',
      },
      {
        path:'orders-creating-ads',
        title: 'طلبات إنشاء الاعلانات',
      },
    ]
  },
  {
    path:'levels-marketers',
    title: 'مستويات المسوقين',
    icon: <HiOutlineClipboardDocumentList/>,
  }
]


export const statusOptions = [
  {label: "مفعل", value: 1},
  {label: "غير مفعل", value: 0},
];


export const statusOptionsAds = [
  { label: 'مفعل', value: 0 },
  { label: 'غير مفعل', value: 2 },
  { label: 'محذوف من قبل التاجر', value:3 },
  { label: 'غير مفعل من قبل التاجر', value: 1 },
];