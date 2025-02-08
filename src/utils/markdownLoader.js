import matter from 'gray-matter';

export async function getPost(profile, slug) {
  try {
    const response = await fetch(`/content/posts/${profile}/${slug}.md`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const markdown = await response.text();
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

export async function getAllPosts(profile) {
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
        const post = await getPost(profile, slug);
        if (post) {
          return {
            slug,
            ...post
          };
        }
        return null;
      })
    );

    // Filter out any null values and sort by date
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