import React, { useEffect, useState } from 'react';
import { getSection, updateSection } from '../services/api';
import EditableSection from '../components/common/EditableSection';
import EditableContactMain from '../components/contactmain/EditableContactMain';


const ContactMainCMS = () => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContact();
  }, []);

  const loadContact = async () => {
    try {
      const res = await getSection('contactmain', 'contact');
      setContact(
        res || {
          heading: 'Ready to Feel Better Naturally?',
          text1: 'text1 example',
          text2: 'text2 example',
          backgroundImage: '',
        }
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSection('contactmain', 'contact', contact);
      alert('✅ Contact saved');
    } catch (err) {
      console.error(err);
      alert('❌ Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <EditableSection
      sectionName="Contact Main"
      onSave={handleSave}
      saving={saving}
    >
      <EditableContactMain
        data={contact}
        onDataChange={setContact}
      />
    </EditableSection>
  );
};

export default ContactMainCMS;
