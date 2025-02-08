import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaTwitter, FaLinkedinIn, FaTiktok } from 'react-icons/fa';
import { getPost } from '../utils/markdownLoader';

function PostDetail() {
  const { profile: profileName, slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [tableOfContents, setTableOfContents] = useState([]);

  const profiles = {
    marc: {
      id: 1,
      initial: 'M',
      name: 'marc',
      displayName: 'Marc',
      color: '#007bff',
      role: 'Developer',
      image: `${process.env.PUBLIC_URL}/images/profiles/marc.jpg`,
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
      image: `${process.env.PUBLIC_URL}/images/profiles/alba.jpg`,
      socials: {
        tiktok: 'https://www.tiktok.com/@alba_lamas_',
        twitter: 'https://x.com/alba_lamas_',
        linkedin: 'https://www.linkedin.com/in/alba-lamas/'
      }
    }
  };

  const sortedProfiles = [...Object.values(profiles)].sort((a, b) => {
    if (a.name === profileName) return -1;
    if (b.name === profileName) return 1;
    return 0;
  });

  const handleBubbleClick = (profile) => {
    navigate('/', { 
      state: { 
        selectedProfile: profile.name 
      }
    });
  };

  useEffect(() => {
    const loadPost = async () => {
      const postData = await getPost(profileName, slug);
      setPost(postData);
      
      // Generate table of contents from markdown headings
      const headings = postData.content.match(/^##\s.+/gm) || [];
      const toc = headings.map(heading => ({
        id: heading.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        text: heading.replace(/^##\s/, ''),
        level: 2
      }));
      setTableOfContents(toc);
    };

    loadPost();
  }, [profileName, slug]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <>
      <div className="home-top-section">
        <div className="profile-section">
          <div className="profile-group">
            <div className="profile-icons">
              {sortedProfiles.map((profile) => (
                <div
                  key={profile.id}
                  className={`profile-circle ${profileName === profile.name ? 'active' : ''}`}
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
                onClick={() => navigate(`/profile/${profileName}`)}
              >
                About me
              </span>
            </div>
          </div>
        </div>
        <div className="social-icons">
          {profileName === 'marc' ? (
            <>
              <a href={profiles.marc.socials.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin">
                <FaLinkedinIn size={22} />
              </a>
              <a href={profiles.marc.socials.twitter} target="_blank" rel="noopener noreferrer" className="twitter">
                <FaTwitter size={22} />
              </a>
            </>
          ) : (
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
          )}
        </div>
      </div>

      <div className="post-layout">
        <aside className="post-sidebar">
          <nav className="table-of-contents">
            <h3>Table of Contents</h3>
            <ul>
              {tableOfContents.map((item) => (
                <li 
                  key={item.id}
                  className={`toc-item level-${item.level}`}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.text}
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <article className="post-detail">
          <header className="post-header">
            <h1>{post.frontmatter.title || 'Post Title'}</h1>
            <div className="post-meta">
              <span className="post-category">{post.frontmatter.category}</span>
              <span className="post-read-time">{post.frontmatter.readTime}</span>
              <span className="post-date">
                {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </header>
          <div className="post-content">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({node, ...props}) => <h2 id={props.children[0].toLowerCase().replace(/[^a-z0-9]+/g, '-')} {...props} />,
                code: ({node, inline, ...props}) => (
                  inline ? 
                  <code {...props} /> :
                  <pre><code {...props} /></pre>
                )
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </>
  );
}

export default PostDetail; 