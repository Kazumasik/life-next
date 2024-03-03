import { Input } from "@/components/ui/input";
import React from "react";
import { UserPlus } from "lucide-react";
import PeopleCard from "@/components/people/peopleCard";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
const Diary = () => {
  const people = new Array(20).fill(0);
  return (
    <main className="wrapper">
      <section className="flex space-x-4">
        <Input placeholder="Введите имя человека" />
        <Link
          href="/people/new"
          className={cn(buttonVariants({ variant: "outline"}))}
        >
          <UserPlus />
        </Link>
      </section>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {people.map((_, index) => (
          <PeopleCard key={index} />
        ))}
      </div>
    </main>
  );
};

export default Diary;
