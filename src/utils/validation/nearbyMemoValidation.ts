import { z } from 'zod';

export const nearbyMemoValidationSchema = z.object({
  title: z.string().min(1, '장소명은 필수값입니다'),
  address: z.string().min(1, '주소는 필수값입니다'),
  placeTag: z.string().min(1, '장소 태그는 필수값입니다'),
});

export type NearbyMemoValidationInput = z.infer<typeof nearbyMemoValidationSchema>;
