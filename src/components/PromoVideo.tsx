import React from 'react';
import Animated from './Animated';
import { Play } from 'lucide-react';
import { supabase } from '../lib/supabase';

const PromoVideo: React.FC = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [videoUrl, setVideoUrl] = React.useState('v1.mp4');

  React.useEffect(() => {
    const fetchVideoUrl = async () => {
      const { data } = await supabase
        .from('site_content')
        .select('content_value')
        .eq('id', 'promo_video_url')
        .single();
      if (data) setVideoUrl(data.content_value);
    };
    fetchVideoUrl();
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.muted = false;
        videoRef.current.volume = 1.0;
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ffae1f]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <Animated>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Experience the <span className="text-[#ffae1f]">Impact</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              See how PAWIN is bridging the gap between local innovation and global investment, 
              driving sustainable development across the continent.
            </p>
          </Animated>
        </div>

        <Animated delay={200}>
          <div className="relative group max-w-5xl mx-auto">
            {/* Video Container */}
            <div className="aspect-video bg-slate-900 rounded-[2rem] border border-slate-800 overflow-hidden shadow-2xl relative group-hover:border-[#ffae1f]/30 transition-all duration-700">
              <video 
                ref={videoRef}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 cursor-pointer"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onClick={togglePlay}
                poster="img/Pawin banner.jpg"
                playsInline
                muted={false}
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Custom Yellow Play Button */}
              {!isPlaying && (
                <button 
                  onClick={togglePlay}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#ffae1f] rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,174,31,0.4)] hover:scale-110 hover:bg-[#ffbe4d] active:scale-95 transition-all z-30 group/btn"
                >
                  <Play className="size-10 text-slate-950 fill-slate-950 ml-1.5 group-hover/btn:scale-110 transition-transform" />
                  
                  {/* Ripple Effect */}
                  <div className="absolute inset-0 rounded-full bg-[#ffae1f]/20 animate-ping" />
                </button>
              )}
              
              {/* Decorative Overlay */}
              <div className={`absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0a0c10]/60 via-transparent to-transparent transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'}`} />
            </div>
          </div>
        </Animated>
      </div>
    </section>
  );
};

export default PromoVideo;
