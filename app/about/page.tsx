import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Vetra',
  description: 'Learn more about Vetra and our mission to create beautiful, minimal blog experiences.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          About Vetra
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Creating beautiful, minimal blog experiences for thoughtful content creators.
        </p>
      </section>

      <div className="prose prose-lg max-w-none dark:prose-invert">
        <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            Vetra was born from a simple belief: that great content deserves great presentation. 
            In a world filled with cluttered designs and overwhelming interfaces, we wanted to 
            create something different—a blog template that puts your words first.
          </p>

          <p>
            Our minimalist approach isn't about having less; it's about having exactly what you need. 
            Every element in Vetra has been carefully considered to enhance readability, improve 
            user experience, and create a space where ideas can breathe.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
            Our Design Philosophy
          </h2>

          <p>
            We believe that good design is invisible. When readers visit your blog, they shouldn't 
            be distracted by fancy animations or complex layouts. Instead, they should feel drawn 
            into your content, able to focus completely on your ideas and insights.
          </p>

          <p>
            Vetra achieves this through:
          </p>

          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Generous white space that gives content room to breathe</li>
            <li>Carefully chosen typography that enhances readability</li>
            <li>A cohesive color system that creates visual harmony</li>
            <li>Thoughtful categorization that helps readers discover related content</li>
            <li>Responsive design that works beautifully on any device</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
            Built for Creators
          </h2>

          <p>
            Whether you're sharing design insights, technology trends, lifestyle tips, cultural 
            observations, or big ideas, Vetra provides the perfect foundation for your content. 
            The template is built with modern web technologies and follows best practices for 
            performance, accessibility, and SEO.
          </p>

          <p>
            We're constantly improving Vetra based on feedback from creators like you. If you 
            have suggestions or encounter any issues, we'd love to hear from you.
          </p>
        </div>
      </div>
    </div>
  );
}