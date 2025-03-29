import Image from "next/image";
import GifsGrid from "./_components/GifsGrid";

export default function Home() {
  return (
    <main className="content">
      <div className="bg-primaryy">
        <h1 className="font-roboto text-3xl font-bold bg-bggg md:bg-red-400">Hello Inter</h1>
        <p className="font-inter">Simple text no classes</p>
      </div>
      <div>
        <GifsGrid />
      </div>
    </main>
  );
}
