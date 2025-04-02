import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEO({ 
  title, 
  description, 
  keywords = 'kids games,online games,free games,educational games,puzzle games,action games,arcade games,racing games,sports games,adventure games',
  image = 'https://ogame.guru/og-image.svg',
  url = 'https://ogame.guru',
  type = 'website'
}: SEOProps) {
  const fullTitle = `${title} | OGame.Guru - Free Online Games for Kids`;
  const fullDescription = `${description} - Free online games for children aged 3-10, no download required!`;

  return (
    <Helmet>
      {/* Basic tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="OGame.Guru" />
      
      {/* Twitter card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={image} />
      
      {/* Other important tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="OGame.Guru" />
      
      {/* Other SEO tags */}
      <meta name="theme-color" content="#764ABC" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Canonical link */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
} 