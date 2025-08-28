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
import IcoEdit from './ico-edit.svg';
import IcoKakao from './ico-kakao.svg';
import IcoLogin from './ico-login.svg';
import IcoSpinnerRight from './ico-spinner-right.svg';
import IcoSpinnerleft from './ico-spinner-left.svg';
import IcoCheckList from './ico-checkList.svg';
import IcoCopy from './ico-copy.svg';
// Nearby icons
import IcoAdvantage from './nearby-icon/ico-advantage.svg';
import IcoAdvantageFill from './nearby-icon/ico-advantage-fill.svg';
import IcoDisadvantage from './nearby-icon/ico-disadvantage.svg';
import IcoDisadvantageFill from './nearby-icon/ico-disadvantage-fill.svg';
import IcoConvenience from './nearby-icon/ico-convenience.svg';
import IcoConvenienceFill from './nearby-icon/ico-convenience-fill.svg';
import IcoTransportation from './nearby-icon/ico-transportation.svg';
import IcoTransportationFill from './nearby-icon/ico-transportation-fill.svg';
import IcoSecurity from './nearby-icon/ico-security-fill.svg';
import IcoSecurityOutline from './nearby-icon/ico-security.svg';
import IcoNoise from './nearby-icon/ico-noise.svg';
import IcoNoiseFill from './nearby-icon/ico-noise-fill.svg';

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
  edit: IcoEdit,
  kakao: IcoKakao,
  login: IcoLogin,
  spinnerRight: IcoSpinnerRight,
  spinnerLeft: IcoSpinnerleft,
  checkList: IcoCheckList,
  copy: IcoCopy,
  advantage: IcoAdvantage,
  advantageFill: IcoAdvantageFill,
  disadvantage: IcoDisadvantage,
  disadvantageFill: IcoDisadvantageFill,
  convenience: IcoConvenience,
  convenienceFill: IcoConvenienceFill,
  transportation: IcoTransportation,
  transportationFill: IcoTransportationFill,
  security: IcoSecurity,
  securityOutline: IcoSecurityOutline,
  noise: IcoNoise,
  noiseFill: IcoNoiseFill,
};

export type IconName = keyof typeof Icons;
export const iconNames = Object.keys(Icons) as IconName[];
