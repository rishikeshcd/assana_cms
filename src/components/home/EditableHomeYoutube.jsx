import React, { useState } from 'react';
import EditableText from '../common/EditableText';
import { HiMiniPlay } from "react-icons/hi2";

/**
 * EditableHomeYoutube - CMS version with editing capabilities
 * Uses the exact same structure as public HomeYoutube component
 */
const EditableHomeYoutube = ({ data, onDataChange }) => {
  const [play, setPlay] = useState(false);

  // Ensure data exists with defaults
  const safeData = data || { Heading: '', subHeading: '', videoLink: '' };

  const updateField = (field, value) => {
    onDataChange({ ...safeData, [field]: value });
  };

  // Convert YouTube URL to embed format
  const getEmbedUrl = (url) => {
    if (!url) return '';
    
    // If already in embed format, return as is
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    // Extract video ID from various YouTube URL formats
    let videoId = '';
    
    // Format: https://www.youtube.com/watch?v=VIDEO_ID
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('watch?v=')[1]?.split('&')[0];
    }
    // Format: https://youtu.be/VIDEO_ID
    else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    }
    // Format: https://www.youtube.com/embed/VIDEO_ID (already embed)
    else if (url.includes('youtube.com/embed/')) {
      return url;
    }
    // If it's just a video ID
    else if (url.length === 11 && !url.includes('/') && !url.includes('?')) {
      videoId = url;
    }
    
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    return url; // Return original if can't parse
  };

  return (
    <section className='max-w-[1600px] m-auto mb-5 bg-[]'>
      <div className='w-[95%] m-auto'>
        <h1 className="font-[Raleway] smallShadow lg:textShadow text-black text-3xl sm:text-4xl lg:text-6xl lg:mt-30 text-center">
          <EditableText
            value={safeData?.Heading || ''}
            onChange={(value) => updateField('Heading', value)}
            tag="span"
            className="block"
          />
        </h1>
        <p className="font-[Raleway] text-base sm:text-xl text-[#555555] mt-4 text-center">
          <EditableText
            value={safeData?.subHeading || ''}
            onChange={(value) => updateField('subHeading', value)}
            tag="span"
            className="block"
          />
        </p>

        <div className={play ? "w-full mt-10 aspect-video rounded-[12px] shadow-xl overflow-hidden" : "w-full h-130 mt-10 aspect-video rounded-[12px] shadow-xl overflow-hidden"}>
          {!play ? (
            <div
              className="w-full h-full flex items-end justify-end bg-black cursor-pointer"
              onClick={() => setPlay(true)}
            >
              <div className='bg-[] h-20 w-20 mb-10 mr-10 flex justify-center items-center rounded-full border-1 border-[white] hover:border-[#1bdd1b] group'> 
                <HiMiniPlay className="text-5xl lg:text-5xl text-[white] group-hover:text-[#1bdd1b]" />
              </div>
            </div>
          ) : (
            <iframe
              className="w-full h-full"
              src={getEmbedUrl(safeData?.videoLink)}
              title="Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>

        {/* Video Link Editor */}
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <label className="block text-sm font-semibold mb-2">
            Video Link (YouTube URL or Video ID):
          </label>
          <EditableText
            value={safeData?.videoLink || ''}
            onChange={(value) => updateField('videoLink', value)}
            multiline={false}
            className="w-full p-2 border rounded"
            placeholder="https://www.youtube.com/watch?v=VIDEO_ID or just VIDEO_ID"
          />
          <p className="text-xs text-gray-500 mt-2">
            Accepts: YouTube watch URL, youtu.be URL, embed URL, or just the video ID
          </p>
        </div>
      </div>
    </section>
  );
};

export default EditableHomeYoutube;

