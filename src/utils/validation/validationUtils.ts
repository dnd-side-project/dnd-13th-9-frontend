import { z } from 'zod';
import toast from 'react-hot-toast';
import { TOAST_STYLES } from '@/utils/toastStyles';

export const validateWithZod = <T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  onSuccess?: () => void
): boolean => {
  try {
    schema.parse(data);
    onSuccess?.();
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      toast.error(firstError.message, TOAST_STYLES.error);
    }
    return false;
  }
};

export const showValidationError = (message: string) => {
  toast.error(message, TOAST_STYLES.error);
};
