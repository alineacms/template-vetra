import { getPostsByAuthor, getAllAuthors } from '@/lib/posts';
import { PostCard } from '@/components/post-card';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';

interface AuthorPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const posts = getPostsByAuthor(params.slug);
  
  if (posts.length === 0) {
    return {
      title: 'Author Not Found - Vetra',
    };
  }

  const author = posts[0].author;

  return {
    title: `${author.name} - Vetra`,
    description: `Read all posts by ${author.name} on Vetra.`,
  };
}

export async function generateStaticParams() {
  const authors = getAllAuthors();
  return authors.map((author) => ({
    slug: author.slug,
  }));
}

export default function AuthorPage({ params }: AuthorPageProps) {
  const posts = getPostsByAuthor(params.slug);
  
  if (posts.length === 0) {
    notFound();
  }

  const author = posts[0].author;

  // Author bio data - in a real app this would come from a database or CMS
  const getAuthorBio = (name: string) => {
    const bios: { [key: string]: string } = {
      'sarah-chen': 'Sarah is a UX designer and writer passionate about creating meaningful digital experiences. She believes in the power of thoughtful design to solve complex problems and improve people\'s lives.',
      'alex-rivera': 'Alex is a design systems architect with over 8 years of experience building scalable design solutions. He loves exploring the intersection of design and technology.',
      'marcus-johnson': 'Marcus is a technology strategist and futurist who writes about emerging trends and their impact on society. He has a background in software engineering and product management.',
      'emma-thompson': 'Emma is a mindfulness coach and lifestyle writer who helps people find balance in our digital age. She combines ancient wisdom with modern insights.',
      'david-park': 'David is a cultural anthropologist and digital sociologist studying how technology shapes human behavior and social structures.'
    };
    return bios[params.slug] || 'A passionate writer and contributor to Vetra, sharing insights and perspectives on various topics.';
  };

  return (
    <div className="space-y-8">
      <section className="text-center space-y-6">
        <Image
          src={author.avatar}
          alt={author.name}
          width={120}
          height={120}
          className="w-30 h-30 rounded-full object-cover mx-auto flex-shrink-0"
        />
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            {author.name}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mt-4">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} published
          </p>
          <div className="max-w-2xl mx-auto mt-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {getAuthorBio(params.slug)}
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}