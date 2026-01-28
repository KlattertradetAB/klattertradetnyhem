import React from 'react';

export const SwedenFlag: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 320" {...props}>
    <path fill="#006aa7" d="M0 0h512v320H0z"/>
    <path fill="#fecc00" d="M0 128h512v64H0z"/>
    <path fill="#fecc00" d="M160 0h64v320h-64z"/>
  </svg>
);

export const UKFlag: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" {...props}>
    <clipPath id="a"><path d="M0 0v30h60V0z"/></clipPath>
    <clipPath id="b"><path d="M30 15h30v15H30zm-30 0h30v15H0zm30-15h30v15H30zM0 0h30v15H0z"/></clipPath>
    <g clipPath="url(#a)">
      <path d="M0 0v30h60V0z" fill="#012169"/>
      <path d="M0 0L60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/>
      <path d="M0 0L60 30m0-30L0 30" clipPath="url(#b)" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
    </g>
  </svg>
);

export const ArabLeagueFlag: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 1" {...props}>
      <title>Flag of the Arab League</title>
      <path fill="#00732f" d="M0 0h2v1H0z"/>
      <g fill="#fff" transform="translate(1 .5)">
        <g id="e">
          <g id="d">
            <g id="c">
              <path id="b" d="M-.156.035a.16.16 0 0 0 .156-.16.16.16 0 0 0 .157.16z"/>
              <use href="#b" transform="scale(1 -1)"/>
            </g>
            <use href="#c" transform="rotate(45)"/>
            <use href="#c" transform="rotate(90)"/>
            <use href="#c" transform="rotate(135)"/>
          </g>
          <use href="#d" transform="rotate(180)"/>
        </g>
        <path id="a" fill="#00732f" d="M-.057 0a.057.057 0 0 0 .114 0z" transform="scale(.95)"/>
        <use href="#a" transform="scale(-1)"/>
        <g stroke="#00732f" strokeWidth=".02">
          <path d="M0-.212v.424m-.184-.3l.368.17M-.184.113L0 .212l.184-.1" fill="none"/>
          <path id="f" d="M0-.23a.23.23 0 0 0 0 .46.23.23 0 0 0 0-.46z" fill="none"/>
          <use href="#f" transform="scale(.63)"/>
        </g>
      </g>
    </svg>
);

export const FinlandFlag: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 11" {...props}>
        <rect width="18" height="11" fill="#fff"/>
        <rect width="18" height="3" y="4" fill="#003580"/>
        <rect width="3" height="11" x="5" fill="#003580"/>
    </svg>
);

export const SpainFlag: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500" {...props}>
        <rect width="750" height="500" fill="#C60B1E"/>
        <rect width="750" height="250" y="125" fill="#FFC400"/>
    </svg>
);

export const GermanyFlag: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" {...props}>
        <rect width="5" height="3" fill="#000"/>
        <rect width="5" height="2" y="1" fill="#D00"/>
        <rect width="5" height="1" y="2" fill="#FFCE00"/>
    </svg>
);

export const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
);
