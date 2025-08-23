
export default async function Page({ params }: { params: { examId: string } }) {

    return (
        <>
            <h1>Exams {params.examId}</h1>
        </>
    );
}