import { z } from 'zod';

export const houseMemoValidationSchema = z
  .object({
    contractType: z.string().min(1, '계약형태는 필수값입니다'),
    address: z.string().min(1, '주소는 필수값입니다'),
    propertyName: z
      .string()
      .min(1, '매물명은 필수값입니다')
      .max(10, '제목은 10자 이하로 입력해주세요.'),
    referenceUrl: z.string().max(255, '링크는 255자 이하로 입력해주세요.').optional(),
    monthlyFee: z
      .number()
      .optional()
      .refine((val) => {
        return true;
      }),
  })
  .refine(
    (data) => {
      if (data.contractType === 'MONTHLY_RENT') {
        return data.monthlyFee !== undefined && data.monthlyFee !== null;
      }
      return true;
    },
    {
      message: '월세는 필수값입니다',
      path: ['monthlyFee'],
    }
  );

export type HouseMemoValidationInput = z.infer<typeof houseMemoValidationSchema>;
