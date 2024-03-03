"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2),
  surname: z.string().min(2),
  patronymic: z.string().min(2),
  dateOfBirth: z.coerce.date(),
  country: z.string().min(2),
  city: z.string().min(2),
});

const page = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      patronymic: "",
      dateOfBirth: new Date(),
      country: "",
      city: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    console.log(values);
  }

  return (
    <main className="wrapper">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <InputField control={form.control} name="name" label="Имя" />
          <InputField control={form.control} name="surname" label="Фамилия" />
          <InputField
            control={form.control}
            name="patronymic"
            label="Отчество"
          />
          <InputField
            control={form.control}
            name="dateOfBirth"
            label="Дата рождения"
            type="date"
          />
          <Button type="submit">Добавить</Button>
        </form>
      </Form>
    </main>
  );
};
export default page;
