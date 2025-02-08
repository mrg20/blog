import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaTwitter, FaLinkedinIn, FaTiktok } from 'react-icons/fa';
import { getAllPosts } from '../utils/markdownLoader';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeProfile, setActiveProfile] = useState(
    location.state?.selectedProfile || null
  );
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (activeProfile) {
      const loadPosts = async () => {
        const profilePosts = await getAllPosts(activeProfile);
        setPosts(profilePosts);
      };
      loadPosts();
    }
  }, [activeProfile]);

  useEffect(() => {
    if (location.state?.selectedProfile) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const profiles = {
    marc: {
      id: 1,
      initial: 'M',
      name: 'marc',
      displayName: 'Marc',
      color: '#007bff',
      role: 'Developer',
      image: '/images/profiles/marc.jpg',
      categories: ['Programming', 'React', 'JavaScript'],
      socials: {
        linkedin: 'https://www.linkedin.com/in/marc-ribalta-gene/',
        twitter: 'https://x.com/MarcRibalta_'
      }
    },
    alba: {
      id: 2,
      initial: 'A',
      name: 'alba',
      displayName: 'Alba',
      color: '#ff4757',
      role: 'Designer',
      image: '/images/profiles/alba.jpg',
      categories: ['Design', 'UI/UX', 'CSS'],
      socials: {
        tiktok: 'https://www.tiktok.com/@alba_lamas_',
        twitter: 'https://x.com/alba_lamas_',
        linkedin: 'https://www.linkedin.com/in/alba-lamas/'
      }
    }
  };

  const handleBubbleClick = (profile) => {
    setActiveProfile(profile.name);
  };

  const sortedProfiles = [...Object.values(profiles)].sort((a, b) => {
    if (a.name === activeProfile) return -1;
    if (b.name === activeProfile) return 1;
    return 0;
  });

  return (
    <div className="home-container">
      <div className="home-top-section">
        {activeProfile && (
          <div className="profile-section">
            <div className="profile-group">
              <div className="profile-icons">
                {sortedProfiles.map((profile) => (
                  <div
                    key={profile.id}
                    className={`profile-circle ${activeProfile === profile.name ? 'active' : ''}`}
                    onClick={() => handleBubbleClick(profile)}
                  >
                    <img 
                      src={profile.image} 
                      alt={profile.name} 
                      className="profile-image"
                    />
                  </div>
                ))}
              </div>
              <div className="about-links">
                <span
                  className="about-link"
                  onClick={() => navigate(`/profile/${activeProfile}`)}
                >
                  About me
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="social-icons">
          {activeProfile === 'marc' ? (
            <>
              <a href={profiles.marc.socials.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin">
                <FaLinkedinIn size={22} />
              </a>
              <a href={profiles.marc.socials.twitter} target="_blank" rel="noopener noreferrer" className="twitter">
                <FaTwitter size={22} />
              </a>
            </>
          ) : activeProfile === 'alba' ? (
            <>
              <a href={profiles.alba.socials.tiktok} target="_blank" rel="noopener noreferrer" className="tiktok">
                <FaTiktok size={22} />
              </a>
              <a href={profiles.alba.socials.twitter} target="_blank" rel="noopener noreferrer" className="twitter">
                <FaTwitter size={22} />
              </a>
              <a href={profiles.alba.socials.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin">
                <FaLinkedinIn size={22} />
              </a>
            </>
          ) : null}
        </div>
      </div>

      {!activeProfile ? (
        <div className="welcome-section">
          <h1>Welcome to Our Blog</h1>
          <p>Select a profile to explore their articles and thoughts.</p>
          <div className="profile-descriptions">
            <div 
              className="profile-intro"
              onClick={() => handleBubbleClick(profiles.marc)}
            >
              <div className="profile-intro-header">
                <div className="profile-circle">
                  <img 
                    src={profiles.marc.image} 
                    alt={profiles.marc.name} 
                    className="profile-image"
                  />
                </div>
                <h2>{profiles.marc.displayName}</h2>
              </div>
              <p>Senior Developer sharing insights about web development and modern technologies.</p>
            </div>
            <div 
              className="profile-intro"
              onClick={() => handleBubbleClick(profiles.alba)}
            >
              <div className="profile-intro-header">
                <div className="profile-circle">
                  <img 
                    src={profiles.alba.image} 
                    alt={profiles.alba.name} 
                    className="profile-image"
                  />
                </div>
                <h2>{profiles.alba.displayName}</h2>
              </div>
              <p>UI/UX Designer exploring the intersection of design, user experience, and creativity.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="featured-posts">
          {posts.map(post => (
            <article 
              key={post.slug} 
              className="post-preview"
              onClick={() => navigate(`/post/${activeProfile}/${post.slug}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="post-preview-image">
                <img src={post.frontmatter.coverImage} alt={post.frontmatter.title} />
              </div>
              <div className="post-preview-content">
                <h2>{post.frontmatter.title}</h2>
                <p>{post.frontmatter.excerpt}</p>
                <div className="post-footer">
                  <span className="post-date">
                    {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;