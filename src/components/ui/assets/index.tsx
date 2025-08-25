import IcoAddImage from './ico-add-image.svg';
import IcoAngry from './ico-angry.svg';
import IcoArrowDown from './ico-arrow-down.svg';
import IcoArrowLeft from './ico-arrow-left.svg';
import IcoBus from './ico-bus.svg';
import IcoCheck from './ico-check.svg';
import IcoClose from './ico-close.svg';
import IcoCurrentLocation from './ico-current-location.svg';
import IcoFavorite from './ico-favorite.svg';
import IcoHappy from './ico-happy.svg';
import IcoHappyFill from './ico-happy-fill.svg';
import IcoHouse from './ico-house.svg';
import IcoList from './ico-list.svg';
import IcoLocationAdd from './ico-location-add.svg';
import IcoMap from './ico-map.svg';
import IcoMyPage from './ico-my-page.svg';
import IcoSearch from './ico-search.svg';
import IcoShare from './ico-share.svg';
import IcoSoSo from './ico-so-so.svg';
import IcoSoSoFill from './ico-so-so-fill.svg';
import IcoSpinnerDown from './ico-spinner-down.svg';
import IcoTrash from './ico-trash.svg';
import IcoAngryFill from './ico-angry-fill.svg';
import IcoGps from './ico-gps.svg';
import IcoExample from './ico-example.svg';
import IcoMore from './ico-more.svg';
import IcoFolder from './ico-folder.svg';
import IcoAdd from './ico-add.svg';
import IcoMapPin from './ico-map-pin.svg';
import IcoKakao from './ico-kakao.svg';

export const Icons = {
  addImage: IcoAddImage,
  angry: IcoAngry,
  arrowDown: IcoArrowDown,
  arrowLeft: IcoArrowLeft,
  bus: IcoBus,
  check: IcoCheck,
  close: IcoClose,
  currentLocation: IcoCurrentLocation,
  favorite: IcoFavorite,
  happy: IcoHappy,
  happyFill: IcoHappyFill,
  house: IcoHouse,
  list: IcoList,
  locationAdd: IcoLocationAdd,
  map: IcoMap,
  myPage: IcoMyPage,
  search: IcoSearch,
  share: IcoShare,
  soSo: IcoSoSo,
  soSoFill: IcoSoSoFill,
  spinnerDown: IcoSpinnerDown,
  trash: IcoTrash,
  angryFill: IcoAngryFill,
  gps: IcoGps,
  example: IcoExample,
  more: IcoMore,
  folder: IcoFolder,
  add: IcoAdd,
  mapPin: IcoMapPin,
  Kakao: IcoKakao,
};

export type IconName = keyof typeof Icons;
export const iconNames = Object.keys(Icons) as IconName[];
