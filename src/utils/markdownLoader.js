import matter from 'gray-matter';

export async function getPost(profile, slug) {
  try {
    // Try JSON first (production build)
    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/content/posts/${profile}/${slug}.json`);
      if (response.ok) {
        const data = await response.json();
        return {
          frontmatter: data.frontmatter,
          content: data.content
        };
      }
    } catch (e) {
      console.log('JSON not found, trying markdown...');
    }

    // Fallback to markdown (development)
    const response = await import(`../content/posts/${profile}/${slug}.md`);
    const markdown = response.default;
    const { data: frontmatter, content } = matter(markdown);
    
    return {
      frontmatter,
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
          // Try JSON first (production build)
          try {
            const response = await fetch(`${process.env.PUBLIC_URL}/content/posts/${profile}/${slug}.json`);
            if (response.ok) {
              const data = await response.json();
              return {
                slug,
                frontmatter: data.frontmatter,
                content: data.content
              };
            }
          } catch (e) {
            console.log('JSON not found, trying markdown...');
          }

          // Fallback to markdown (development)
          const response = await import(`../content/posts/${profile}/${slug}.md`);
          const markdown = response.default;
          const { data: frontmatter, content } = matter(markdown);
          
          return {
            slug,
            frontmatter,
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