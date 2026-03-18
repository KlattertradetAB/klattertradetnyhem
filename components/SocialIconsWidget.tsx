
import React from 'react';
import { Instagram, Linkedin, MessageCircle, Youtube } from 'lucide-react';

const SocialIconsWidget: React.FC = () => {
  return (
    <div className="relative h-24 mb-12">
      <div id="SocailIcons">
        <button className="icons instaIcon">
          <span className="iconName">Instagram</span>
          <a href="#" className="icon insta" aria-label="Instagram">
            <Instagram className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </a>
        </button>

        <button className="icons linkedin">
          <span className="iconName">LinkedIn</span>
          <a href="#" className="icon link" aria-label="LinkedIn">
            <Linkedin className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </a>
        </button>

        <button className="icons whatsapp">
          <span className="iconName">WhatsApp</span>
          <a href="#" className="icon whats" aria-label="WhatsApp">
            <MessageCircle className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </a>
        </button>

        <button className="icons youtube">
          <span className="iconName">YouTube</span>
          <a href="#" className="icon tube" aria-label="YouTube">
            <Youtube className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </a>
        </button>
      </div>
    </div>
  );
};

export default SocialIconsWidget;
