import type { EventConfig } from '../types/inauguration';

/**
 * OFFICIAL EVENT CONFIGURATION
 * 
 * Uses official Analytics Society of India (ASI) branding assets & 
 * Sri Shakthi Institute of Engineering and Technology (SIET) details.
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
    // Official ASI PNG logo + Real Official SIET College Emblem PNG
    asiLogoPath: '/assets/asi-logo.png',
    collegeLogoPath: '/assets/college-logo.png',
  },
  audio: {
    enabledByDefault: true,
  },
};
