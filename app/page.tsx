import Header from "@/components/Header";
import FamilyTree from "@/components/FamilyTree";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-red-950/20 to-black">
      <Header />
      <FamilyTree />
    </main>
  );
}

