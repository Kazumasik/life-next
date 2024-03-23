"use client"
import { Input } from "@/components/ui/input";
import React from "react";
import { UserPlus } from "lucide-react";
import PeopleCard from "@/components/people/peopleCard";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getPeople } from "@/api/people/requests";
import { buttonVariants } from "@/components/ui/button";
const Diary = () => {
  const { status, data, error, isFetching } = useQuery({
    queryKey: ["people"],
    queryFn: getPeople,
    select: (data) => data.data,
  });
  return (
    <main className="wrapper">
      <section className="flex space-x-4">
        <Input placeholder="Введите имя человека" />
        <Link
          href="/people/new"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <UserPlus />
        </Link>
      </section>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {status === 'pending' ? (
            'Loading...'
          ) : status === 'error' ? (
            <span>Error: {error.message}</span>
          ) : (

            data.map((person, index) => (
              <PeopleCard key={index}  person={person}/>
            )))}
        </div>
    </main>
  );
};

export default Diary;
