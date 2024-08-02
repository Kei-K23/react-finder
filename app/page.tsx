import FileTreeContainer from "@/components/file-tree-container";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FileTreeContainer />
    </main>
  );
}
