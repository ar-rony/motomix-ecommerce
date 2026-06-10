import Link from 'next/link';
import { blogPosts } from '@/data/posts';

export default function Footer() {
  // Get recent posts for footer (last 2)
  const recentPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);

  return (
    <footer className="bg-black text-white">
      {/* Brand Strip */}
      <div className="border-b border-gray-800 py-4">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
          <span>ALESSI</span>
          <span>evasolo</span>
          <span>FLOS</span>
          <span>HAY</span>
          <span>Joseph</span>
          <span>KLÜBER</span>
          <span>Louis poulsen</span>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: motomix description */}
          <div>
            <h4 className="font-bold text-lg mb-3">MOTOMIX.</h4>
            <p className="text-sm text-gray-400">
              Condimentum adipiscing vel neque dis nam parturient orci at scelerisque neque dis nam parturient.
            </p>
            <div className="mt-4 text-sm text-gray-400 space-y-1">
              <p>451 Wall Street, UK, London</p>
              <p>Phone: (064) 332-1233</p>
              <p>Fax: (064) 453-1357</p>
            </div>
          </div>

          {/* Column 2: RECENT POSTS */}
          <div>
            <h4 className="font-bold text-lg mb-3">RECENT POSTS</h4>
            <ul className="space-y-3 text-sm">
              {recentPosts.map((post) => (
                <li key={post.id}>
                  <Link href={`/blog/${post.slug}`} className="hover:text-amber-400">
                    {post.title}
                  </Link>
                  <span className="block text-gray-500 text-xs">{post.date}</span>
                </li>
              ))}
            </ul>
          </div>



          {/* Column 4: USEFUL LINKS + FOOTER MENU combined? Actually screenshot has two columns: Useful Links and Footer Menu.
              We'll split into two sub-columns or keep as one with two sections. */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <h4 className="font-bold text-lg mb-3">USEFUL LINKS</h4>
              <ul className="space-y-1 text-sm text-gray-400">
                <li><Link href="#">Privacy Policy</Link></li>
                <li><Link href="#">Return to Contents</Link></li>
                <li><Link href="#">Terms & Conditions</Link></li>
                <li><Link href="#">Contact Us</Link></li>
                <li><Link href="#">Latest News</Link></li>
                <li><Link href="#">Our Shipment</Link></li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-4 text-center text-gray-500 text-xs">
       Designed by <Link href="#" className="hover:text-amber-400">Rony</Link>. &copy; MOTOMIX All rights reserved.
      </div>
    </footer>
  );
}