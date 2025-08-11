import MyWorkSection from '@/components/MyWorkSection';

export default function WorkDemo() {
  return (
    <main className="bg-black">
      {/* Hero section for context */}
      <section className="h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4">Portfolio Demo</h1>
          <p className="text-xl text-gray-300">Scroll down to see the cinematic work section</p>
          <div className="mt-8 animate-bounce">
            <svg className="w-6 h-6 mx-auto text-[#e50914]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* My Work Section */}
      <MyWorkSection />

      {/* Footer section */}
      <section className="h-screen flex items-center justify-center bg-gradient-to-t from-gray-900 to-black">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">End of Demo</h2>
          <p className="text-lg text-gray-300">The cinematic work section is complete</p>
        </div>
      </section>
    </main>
  );
}