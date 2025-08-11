import WhatIDoSection from '../../components/WhatIDoSection';

export default function WhatIDoDemo() {
  return (
    <div className="min-h-screen bg-black">
      {/* Spacer to allow scrolling */}
      <div className="h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">Bharath Naidu</h1>
          <p className="text-2xl text-gray-400">Video Editor & Cinematographer</p>
          <p className="text-lg text-gray-500 mt-8">Scroll down to see the "What I Do" section</p>
        </div>
      </div>
      
      {/* What I Do Section */}
      <WhatIDoSection />
      
      {/* Bottom spacer */}
      <div className="h-screen bg-black flex items-center justify-center">
        <p className="text-gray-500">End of demo</p>
      </div>
    </div>
  );
}