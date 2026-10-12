'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faTiktok,
  faFacebook,
  faXTwitter,
  faYoutube,
  faLinkedin,
  faReddit,
  faWhatsapp,
  faTelegram,
  faPinterest,
  faSnapchat,
  faTumblr,
  faThreads
} from '@fortawesome/free-brands-svg-icons';


const SubstackIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 511.471"
    className={className}
  >
    <path
      fill="currentColor"
      d="M0 0h448v62.804H0V0zm0 229.083h448v282.388L223.954 385.808 0 511.471V229.083zm0-114.542h448v62.804H0v-62.804z"
    />
  </svg>
);

// URL normallaşdırma helper-i
function normalizeUrl(raw: string): string {
  const url = (raw || '').trim();
  if (/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(url)) return url;
  if (/^(mailto:|tel:|sms:|tg:|viber:|whatsapp:)/i.test(url)) return url;
  if (/^[a-z][a-z0-9+.-]*:/i.test(url)) return url;
  return 'https://' + url.replace(/^\/+/, '');
}

const SocialIcons: Record<string, any> = {
  Instagram: faInstagram,
  TikTok: faTiktok,
  Facebook: faFacebook,
  X: faXTwitter,
  YouTube: faYoutube,
  Substack: SubstackIcon,
  LinkedIn: faLinkedin,
  Reddit: faReddit,
  WhatsAppBusiness: faWhatsapp,
  Telegram: faTelegram,
  Pinterest: faPinterest,
  Snapchat: faSnapchat,
  Tumblr: faTumblr,
  Threads: faThreads
};

const BrandStyles: Record<
  string,
  { className: string; hover: string; style?: React.CSSProperties }
> = {
  Instagram: {
    className: 'bg-white text-[#E1306C] border border-[#E1306C]/30',
    hover: 'hover:bg-[#E1306C] hover:text-white hover:border-transparent'
  },
  TikTok: { className: 'bg-neutral-900 text-white', hover: 'hover:bg-neutral-800' },
  Facebook: { className: 'bg-[#1877F2] text-white', hover: 'hover:bg-[#166FE5]' },
  X: { className: 'bg-black text-white', hover: 'hover:bg-[#1a1a1a]' },
  YouTube: { className: 'bg-[#FF0000] text-white', hover: 'hover:bg-[#E00000]' },
  Substack: {
    className: 'bg-white text-[#FF681A] border border-[#FF681A]/30',
    hover: 'hover:bg-[#FF681A] hover:text-white hover:border-transparent'
  },
  LinkedIn: { className: 'bg-[#0A66C2] text-white', hover: 'hover:bg-[#095aab]' },
  Reddit: { className: 'bg-[#FF4500] text-white', hover: 'hover:bg-[#e03e00]' },
  WhatsAppBusiness: { className: 'bg-[#25D366] text-white', hover: 'hover:bg-[#20b759]' },
  Telegram: { className: 'bg-[#229ED9] text-white', hover: 'hover:bg-[#1f8fca]' },
  Pinterest: { className: 'bg-[#E60023] text-white', hover: 'hover:bg-[#cc001f]' },
  Snapchat: { className: 'bg-[#FFFC00] text-black', hover: 'hover:bg-[#f0ea00]' },
  Tumblr: { className: 'bg-[#35465C] text-white', hover: 'hover:bg-[#2f3e52]' },
  Threads: { className: 'bg-black text-white', hover: 'hover:bg-zinc-900' }
};

interface SocialItem {
  key: string;
  value: string;
}

interface SocialLinksProps {
  data: SocialItem[];
}

const SocialLinks: React.FC<SocialLinksProps> = ({ data }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {data.map(({ key, value }) => {
        const Icon = SocialIcons[key];
        const brand = BrandStyles[key];
        if (!value || !Icon || !brand) return null;

        const href = normalizeUrl(value);

        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              'flex items-center justify-center rounded-full shadow-sm transition-all duration-200 w-10 h-10',
              'focus:outline-none focus:ring-2 focus:ring-offset-2',
              brand.className,
              brand.hover
            ].join(' ')}
            style={brand.style}
            aria-label={key}
            title={key}
          >
            {typeof Icon === 'function' ? (
              <Icon className="w-4 h-4" />
            ) : (
              <FontAwesomeIcon icon={Icon} className="text-[16px]" />
            )}
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
