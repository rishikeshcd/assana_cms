import React, { useState, useEffect } from 'react';
import { getSection, updateSection } from '../services/api';
import EditableSection from '../components/common/EditableSection';

// Import actual components from public site - they will be modified to accept data props
// For now, we use editable wrappers that match the exact structure
import EditableBanner from '../components/home/EditableBanner';
import EditableDropdownMenu from '../components/home/EditableDropdownMenu';
import EditableWhyAssana from '../components/home/EditableWhyAssana';
import EditableServices from '../components/home/EditableServices';
import EditableHomeYoutube from '../components/home/EditableHomeYoutube';
import EditableTryDemo from '../components/home/EditableTryDemo';
import EditableFrequentlyQA from '../components/home/EditableFrequentlyQA';
import EditablePatientSays from '../components/home/EditablePatientSays';

/**
 * HomeCMS - CMS version that reuses the same component structure
 * Data is fetched once and passed to each component
 * Each component is wrapped with editing capabilities and Save button
 */
const HomeCMS = () => {
  const [sections, setSections] = useState({
    banner: null,
    services: null,
    whyAssana: null,
    whyDifferent: null,
    servicesComponent: null,
    video: null,
    patientFeedback: null,
    askedQuestions: null,
    getStarted: null,
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
        getSection('home', 'banner'),
        getSection('home', 'services'),
        getSection('home', 'why-assana'),
        getSection('home', 'services-component'),
        getSection('home', 'video'),
        getSection('home', 'patient-feedback'),
        getSection('home', 'asked-questions'),
        getSection('home', 'get-started'),
      ]);
      
      const [
        banner,
        services,
        whyAssana,
        servicesComponent,
        video,
        patientFeedback,
        askedQuestions,
        getStarted,
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
        banner: banner || null,
        services: services || null,
        whyAssana: whyAssana || null,
        whyDifferent: whyAssana || null, // why-different is now part of why-assana
        servicesComponent: servicesComponent || null,
        video: video || null,
        patientFeedback: patientFeedback || null,
        askedQuestions: askedQuestions || null,
        getStarted: getStarted || null,
      });

      // Initialize local editing data (copy of fetched data, with defaults for null/empty)
      setLocalData({
        banner: banner || {},
        services: services || {},
        whyAssana: whyAssana || {},
        whyDifferent: whyAssana || {}, // why-different is now part of why-assana
        servicesComponent: servicesComponent || { componentHeading: '', services: [] },
        video: video || { Heading: '', subHeading: '', videoLink: '' },
        patientFeedback: patientFeedback || { componentHeading: '', componentSubHeading: '', testimonials: [] },
        askedQuestions: askedQuestions || { componentHeading: '', faqs: [] },
        getStarted: getStarted || { Heading: '', subHeading: '', backgroundImage: '', button1Text: 'Start Free Symptom Check', button2Text: 'Get Started' },
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
        banner: 'banner',
        services: 'services',
        whyAssana: 'why-assana',
        // whyDifferent is now merged into why-assana
        servicesComponent: 'services-component',
        video: 'video',
        patientFeedback: 'patient-feedback',
        askedQuestions: 'asked-questions',
        getStarted: 'get-started',
      };

      // Get the edited data from local state
      const dataToSave = localData[sectionKey];
      
      // Save to backend
      const updated = await updateSection('home', routeMap[sectionKey], dataToSave);
      
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
      {/* Banner Section - Uses editable wrapper with same structure as public Banner */}
      {localData.banner && (
        <EditableSection
          onSave={() => handleSave('banner')}
          saving={saving.banner}
          sectionName="Banner"
        >
          <EditableBanner
            data={localData.banner}
            onDataChange={(newData) => updateLocalData('banner', newData)}
          />
        </EditableSection>
      )}

      {/* Dropdown Menu Section */}
      {localData.services && (
        <EditableSection
          onSave={() => handleSave('services')}
          saving={saving.services}
          sectionName="Services Menu"
        >
          <EditableDropdownMenu
            data={localData.services}
            onDataChange={(newData) => updateLocalData('services', newData)}
          />
        </EditableSection>
      )}

      {/* Why Assana Section (contains both WhyAssana and WhyDifferent) */}
      {localData.whyAssana && (
        <EditableSection
          onSave={() => handleSave('whyAssana')}
          saving={saving.whyAssana}
          sectionName="Why Assana & Why Different"
        >
          <EditableWhyAssana
            data={localData.whyAssana}
            onDataChange={(newData) => updateLocalData('whyAssana', newData)}
          />
        </EditableSection>
      )}

      {/* Services Component Section */}
      <EditableSection
        onSave={() => handleSave('servicesComponent')}
        saving={saving.servicesComponent}
        sectionName="Services"
      >
        <EditableServices
          data={localData.servicesComponent || { componentHeading: '', services: [] }}
          onDataChange={(newData) => updateLocalData('servicesComponent', newData)}
        />
      </EditableSection>

      {/* Video/YouTube Section */}
      <EditableSection
        onSave={() => handleSave('video')}
        saving={saving.video}
        sectionName="Video"
      >
        <EditableHomeYoutube
          data={localData.video || { Heading: '', subHeading: '', videoLink: '' }}
          onDataChange={(newData) => updateLocalData('video', newData)}
        />
      </EditableSection>

      {/* Patient Feedback / Patient Says Section */}
      <EditableSection
        onSave={() => handleSave('patientFeedback')}
        saving={saving.patientFeedback}
        sectionName="Patient Feedback"
      >
        <EditablePatientSays
          data={localData.patientFeedback || { componentHeading: '', componentSubHeading: '', testimonials: [] }}
          onDataChange={(newData) => updateLocalData('patientFeedback', newData)}
        />
      </EditableSection>

      {/* Frequently Asked Questions Section */}
      <EditableSection
        onSave={() => handleSave('askedQuestions')}
        saving={saving.askedQuestions}
        sectionName="FAQ"
      >
        <EditableFrequentlyQA
          data={localData.askedQuestions || { componentHeading: '', faqs: [] }}
          onDataChange={(newData) => updateLocalData('askedQuestions', newData)}
        />
      </EditableSection>

      {/* Get Started / Try Demo Section */}
      <EditableSection
        onSave={() => handleSave('getStarted')}
        saving={saving.getStarted}
        sectionName="Get Started"
      >
        <EditableTryDemo
          data={localData.getStarted || { Heading: '', subHeading: '', backgroundImage: '' }}
          onDataChange={(newData) => updateLocalData('getStarted', newData)}
        />
      </EditableSection>

      

      {/* Add more sections following the same pattern */}
    </div>
  );
};

export default HomeCMS;
