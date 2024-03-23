"use client"
import React from "react";
import { useSearchParams } from 'next/navigation'
import { getPeopleById } from "@/api/people/requests";
import { useRouter } from 'next/navigation'
import { useQuery } from "@tanstack/react-query";
import { calculateAge } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTelegram } from '@fortawesome/free-brands-svg-icons'
const Page = ({ params }) => {

  const { status, data, error, isFetching } = useQuery({
    queryKey: ["people", params.id],
    queryFn: () => getPeopleById(params.id),
    select: (data) => data.data,
  });

  return (
    <main className="wrapper">
      {status === "pending" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <h1 className=" text-xl font-semibold tracking-tight">
            {data.surname + " " + data.name + " " + data.patronymic}
          </h1>
          <h3 className="text-lg tracking-tight">
            {data.nickname}
          </h3>
          <div>
            {data.socialNetworks.map((network, index) => (<Button variant="outline" size="icon">
              <FontAwesomeIcon icon={faTelegram} size="xl" />

            </Button>))}

          </div>
          <h3 className="text-lg tracking-tight">{calculateAge(data.dateOfBirth) + " лет"}</h3>
        </>
      )}
    </main>
  );
};

export default Page;
