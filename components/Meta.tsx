
import React, { useEffect } from 'react';
import { Page } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface MetaProps {
  currentPage: Page;
}

const Meta: React.FC<MetaProps> = ({ currentPage }) => {
  const { t } = useLanguage();

  useEffect(() => {
    // 1. Update Document Title
    let title = t.meta_default_title;
    if (currentPage === Page.GEMENSKAP_APP) {
      title = t.meta_community_title;
    } else {
      const pageTitle = currentPage.charAt(0) + currentPage.slice(1).toLowerCase().replace('_', ' ');
      title = `${pageTitle} | Horizonten`;
    }
    document.title = title;

    // 2. Update Meta Description
    let description = t.meta_default_desc;
    
    // Custom descriptions for key pages
    switch (currentPage) {
      case Page.THERAPY:
        description = t.meta_therapy_desc;
        break;
      case Page.CHAT:
        description = t.meta_mit_desc;
        break;
      case Page.COMMUNITY:
        description = t.meta_community_desc;
        break;
      case Page.BEHANDLINGS_PEDAGOG:
        description = t.meta_pedagog_desc;
        break;
    }

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    // 3. Update Open Graph tags
    const updateOG = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (el) {
        el.setAttribute('content', content);
      } else {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        el.setAttribute('content', content);
        document.head.appendChild(el);
      }
    };

    updateOG('og:title', title);
    updateOG('og:description', description);
    updateOG('og:type', 'website');
    updateOG('og:url', window.location.href);

  }, [currentPage, t]);

  return null; // This component handles side-effects only
};

export default Meta;
