"use client";

import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Subject, SubjectsResponse } from "@/types/subject";
import Link from "next/link";


export default function SubjectsList({ subjects, metadata }: SubjectsResponse) {
    
    const [displayed, setDisplayed] = useState<Subject[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const ITEMS_PER_PAGE = 6;

    useEffect(() => {
        setDisplayed(subjects.slice(0, ITEMS_PER_PAGE));
    }, [subjects]);

    const fetchMoreData = () => {
        const nextIndex = displayed.length;
        const nextSubjects = subjects.slice(nextIndex, nextIndex + ITEMS_PER_PAGE);
        setDisplayed(prev => [...prev, ...nextSubjects]);

        if (displayed.length + nextSubjects.length >= metadata.limit || nextIndex + ITEMS_PER_PAGE >= subjects.length) {
            setHasMore(false);
        }
    };

    return (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 py-6">
                {displayed.map(subject => (
                    <Link key={subject._id} href={`/exams`} className="group">
                        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition h-[448px] relative">
                            <CardContent className="p-0">
                                <div className="relative w-full h-[448px]">
                                    <Image
                                        src={subject.icon}
                                        alt={`Icon of ${subject.name}`}
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
                    </Link>
                ))}
            </div>
        </InfiniteScroll>
    );
}
