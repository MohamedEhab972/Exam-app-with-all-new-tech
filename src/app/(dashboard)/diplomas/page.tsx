"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { getAccessToken } from "@/lib/auth";
import { ChevronDown } from "lucide-react";
import { Subject } from "@/types/subject";

export default function SubjectsPage() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [displayed, setDisplayed] = useState<Subject[]>([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchSubjects = async () => {
            const token = await getAccessToken();

            const res = await fetch(`https://exam.elevateegy.com/api/v1/subjects`, {
                cache: "no-store",
                headers: {
                    token: token || "",
                },
            });
            const data = await res.json();
            setSubjects(data.subjects || []);
            setDisplayed(data.subjects?.slice(0, 6) || []);
        };

        fetchSubjects();
    }, []);

    const fetchMoreData = () => {
        if (displayed.length >= subjects.length) {
            setHasMore(false); 
            return;
        }

        const nextSubjects = subjects.slice(displayed.length, displayed.length + 6);
        setDisplayed((prev) => [...prev, ...nextSubjects]);
    };

    return (
        <section className="py-6">
            <InfiniteScroll
                dataLength={displayed.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={
                    <div className="flex flex-col items-center justify-center p-2 gap-1 my-6">
                        <h4 className="text-center geist-mono-regular text-[#4B5563]">Scroll to view more</h4>
                        <ChevronDown className="animate-bounce text-[#cbcfd5]" />
                    </div>
                }
                endMessage={<p className="text-center geist-mono-regular py-4 text-[#4B5563]">No more subjects</p>}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {displayed.map((subject) => (
                        <Card
                            key={subject._id}
                            className="overflow-hidden shadow-lg hover:shadow-xl transition h-[340px] relative"
                        >
                            <CardContent className="p-0">
                                <div className="relative w-full h-[340px]">
                                    <Image
                                        src={subject.icon}
                                        alt={subject.name}
                                        fill
                                        className="object-cover rounded-md"
                                        sizes="100vw"
                                        priority={false}
                                    />
                                    <div className="absolute bottom-0 w-full p-3">
                                        <h2 className="text-white geist-mono-semibold bg-primary/50 px-4 py-1 h-[67px] flex items-center">
                                            {subject.name}
                                        </h2>
                                    </div>
                                </div>
                            </CardContent>

                        </Card>
                    ))}
                </div>
            </InfiniteScroll>
        </section>
    );
}
