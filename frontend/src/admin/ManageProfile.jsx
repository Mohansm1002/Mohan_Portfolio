import { useEffect, useState } from 'react';
import { getProfile, updateAdminProfile } from '../api/portfolioApi.js';
import { defaultProfile } from '../portfolio/defaultData.js';

const profileFields = [
  ['heroIntro', 'Hero Intro', 'input'],
  ['name', 'Name', 'input'],
  ['role', 'Role', 'input'],
  ['heroCopy', 'Hero Copy', 'textarea'],
  ['aboutHeading', 'About Heading', 'input'],
  ['aboutParagraphOne', 'About Paragraph 1', 'textarea'],
  ['aboutParagraphTwo', 'About Paragraph 2', 'textarea'],
  ['resumeLink', 'Resume / Button Link', 'input'],
  ['email', 'Email', 'input'],
  ['phone', 'Phone', 'input'],
  ['facebookUrl', 'Facebook URL', 'input'],
  ['githubUrl', 'GitHub URL', 'input'],
  ['linkedinUrl', 'LinkedIn URL', 'input'],
  ['instagramUrl', 'Instagram URL', 'input'],
];

const ManageProfile = () => {
  const [profile, setProfile] = useState(defaultProfile);
  const [status, setStatus] = useState('Loading profile...');

  useEffect(() => {
    let isMounted = true;

    getProfile()
      .then((data) => {
        if (isMounted) {
          setProfile({ ...defaultProfile, ...data });
          setStatus('');
        }
      })
      .catch(() => {
        if (isMounted) {
          setStatus('Unable to load profile. Editing fallback values.');
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('Saving profile...');

    try {
      const saved = await updateAdminProfile(profile);
      setProfile({ ...defaultProfile, ...saved });
      setStatus('Profile updated successfully.');
    } catch (error) {
      console.error(error);
      setStatus('Unable to save profile.');
    }
  };

  return (
    <section className="admin-panel">
      <div className="admin-panel-header">
        <div>
          <p className="admin-eyebrow">Profile</p>
          <h1>Manage Profile</h1>
        </div>
      </div>
      {status && <p className="admin-status">{status}</p>}

      <form className="admin-form admin-wide-form" onSubmit={handleSubmit}>
        {profileFields.map(([name, label, type]) => (
          <label key={name}>
            {label}
            {type === 'textarea' ? (
              <textarea name={name} value={profile[name] || ''} onChange={handleChange} />
            ) : (
              <input name={name} value={profile[name] || ''} onChange={handleChange} />
            )}
          </label>
        ))}
        <div className="admin-form-actions">
          <button className="admin-primary-button" type="submit">Save Profile</button>
        </div>
      </form>
    </section>
  );
};

export default ManageProfile;
