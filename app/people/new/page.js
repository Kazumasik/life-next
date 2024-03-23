"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { createPeople } from "@/api/people/requests";
import { Plus } from 'lucide-react';
import { useState } from "react";
import { DevTool } from "@hookform/devtools";
import {
  Form,
  InputField,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { peopleSchema as formSchema } from "@/lib/schemas/peopleSchema";


const page = () => {
  const [availableNetworks, setAvailableNetworks] = useState(['Instagram', 'Telegram', 'Vk', 'Discord', 'Github']);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => createPeople(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["people"]);
    },
    // onError: (error) => {
    //   const errorData = error.response.data.errors;
    //   errorDisplay(errorData, form);
    // },
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      patronymic: "",
      nickname: "",
      socialNetworks: [],
      dateOfBirth: "new Date()",
      country: "",
      city: "",
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control: form.control,
    name: "socialNetworks",
  });
  function addSocialNetwork(network, e) {
    e.preventDefault();
    append({ name: network, link: '' });
    setAvailableNetworks(availableNetworks.filter(n => n !== network));
  }
  function removeSocialNetwork(index, network) {
    remove(index);
    setAvailableNetworks([...availableNetworks, network]);
  }
  function onSubmit(values) {
    mutate(values)
  }

  return (
    <>
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
              name="nickname"
              label="Ник"
            />
            <div className="flex items-center space-x-4 h-9">
              <Label>Социальные сети</Label>
              {availableNetworks.length >0 && <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm"><Plus size={15}></Plus></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {availableNetworks.map(network => (
                    <DropdownMenuItem key={network} onClick={(e) => addSocialNetwork(network, e)}>
                      {network}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>}

            </div>
            {fields.map((socialNetwork, index) => (<InputField
              key={socialNetwork.name}
              deleteble={true}
              onDelete={() => removeSocialNetwork(index, socialNetwork.name)}
              control={form.control}
              name={`socialNetworks[${index}].link`}
              label={socialNetwork.name}
            />))}
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
      <DevTool control={form.control} />
    </>
  );
};
export default page;
