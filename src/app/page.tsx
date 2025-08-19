import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="flex justify-center items-center w-6/12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Exam App</h1>
          <p className="text-lg">Your journey to smarter exams starts here.</p>
        </div>
      </section>
    </main>
  );
}
