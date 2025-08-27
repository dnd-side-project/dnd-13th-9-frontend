'use client';

import Image from 'next/image';
import { Icon } from '@/components/ui/Icon/Icon';
import { getFeelingColor, getFeelingIconName } from '@/utils/feeling';
import { useMapSelection } from '@/hooks/useMapSelection';
import { Body2xs, BodyS } from '@/components/ui/Typography';
import { useRouter } from 'next/navigation';
import { getContractLabel, getHouseTypeLabel } from '@/utils/labels';

export function SelectedPropertyCard() {
  const { selectedProp } = useMapSelection();
  const router = useRouter();

  if (!selectedProp) return null;

  const feelingIcon = selectedProp.feeling
    ? getFeelingIconName(selectedProp.feeling as any)
    : 'soSoFill';
  const feelingColor = selectedProp.feeling
    ? getFeelingColor(selectedProp.feeling as any)
    : 'secondary';

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-10 z-30 flex justify-center px-4">
      <div
        className="pointer-events-auto h-[114px] w-full cursor-pointer overflow-hidden rounded-2xl bg-white p-3 shadow-md"
        onClick={() => {
          if (!selectedProp) return;
          const href =
            selectedProp.type === 'NEARBY'
              ? `/map/nearby-memo/${selectedProp.id.replace('near_', '')}`
              : `/map/house-memo/${selectedProp.id.replace('prop_', '')}`;
          router.push(href);
        }}
      >
        <div className="flex items-start gap-3">
          <div className="bg-neutral-30 h-[90px] w-[90px] overflow-hidden rounded-xl">
            {selectedProp.images[0]?.url ? (
              <Image
                src={selectedProp.images[0]?.url ?? ''}
                alt={selectedProp.title ?? ''}
                width={56}
                height={56}
                className="h-14 w-14 object-cover"
              />
            ) : null}
          </div>
          <div className="flex min-w-0 flex-1">
            <div className="flex flex-col gap-1">
              {selectedProp.type === 'NEARBY' ? (
                <>
                  <div className="flex items-center gap-2">
                    <Icon name="bus" width={20} height={20} color="secondary" />
                    <div className="truncate text-base font-semibold text-black">
                      {selectedProp.title}
                    </div>
                  </div>
                  <Body2xs className="text-neutral-80 line-clamp-3">
                    {selectedProp.memo ?? ''}
                  </Body2xs>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <Icon name={feelingIcon as any} width={20} height={20} color={feelingColor} />
                    <div className="truncate text-base font-semibold text-black">
                      {selectedProp.title}
                    </div>
                  </div>
                  <BodyS className="text-neutral-100">
                    {getContractLabel(selectedProp.contractType as any)}&nbsp;
                    <span>
                      {[
                        selectedProp.depositBig ? `${selectedProp.depositBig}억` : null,
                        selectedProp.depositSmall
                          ? `${selectedProp.depositSmall}${selectedProp.depositBig ? '만원' : ''}`
                          : null,
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    </span>
                    /
                    <span>{selectedProp.managementFee ? `${selectedProp.managementFee}` : ''}</span>
                  </BodyS>
                  <Body2xs className="text-neutral-80 line-clamp-2">
                    {selectedProp.address ?? ''}
                  </Body2xs>
                </>
              )}
            </div>
            <div className="pointer-events-auto ml-auto">
              <Icon
                name="share"
                color="coolGray-50"
                width={24}
                height={24}
                className="flex-1 cursor-pointer"
                padding={4}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
