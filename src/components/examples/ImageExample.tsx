import React from 'react';
import { OptimizedImage } from '../utils/imageUtils';
import { OptimizedBackground } from './OptimizedBackground';

const ImageExample: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Image Optimization Examples</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">1. Optimized Image Component</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Regular Image</h3>
            <img 
              src="/img/student.jpg" 
              alt="Student" 
              className="w-full h-auto rounded-lg shadow-md"
              loading="lazy"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Optimized Image</h3>
            <OptimizedImage 
              src="/img/student.jpg" 
              alt="Student" 
              className="w-full h-auto rounded-lg shadow-md"
              width={400}
              height={300}
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">2. Optimized Background</h2>
        <div className="h-64 rounded-lg overflow-hidden">
          <OptimizedBackground 
            src="/img/group-afro-americans-working-together.jpg"
            className="h-full flex items-center justify-center"
          >
            <div className="bg-black bg-opacity-50 text-white p-6 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-2">Optimized Background</h3>
              <p>This background image is loaded with lazy loading and WebP optimization</p>
            </div>
          </OptimizedBackground>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-2">OptimizedImage Component</h3>
          <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
            {`import { OptimizedImage } from '../utils/imageUtils';

// In your component
<OptimizedImage 
  src="/path/to/image.jpg" 
  alt="Description" 
  className="your-classes"
  width={400}
  height={300}
  loading="lazy"
/>`}
          </pre>

          <h3 className="text-lg font-medium mt-6 mb-2">OptimizedBackground Component</h3>
          <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
            {`import { OptimizedBackground } from './OptimizedBackground';

// In your component
<OptimizedBackground 
  src="/path/to/background.jpg"
  className="h-64 flex items-center justify-center"
>
  {/* Your content here */}
  <div className="text-white text-center">
    <h3>Background Content</h3>
  </div>
</OptimizedBackground>`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default ImageExample;
