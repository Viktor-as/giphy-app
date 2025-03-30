import Image from "next/image";
import GifsGrid from "./_components/GifsGrid";

export default function Home() {
  return (
    <main className="content ">
      <div className="center mt-[1.6rem] mb-[3.2rem] ">
        <h1>Giphy</h1>
      </div>
      <GifsGrid />
    </main>
  );
}
