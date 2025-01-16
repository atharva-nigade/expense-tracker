import { Button } from "@/components/ui/button";
import Header from "./_components/Header";
import HeroPage from "./_components/Hero";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <Header></Header>
      <HeroPage></HeroPage>
    </div>
  );
}
