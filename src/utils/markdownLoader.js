import matter from 'gray-matter';

export async function getPost(profile, slug) {
  try {
    const response = await import(`../content/posts/${profile}/${slug}.md`);
    if (!response.default) {
      throw new Error(`Failed to load post`);
    }
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
          const response = await import(`../content/posts/${profile}/${slug}.md`);
          if (!response.default) {
            throw new Error(`Failed to load post ${slug}`);
          }
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