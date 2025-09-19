export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Rankora</h1>
      <p className="text-lg text-gray-600 max-w-xl">
        Explore faculty details, stay connected, and make the most of your college journey.
      </p>
      <a
        href="/faculty"
        className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition"
      >
        Go to Faculty Directory
      </a>
    </div>
  );
}
