import React, { useState, useEffect } from 'react';
import { getSection, updateSection } from '../services/api';
import EditableSection from '../components/common/EditableSection';
import EditableAnalWoundCareHero from '../components/anal_wound_care/EditableAnalWoundCareHero';
import EditableAnalWoundCareContent from '../components/anal_wound_care/EditableAnalWoundCareContent';

const AnalWoundCareCMS = () => {
  const [sections, setSections] = useState({
    hero: null,
    content: null,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({});
  const [localData, setLocalData] = useState({});

  useEffect(() => {
    loadAllSections();
  }, []);

  const loadAllSections = async () => {
    try {
      const results = await Promise.allSettled([
        getSection('anal-wound-care', 'hero'),
        getSection('anal-wound-care', 'content'),
      ]);
      
      const [hero, content] = results.map(result => {
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

      setLocalData({
        hero: hero || { backgroundImage: '', title: 'After Anal Surgery Wound Care', description: '', buttonText: 'Book a Consultation' },
        content: content || { 
          mainTitle: 'All you need to know..',
          leftTopSection: { title: '', description: '' },
          leftBottomSection: { title: '', description: '' },
          centerImage: '',
          centerImageAlt: '',
          rightTopSection: { title: '', description: '' },
          rightMiddleSection: { title: '', description: '' },
          rightBottomSection: { title: '', description: '' },
        },
      });

      setLoading(false);
    } catch (error) {
      console.error('Error loading sections:', error);
      setLoading(false);
    }
  };

  const handleSave = async (sectionKey, showAlert = true) => {
    setSaving({ ...saving, [sectionKey]: true });
    try {
      const routeMap = {
        hero: 'hero',
        content: 'content',
      };

      const dataToSave = localData[sectionKey];
      const updated = await updateSection('anal-wound-care', routeMap[sectionKey], dataToSave);
      
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
      {/* Hero Section */}
      <EditableSection
        onSave={() => handleSave('hero')}
        saving={saving.hero}
        sectionName="Hero"
      >
        <EditableAnalWoundCareHero
          data={localData.hero}
          onDataChange={(newData) => updateLocalData('hero', newData)}
        />
      </EditableSection>

      {/* Content Section */}
      <EditableSection
        onSave={() => handleSave('content')}
        saving={saving.content}
        sectionName="Content"
      >
        <EditableAnalWoundCareContent
          data={localData.content}
          onDataChange={(newData) => updateLocalData('content', newData)}
        />
      </EditableSection>
    </div>
  );
};

export default AnalWoundCareCMS;

