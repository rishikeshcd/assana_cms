import React, { useState, useEffect } from 'react';
import { getSection, updateSection } from '../../services/api';
import EditableSection from '../../components/common/EditableSection';
import EditableBandingPilesHero from '../../components/colorectal_clinic/banding_piles/EditableBandingPilesHero';
import EditableBandingPilesContent from '../../components/colorectal_clinic/banding_piles/EditableBandingPilesContent';

/**
 * BandingPilesCMS - CMS version for Banding Piles page sections
 */
const BandingPilesCMS = () => {
  const [sections, setSections] = useState({
    hero: null,
    content: null,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({});
  const [localData, setLocalData] = useState({});

  // Fetch all sections data ONCE
  useEffect(() => {
    loadAllSections();
  }, []);

  const loadAllSections = async () => {
    try {
      const results = await Promise.allSettled([
        getSection('banding-piles', 'hero'),
        getSection('banding-piles', 'content'),
      ]);

      const [hero, content] = results.map((result) => {
        if (result.status === 'fulfilled') {
          return result.value;
        } else {
          console.error('Error fetching section:', result.reason);
          return null;
        }
      });

      setSections({
        hero: hero || null,
        content: content || null,
      });

      // Initialize local editing data with defaults
      setLocalData({
        hero:
          hero || {
            backgroundImage: '',
            title: 'Banding of Piles or Haemorrhoids',
            description: '',
            buttonText: 'Book a Consultation',
          },
        content:
          content || {
            mainTitle: 'All you need to know..',
            leftTopSection: { title: '', description: '' },
            leftBottomSection: { title: '', description: '' },
            centerImage: '',
            centerImageAlt: '',
            rightTopSection: { title: '', description: '' },
            rightBottomSection: { title: '', description: '' },
          },
      });

      setLoading(false);
    } catch (error) {
      console.error('Error loading sections:', error);
      setLoading(false);
    }
  };

  // Save a specific section
  const handleSave = async (sectionKey, showAlert = true) => {
    setSaving({ ...saving, [sectionKey]: true });
    try {
      const routeMap = {
        hero: 'hero',
        content: 'content',
      };

      const dataToSave = localData[sectionKey];
      const updated = await updateSection('banding-piles', routeMap[sectionKey], dataToSave);

      setSections({ ...sections, [sectionKey]: updated });
      setLocalData({ ...localData, [sectionKey]: { ...updated } });

      if (showAlert) {
        alert('✅ Saved successfully!');
      }
      return true;
    } catch (error) {
      console.error('Error saving:', error);
      if (showAlert) {
        alert('❌ Failed to save. Please try again.');
      }
      return false;
    } finally {
      setSaving({ ...saving, [sectionKey]: false });
    }
  };

  // Update local editing data
  const updateLocalData = (sectionKey, newData) => {
    setLocalData({
      ...localData,
      [sectionKey]: newData,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Piles Hero Section */}
      <EditableSection
        onSave={() => handleSave('hero')}
        saving={saving.hero}
        sectionName="Banding Piles Hero"
      >
        <EditableBandingPilesHero
          data={localData.hero || { backgroundImage: '', title: 'Banding of Piles or Haemorrhoids', description: '', buttonText: 'Book a Consultation' }}
          onDataChange={(newData) => updateLocalData('hero', newData)}
        />
      </EditableSection>

      {/* Piles Content Section */}
      <EditableSection
        onSave={() => handleSave('content')}
        saving={saving.content}
        sectionName="Banding Piles Content"
      >
        <EditableBandingPilesContent
          data={localData.content || { mainTitle: 'All you need to know..', leftTopSection: { title: '', description: '' }, leftBottomSection: { title: '', description: '' }, centerImage: '', centerImageAlt: '', rightTopSection: { title: '', description: '' }, rightBottomSection: { title: '', description: '' } }}
          onDataChange={(newData) => updateLocalData('content', newData)}
        />
      </EditableSection>
    </div>
  );
};

export default BandingPilesCMS;

