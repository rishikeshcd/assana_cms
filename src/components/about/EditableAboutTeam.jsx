import React from 'react';
import EditableText from '../common/EditableText';
import EditableImage from '../common/EditableImage';

/**
 * EditableAboutTeam - CMS wrapper for AboutTeam component
 */
const EditableAboutTeam = ({ data, onDataChange }) => {
  const safeData = data || {
    sectionHeading: '',
    teamMembers: [],
  };

  const teamMembers = safeData.teamMembers || [];

  const updateSectionHeading = (value) => {
    onDataChange({ ...safeData, sectionHeading: value });
  };

  const updateTeamMember = (index, field, value) => {
    const updated = [...teamMembers];
    updated[index] = { ...updated[index], [field]: value };
    onDataChange({ ...safeData, teamMembers: updated });
  };

  const addNewMember = () => {
    const newMember = {
      role: '',
      profileImage: '',
      name: '',
      title: '',
      description: '',
    };
    onDataChange({ ...safeData, teamMembers: [...teamMembers, newMember] });
  };

  const removeMember = (index) => {
    const updated = teamMembers.filter((_, i) => i !== index);
    onDataChange({ ...safeData, teamMembers: updated });
  };

  return (
    <section className='w-full overflow-hidden py-12 lg:py-20 bg-gray-100'>
      <div className='w-[95%] m-auto'>
        {/* Section Heading */}
        <h1 className='font-[Raleway] text-black text-center text-3xl sm:text-4xl lg:text-5xl font-bold mb-12'>
          <EditableText
            value={safeData?.sectionHeading || ''}
            onChange={updateSectionHeading}
            tag="span"
            className="block"
          />
        </h1>

        {/* Team Members Grid */}
        <div className='flex flex-col lg:flex-row justify-center items-center lg:justify-evenly gap-6 lg:gap-8 max-w-[90%] m-auto'>
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className='bg-white rounded-xl p-6 lg:p-8 shadow-lg relative border-2 border-blue-200'
            >
              {/* Role Tag - Centered above card, overlapping */}
              <div 
                className='absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white border border-red-300 text-[#E54B4B] px-4 py-1.5 rounded-full text-base lg:text-lg font-semibold z-10'
                style={{ boxShadow: '2.69px 0.9px 19.9px 0px #F05A5A66' }}
              >
                <EditableText
                  value={member?.role || ''}
                  onChange={(value) => updateTeamMember(index, 'role', value)}
                  className="inline-block min-w-[80px]"
                  placeholder="Role (e.g., Founder)"
                />
              </div>

              {/* Content Layout - Horizontal */}
              <div className='flex flex-col md:flex-row gap-6 mt-4'>
                {/* Profile Picture - Left Side */}
                <div className='flex-shrink-0 flex justify-center md:justify-start'>
                  <div className='relative w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-[#E54B4B] overflow-hidden flex items-center justify-center'>
                    {member.profileImage ? (
                      <img
                        src={member.profileImage}
                        alt={member.name || `Team Member ${index + 1}`}
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <div className='text-white text-4xl font-bold'>
                        {(member.name || 'TM')[0].toUpperCase()}
                      </div>
                    )}
                    {/* EditableImage overlay */}
                    <EditableImage
                      imageUrl={member.profileImage}
                      onChange={(url) => updateTeamMember(index, 'profileImage', url)}
                      className="absolute inset-0 w-full h-full rounded-full"
                      isBackground={true}
                    />
                  </div>
                </div>

                {/* Name and Title - Right Side */}
                <div className='flex-1'>
                  {/* Name */}
                  <h2 className='font-[Raleway] text-[#E54B4B] text-xl lg:text-2xl font-bold mb-2'>
                    <EditableText
                      value={member?.name || ''}
                      onChange={(value) => updateTeamMember(index, 'name', value)}
                      tag="span"
                      className="block"
                      placeholder="Name"
                    />
                  </h2>

                  {/* Title */}
                  <p className='font-[Raleway] text-[#666666] text-sm lg:text-base mb-4'>
                    <EditableText
                      value={member?.title || ''}
                      onChange={(value) => updateTeamMember(index, 'title', value)}
                      tag="span"
                      className="block"
                      placeholder="Title"
                    />
                  </p>
                </div>
              </div>

              {/* Description - Full Width Below */}
              <p className='font-[Raleway] text-[#666666] text-sm lg:text-base leading-relaxed mt-4'>
                <EditableText
                  value={member?.description || ''}
                  onChange={(value) => updateTeamMember(index, 'description', value)}
                  multiline={true}
                  className="block"
                  placeholder="Description"
                />
              </p>

              {/* Remove Button */}
              <button
                onClick={() => removeMember(index)}
                className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm"
              >
                Remove Member
              </button>
            </div>
          ))}

          {/* Add New Member Button */}
          <div className='flex justify-center items-center md:col-span-2 mt-4'>
            <button
              onClick={addNewMember}
              className='bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600'
            >
              + Add New Team Member
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditableAboutTeam;

