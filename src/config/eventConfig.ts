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
    designation: 'Chairperson, Data Centre and Analytics Lab • IIM Bangalore',
    summaryLines: [
      'Chairperson, Data Centre and Analytics Lab',
      'Indian Institute of Management Bangalore',
      'President, Analytics Society of India',
    ],
    photoPath: '/assets/chief-guest.jpg',
  },
  eventDate: '24th Aug 2026',
  conceptFlow: ['DATA', 'ANALYTICS', 'INSIGHT', 'IMPACT'],
  logos: {
    asiLogoPath: '/assets/asi-logo.png',
    collegeLogoPath: '/assets/college-logo.png',
    asiStudentChapterEmblemPath: '/assets/asi-student-chapter-emblem.png',
  },
  audio: {
    enabledByDefault: true,
  },
};
