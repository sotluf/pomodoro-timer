import Timer from "@/components/timer";

export default function Home() {
  return (
    <main className="bg-[#B2180A] min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-7xl mb-8 text-[#EECB6D] font-bagel">
        Pomodoro Timer
      </h1>
      <Timer />
    </main>
  );
}
