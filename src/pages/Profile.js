import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { FaTwitter, FaLinkedinIn, FaTiktok, FaArrowLeft } from 'react-icons/fa';

function Profile() {
  const { name: profileName } = useParams();
  const navigate = useNavigate();
  const [profileContent, setProfileContent] = useState('');
  const profiles = {
    marc: {
      name: 'Marc',
      role: 'Senior Developer',
      image: `${process.env.PUBLIC_URL}/images/profiles/marc.jpg`,
      socials: {
        linkedin: 'https://www.linkedin.com/in/marc-ribalta-gene/',
        twitter: 'https://x.com/MarcRibalta_'
      }
    },
    alba: {
      name: 'Alba',
      role: 'UI/UX Designer',
      image: `${process.env.PUBLIC_URL}/images/profiles/alba.jpg`,
      socials: {
        tiktok: 'https://www.tiktok.com/@alba_lamas_',
        twitter: 'https://x.com/alba_lamas_',
        linkedin: 'https://www.linkedin.com/in/alba-lamas/'
      }
    }
  };

  const profile = profiles[profileName];

  useEffect(() => {
    const loadProfileContent = async () => {
      try {
        // Try JSON first
        try {
          const response = await fetch(`${process.env.PUBLIC_URL}/content/profiles/${profileName}.json`);
          if (response.ok) {
            const data = await response.json();
            setProfileContent(data.content);
            return;
          }
        } catch (e) {
          console.log('JSON not found, trying markdown...');
        }

        // Fallback to markdown
        const response = await import(`../content/profiles/${profileName}.md`);
        const markdown = response.default;
        const content = markdown.split('---')[2];
        setProfileContent(content);
      } catch (error) {
        console.error('Error loading profile content:', error);
      }
    };

    loadProfileContent();
  }, [profileName]);

  const handleImageClick = () => {
    navigate('/', { 
      state: { 
        selectedProfile: profileName 
      }
    });
  };

  if (!profile) {
    return <div className="profile-not-found">Profile not found</div>;
  }

  return (
    <div className="profile-page">
      <div className="back-button" onClick={() => navigate('/', { state: { selectedProfile: profileName } })}>
        <FaArrowLeft size={20} />
        <span>Back to articles</span>
      </div>
      <div className="profile-header">
        <img 
          src={profile.image} 
          alt={profile.name} 
          className="profile-image"
          onClick={handleImageClick}
          style={{ cursor: 'pointer' }}
        />
        <h1>{profile.name}</h1>
        <p className="profile-role">{profile.role}</p>
        <div className="profile-socials">
          {profileName === 'marc' ? (
            <>
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin">
                <FaLinkedinIn size={22} />
              </a>
              <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer" className="twitter">
                <FaTwitter size={22} />
              </a>
            </>
          ) : (
            <>
              <a href={profile.socials.tiktok} target="_blank" rel="noopener noreferrer" className="tiktok">
                <FaTiktok size={22} />
              </a>
              <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer" className="twitter">
                <FaTwitter size={22} />
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin">
                <FaLinkedinIn size={22} />
              </a>
            </>
          )}
        </div>
      </div>
      <div className="profile-content">
        <section className="profile-bio">
          <h2>About</h2>
          <ReactMarkdown>
            {profileContent}
          </ReactMarkdown>
        </section>
      </div>
    </div>
  );
}

export default Profile; 