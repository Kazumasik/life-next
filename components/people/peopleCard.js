import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
const PeopleCard = ({ person }) => {
  return (
    <Link href={`/people/${person._id}`}>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex items-center space-x-2">
        <Skeleton className="w-[50px] h-[50px] rounded-full" />
        <div>
          <h3 className="text-sm font-semibold leading-none tracking-tight">
            {person.name + ' ' + person.surname}
          </h3>
          <h4 className="text-xs font-medium leading-none tracking-tight opacity-50">
            {person.nickname}
          </h4>
          <h4></h4>
        </div>
      </div>
    </Link>
  );
};

export default PeopleCard;
