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
} & React.SVGProps<SVGSVGElement>;

export function Icon({ name, color = 'neutral', size = 25, ...props }: Props) {
  const SVGIcon = Icons[name];

  // SVG 컴포넌트가 존재하는지 확인
  if (!SVGIcon || typeof SVGIcon !== 'function') {
    console.warn(`Icon component not found for name: ${name}`);
    return null;
  }

  return (
    <div className="flex w-30 flex-col items-center">
      <SVGIcon
        width={`${size}px`}
        height={`${size}px`}
        fill={COLORS[color]}
        color={COLORS[color]}
        {...props}
      />
    </div>
  );
}
