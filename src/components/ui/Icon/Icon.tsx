import { COLORS, IconColor } from '@/utils/style/colors';
import { IconName, Icons } from '../assets';

type Props = {
  /**
   * icon name to be displayed.
   */
  name: IconName;
  /**
   * color of the icon.
   * If omitted or set to 'inherit', the icon inherits CSS color. Also accepts any CSS color string (e.g., '#f00', 'red').
   * @default 'inherit'
   */
  color?: IconColor | 'inherit' | 'currentColor' | string;
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

export function Icon({ name, color = 'inherit', size = 25, padding, ...props }: Props) {
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

  const shouldInherit = color === 'inherit' || color === 'currentColor' || color === undefined;
  const resolvedColor = shouldInherit
    ? undefined
    : typeof color === 'string'
      ? ((COLORS as Record<string, string>)[color] ?? color)
      : COLORS[color as IconColor];

  return (
    <div className="flex flex-col items-center" style={wrapperStyle}>
      <SVGIcon
        width={`${size}px`}
        height={`${size}px`}
        {...(shouldInherit ? {} : { fill: resolvedColor, color: resolvedColor })}
        {...props}
      />
    </div>
  );
}
