import { Facebook, Twitter, Linkedin, Link2, Mail } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonsProps {
  title: string;
  url?: string;
  description?: string;
}

export function ShareButtons({ title, url, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareText = description || title;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`,
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-600 dark:text-gray-400 reading:text-gray-700 mr-2">
        Dela:
      </span>
      
      {/* Facebook */}
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-slate-700 reading:bg-gray-200 text-gray-700 dark:text-gray-300 reading:text-gray-700 hover:bg-[#1877F2] hover:text-white dark:hover:bg-[#1877F2] transition-colors"
        aria-label="Dela på Facebook"
      >
        <Facebook className="w-5 h-5" />
      </a>

      {/* Twitter/X */}
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-slate-700 reading:bg-gray-200 text-gray-700 dark:text-gray-300 reading:text-gray-700 hover:bg-[#1DA1F2] hover:text-white dark:hover:bg-[#1DA1F2] transition-colors"
        aria-label="Dela på Twitter"
      >
        <Twitter className="w-5 h-5" />
      </a>

      {/* LinkedIn */}
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-slate-700 reading:bg-gray-200 text-gray-700 dark:text-gray-300 reading:text-gray-700 hover:bg-[#0A66C2] hover:text-white dark:hover:bg-[#0A66C2] transition-colors"
        aria-label="Dela på LinkedIn"
      >
        <Linkedin className="w-5 h-5" />
      </a>

      {/* Email */}
      <a
        href={shareLinks.email}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-slate-700 reading:bg-gray-200 text-gray-700 dark:text-gray-300 reading:text-gray-700 hover:bg-[#5A7C50] hover:text-white dark:hover:bg-[#6B8E65] transition-colors"
        aria-label="Dela via e-post"
      >
        <Mail className="w-5 h-5" />
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-slate-700 reading:bg-gray-200 text-gray-700 dark:text-gray-300 reading:text-gray-700 hover:bg-[#5A7C50] hover:text-white dark:hover:bg-[#6B8E65] transition-colors relative"
        aria-label="Kopiera länk"
      >
        <Link2 className="w-5 h-5" />
        {copied && (
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 dark:bg-slate-700 text-white text-xs rounded whitespace-nowrap animate-fadeIn">
            Länk kopierad!
          </span>
        )}
      </button>
    </div>
  );
}
