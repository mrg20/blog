import matter from 'gray-matter';

export async function getPost(profile, slug) {
  try {
    const response = await fetch(`${process.env.PUBLIC_URL}/content/posts/${profile}/${slug}.md`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const markdown = await response.text();
    const { data: frontmatter, content } = matter(markdown);
    
    return {
      frontmatter: {
        ...frontmatter,
        coverImage: `${frontmatter.coverImage}`
      },
      content
    };
  } catch (error) {
    console.error('Error loading post:', error);
    return null;
  }
}

export const getAllPosts = async (profile) => {
  // Define all available posts for each profile
  const posts = {
    marc: [
      'understanding-modern-javascript',
      'building-scalable-react-apps'
    ],
    alba: [
      'love-of-love',
      'mastering-ui-design',
      'advanced-css-techniques'
    ]
  };

  try {
    const postData = await Promise.all(
      (posts[profile] || []).map(async (slug) => {
        try {
          const response = await fetch(`${process.env.PUBLIC_URL}/content/posts/${profile}/${slug}.md`);
          if (!response.ok) {
            console.error(`Failed to load post ${slug}: ${response.status}`);
            return null;
          }
          const markdown = await response.text();
          const { data: frontmatter, content } = matter(markdown);
          
          return {
            slug,
            frontmatter: {
              ...frontmatter,
              coverImage: `${frontmatter.coverImage}`
            },
            content
          };
        } catch (error) {
          console.error(`Error loading post ${slug}:`, error);
          return null;
        }
      })
    );

    return postData
      .filter(post => post !== null)
      .sort((a, b) => 
        new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
      );
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
} 