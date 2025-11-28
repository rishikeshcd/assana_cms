import React, { useState, useEffect } from 'react';
import { getSection, updateSection } from '../services/api';
import EditableSection from '../components/EditableSection';
import EditableAboutHero from '../components/EditableAboutHero';
import EditableAboutWhyChoose from '../components/EditableAboutWhyChoose';
import EditableAboutMissionVision from '../components/EditableAboutMissionVision';
import EditableAboutTeam from '../components/EditableAboutTeam';

/**
 * AboutCMS - CMS version for About page sections
 * Data is fetched once and passed to each component
 * Each component is wrapped with editing capabilities and Save button
 */
const AboutCMS = () => {
  const [sections, setSections] = useState({
    hero: null,
    whyChoose: null,
    missionVision: null,
    team: null,
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
      // Fetch all sections in parallel, with error handling for each
      const results = await Promise.allSettled([
        getSection('about', 'hero'),
        getSection('about', 'why-choose'),
        getSection('about', 'mission-vision'),
        getSection('about', 'team'),
      ]);
      
      const [
        hero,
        whyChoose,
        missionVision,
        team,
      ] = results.map(result => {
        if (result.status === 'fulfilled') {
          return result.value;
        } else {
          console.error('Error fetching section:', result.reason);
          return null;
        }
      });

      // Store fetched data (handle null values)
      setSections({
        hero: hero || null,
        whyChoose: whyChoose || null,
        missionVision: missionVision || null,
        team: team || null,
      });

      // Initialize local editing data (copy of fetched data, with defaults for null/empty)
      setLocalData({
        hero: hero || { aboutBanner: '', bannerHeading: '', bannerSubHeading: '' },
        whyChoose: whyChoose || { heading: '', subtitle: '', buttonText: '', description: '' },
        missionVision: missionVision || { missionHeading: '', missionText: '', visionHeading: '', visionText: '' },
        team: team || { sectionHeading: 'Meet our Team', teamMembers: [] },
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
        whyChoose: 'why-choose',
        missionVision: 'mission-vision',
        team: 'team',
      };

      // Get the edited data from local state
      const dataToSave = localData[sectionKey];
      
      // Save to backend
      const updated = await updateSection('about', routeMap[sectionKey], dataToSave);
      
      // Update both sections (fetched) and localData (editing)
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

  // Update local editing data (doesn't save to backend until Save button clicked)
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
      {/* About Hero Section */}
      <EditableSection
        onSave={() => handleSave('hero')}
        saving={saving.hero}
        sectionName="About Hero"
      >
        <EditableAboutHero
          data={localData.hero || { aboutBanner: '', bannerHeading: '', bannerSubHeading: '' }}
          onDataChange={(newData) => updateLocalData('hero', newData)}
        />
      </EditableSection>

      {/* About Why Choose Section */}
      <EditableSection
        onSave={() => handleSave('whyChoose')}
        saving={saving.whyChoose}
        sectionName="Why Choose ASSANA"
      >
        <EditableAboutWhyChoose
          data={localData.whyChoose || { heading: '', subtitle: '', buttonText: '', description: '' }}
          onDataChange={(newData) => updateLocalData('whyChoose', newData)}
        />
      </EditableSection>

      {/* About Mission Vision Section */}
      <EditableSection
        onSave={() => handleSave('missionVision')}
        saving={saving.missionVision}
        sectionName="Mission & Vision"
      >
        <EditableAboutMissionVision
          data={localData.missionVision || { missionHeading: '', missionText: '', visionHeading: '', visionText: '' }}
          onDataChange={(newData) => updateLocalData('missionVision', newData)}
        />
      </EditableSection>

      {/* About Team Section */}
      <EditableSection
        onSave={() => handleSave('team')}
        saving={saving.team}
        sectionName="Meet our Team"
      >
        <EditableAboutTeam
          data={localData.team || { sectionHeading: 'Meet our Team', teamMembers: [] }}
          onDataChange={(newData) => updateLocalData('team', newData)}
        />
      </EditableSection>
    </div>
  );
};

export default AboutCMS;

