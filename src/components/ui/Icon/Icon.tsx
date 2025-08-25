import { COLORS, IconColor, colors as PALETTE } from '@/utils/style/colors';
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

  // 색상 문자열 해석: 1) COLORS 키, 2) "group-tone" (예: coolGray-50), 3) CSS color string
  const resolveStringColor = (value: string): string => {
    const fromShortMap = (COLORS as Record<string, string>)[value];
    if (fromShortMap) return fromShortMap;

    // support tokens like "coolGray-50" or "neutral-90"
    const match = value.match(/^([a-zA-Z]+)-(\d{2,3})$/);
    if (match) {
      const [, group, toneStr] = match;
      const tone = Number(toneStr);
      const groupPalette = (PALETTE as Record<string, Record<number, string> | unknown>)[group];
      if (groupPalette && typeof groupPalette === 'object') {
        const hex = (groupPalette as Record<number, string>)[tone];
        if (typeof hex === 'string') return hex;
      }
    }
    return value; // fallback: assume valid CSS color (e.g., #fff, red)
  };

  const resolvedColor = shouldInherit
    ? undefined
    : typeof color === 'string'
      ? resolveStringColor(color)
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
