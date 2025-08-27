import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TitleM } from '@/components/ui/Typography';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialName: string;
  maxLength?: number;
  loading?: boolean;
  onSubmit: (name: string) => Promise<void> | void;
};

export function MapListRenameModal({
  isOpen,
  onClose,
  title,
  initialName,
  maxLength = 10,
  loading,
  onSubmit,
}: Props) {
  const [value, setValue] = React.useState(initialName);

  // 모달이 열릴 때마다 초기값으로 동기화
  React.useEffect(() => {
    if (isOpen) setValue(initialName ?? '');
  }, [isOpen, initialName]);

  // 공통 확인 핸들러: 변경 없음/비어있음 방지 후 제출
  const handleConfirm = React.useCallback(async () => {
    const trimmed = value.trim();
    if (!trimmed || trimmed === initialName || loading) return;
    await onSubmit(trimmed);
  }, [value, initialName, loading, onSubmit]);

  return (
    <Modal isOpen={isOpen} closeModal={onClose}>
      <div className="w-[340px] rounded-[22px] bg-white p-4 shadow-sm">
        <TitleM className="mt-2">{title}</TitleM>
        <div className="mt-4">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value.slice(0, maxLength))}
            placeholder="이름을 입력하세요"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleConfirm();
              }
            }}
            className="border-neutral-30 focus:border-primary-50 h-[46px] w-full rounded-lg border px-3 py-2 outline-none"
            rightChildren={
              <div className="text-neutral-70 mt-1 text-right text-xs font-semibold">
                <span className="text-primary-50">{value.length}</span>/{maxLength}
              </div>
            }
          />
        </div>
        <div className="mt-8 flex gap-2">
          <Button variant="tertiary" size="medium" className="flex-1 px-3" onClick={onClose}>
            취소
          </Button>
          <Button
            size="medium"
            className="flex-1 px-3"
            loading={loading}
            disabled={loading || value.trim().length === 0 || value.trim() === initialName}
            onClick={handleConfirm}
          >
            수정 완료
          </Button>
        </div>
      </div>
    </Modal>
  );
}
