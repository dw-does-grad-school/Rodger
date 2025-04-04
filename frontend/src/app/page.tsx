import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Movie Recommendation System
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover your next favorite movie
          </p>
        </div>
      </main>
    </div>
  );
}
