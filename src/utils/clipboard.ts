/**
 * 주소를 클립보드에 복사하고 결과를 알림으로 표시
 * @param text 복사할 텍스트
 * @param successMessage 성공 시 표시할 메시지 (기본값: '주소가 복사되었습니다.')
 * @param errorMessage 실패 시 표시할 메시지 (기본값: '주소 복사에 실패했습니다.')
 */
export const copyAddressToClipboard = async (
  text: string,
  successMessage: string = '주소가 복사되었습니다.',
  errorMessage: string = '주소 복사에 실패했습니다.'
): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
    alert(successMessage);
  } catch (err) {
    console.error('주소 복사 실패:', err);
    alert(errorMessage);
  }
};
