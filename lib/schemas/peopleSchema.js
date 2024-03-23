import { z } from "zod";
export const peopleSchema = z.object({
    name: z.string(),
    surname: z.string(),
    patronymic: z.string(),
    nickname: z.string(),
    socialNetworks: z.array(z.object({
      name: z.string(), // Название социальной сети (например, "Facebook", "Twitter")
      link: z.string(), // Имя пользователя или ссылка на профиль
    })),
    dateOfBirth: z.coerce.date(),
    country: z.string(),
    city: z.string(),
  });