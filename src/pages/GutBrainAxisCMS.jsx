import React, { useState, useEffect } from 'react';
import { getSection, updateSection } from '../services/api';
import EditableSection from '../components/common/EditableSection';
import EditableGutBrainAxisHero from '../components/gut_wellness/gut_brain_axis/EditableGutBrainAxisHero';
import EditableGutBrainAxisMain from '../components/gut_wellness/gut_brain_axis/EditableGutBrainAxisMain';

/**
 * GutBrainAxisCMS - CMS version for Gut Brain Axis page sections
 */
const GutBrainAxisCMS = () => {
  const [sections, setSections] = useState({
    hero: null,
    main: null,
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
        getSection('gut-wellness', 'gut-brain-axis/hero'),
        getSection('gut-wellness', 'gut-brain-axis/main'),
      ]);

      const [hero, main] = results.map((result) => {
        if (result.status === 'fulfilled') {
          return result.value;
        } else {
          console.error('Error fetching section:', result.reason);
          return null;
        }
      });

      setSections({
        hero: hero || null,
        main: main || null,
      });

      // Initialize local editing data with defaults
      setLocalData({
        hero:
          hero || {
            backgroundImage: '',
            title: 'Gut Brain Axis & The Gut Microbiome',
            description: '',
            buttonText: 'Book a Consultation',
          },
        main:
          main || {
            mainTitle: 'Assana Life',
            subtitle: 'Our Gut Wellness Programme.',
            mainHeading: 'Transforming Health from the Inside Out.',
            introDescription: '',
            approachHeading: 'Our Holistic Approach to Gut Wellness',
            approaches: [],
            conclusion: '',
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
        hero: 'gut-brain-axis/hero',
        main: 'gut-brain-axis/main',
      };

      const dataToSave = localData[sectionKey];
      const updated = await updateSection('gut-wellness', routeMap[sectionKey], dataToSave);

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
      {/* Gut Brain Axis Hero Section */}
      <EditableSection
        onSave={() => handleSave('hero')}
        saving={saving.hero}
        sectionName="Gut Brain Axis Hero"
      >
        <EditableGutBrainAxisHero
          data={localData.hero || { backgroundImage: '', title: 'Gut Brain Axis & The Gut Microbiome', description: '', buttonText: 'Book a Consultation' }}
          onDataChange={(newData) => updateLocalData('hero', newData)}
        />
      </EditableSection>

      {/* Gut Brain Axis Main Section */}
      <EditableSection
        onSave={() => handleSave('main')}
        saving={saving.main}
        sectionName="Gut Brain Axis Main Content"
      >
        <EditableGutBrainAxisMain
          data={localData.main || { mainTitle: 'Assana Life', subtitle: 'Our Gut Wellness Programme.', mainHeading: 'Transforming Health from the Inside Out.', introDescription: '', approachHeading: 'Our Holistic Approach to Gut Wellness', approaches: [], conclusion: '' }}
          onDataChange={(newData) => updateLocalData('main', newData)}
        />
      </EditableSection>
    </div>
  );
};

export default GutBrainAxisCMS;

