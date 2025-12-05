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

  // Extract Video ID from any YouTube URL
  const extractVideoId = (url) => {
    if (!url) return '';

    const pattern =
      /(?:youtube\.com\/.*v=|youtu\.be\/|youtube\.com\/embed\/)([^"&?/ ]{11})/;

    const match = url.match(pattern);
    return match ? match[1] : '';
  };

  // Convert YouTube URL to embed format
  const getEmbedUrl = (url) => {
    const id = extractVideoId(url);
    if (id) {
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return '';
  };

  const videoId = extractVideoId(safeData?.videoLink);

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

        <div className="w-full mt-10 aspect-video rounded-[12px] shadow-xl overflow-hidden">
          {!play ? (
            // Thumbnail + Play Button
            <div
              className="relative w-full h-full cursor-pointer"
              onClick={() => setPlay(true)}
            >
              {/* Thumbnail */}
              {videoId ? (
                <img
                  src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                  alt="YouTube Thumbnail"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                  }}
                />
              ) : (
                <div className="w-full h-full bg-black flex items-center justify-center">
                  <span className="text-white text-sm">Enter a YouTube link to see thumbnail</span>
                </div>
              )}

              {/* Play Button (Bottom Right) */}
              {videoId && (
                <div className="absolute bottom-10 right-10 h-20 w-20 flex justify-center items-center rounded-full border border-white hover:border-[#1bdd1b] group bg-black/40 backdrop-blur-sm">
                  <HiMiniPlay className="text-5xl text-white group-hover:text-[#1bdd1b]" />
                </div>
              )}
            </div>
          ) : (
            // YouTube Player
            <iframe
              className="w-full h-full"
              src={getEmbedUrl(safeData?.videoLink)}
              title="YouTube video"
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

