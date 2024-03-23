import { apiService } from "../interceptors";
import { toast } from "sonner"
export const getAudio = async (word) => {
  try {
    const response = await apiService.get(`/japanese/${word}`);
    toast.success(`Аудио успешно скачан`);
    return response
  }
  catch (error) {
    toast.error(error.response.data.error);
  }

};


export const getTranslation = async (word) => {
  const response = await apiService.get(`/japanese/translate/${word}`);

  return response
};

export const deleteAllAudios = async () => {
  const response = await apiService.delete(`/japanese/`);
  toast.success(`Все аудио успешно удалены`);
  return response
};