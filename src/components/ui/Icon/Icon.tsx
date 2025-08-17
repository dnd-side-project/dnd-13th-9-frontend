import { COLORS, IconColor } from '@/utils/style/colors';
import { IconName, Icons } from '../assets';

type Props = {
  /**
   * icon name to be displayed.
   */
  name: IconName;
  /**
   * color of the icon.
   * @default 'neutral'
   */
  color?: IconColor;
  /**
   * size of the icon.
   * @description px 단위로 변환합니다.
   * @default 25
   */
  size?: number;
  /**
   * 아이콘 주위 여백. 숫자(px) 또는 CSS 문자열 값.
   */
  padding?: number | string;
} & React.SVGProps<SVGSVGElement>;

export function Icon({ name, color = 'neutral', size = 25, padding, ...props }: Props) {
  const SVGIcon = Icons[name];

  // SVG 컴포넌트가 존재하는지 확인
  if (!SVGIcon || typeof SVGIcon !== 'function') {
    console.warn(`Icon component not found for name: ${name}`);
    return null;
  }

  const wrapperStyle =
    padding === undefined
      ? undefined
      : { padding: typeof padding === 'number' ? `${padding}px` : padding };

  return (
    <div className="flex flex-col items-center" style={wrapperStyle}>
      <SVGIcon
        width={`${size}px`}
        height={`${size}px`}
        padding={padding}
        fill={COLORS[color]}
        color={COLORS[color]}
        {...props}
      />
    </div>
  );
}
