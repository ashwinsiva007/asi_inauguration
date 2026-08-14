import type { EventConfig } from '../types/inauguration';

/**
 * OFFICIAL EVENT CONFIGURATION
 * 
 * You can edit any details below. To replace logos, place your image files in the `public/`
 * directory and update the asset paths below (e.g. '/asi-logo.png').
 */
export const EVENT_CONFIG: EventConfig = {
  organization: 'ANALYTICS SOCIETY OF INDIA',
  subTitle: 'STUDENT CHAPTER',
  institution: 'SRI SHAKTHI INSTITUTE OF ENGINEERING AND TECHNOLOGY',
  chiefGuest: {
    title: 'WELCOME, CHIEF GUEST',
    name: 'Dr. Dinesh Kumar',
    designation: 'Chief Guest & Keynote Dignitary',
  },
  eventDate: '24 AUGUST 2026',
  conceptFlow: ['DATA', 'ANALYTICS', 'INSIGHT', 'IMPACT'],
  logos: {
    // Custom logo path options (Place logo images inside public/ folder):
    // e.g., '/asi-logo.png', '/college-logo.png'
    asiLogoPath: '/assets/asi-logo.svg',
    collegeLogoPath: '/assets/college-logo.svg',
  },
  audio: {
    enabledByDefault: true,
    // Optional custom audio file paths (Web Audio API synthesizes sounds automatically if omitted)
    // touchSoundPath: '/audio/touch.mp3',
    // confirmationSoundPath: '/audio/confirm.mp3',
    // countdownSoundPath: '/audio/countdown.mp3',
    // revealSoundPath: '/audio/reveal.mp3',
  },
};
