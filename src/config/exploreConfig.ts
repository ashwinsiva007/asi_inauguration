/**
 * CONFIGURATION FOR "EXPLORE ASI" DEMO/CINEMATIC MODE
 * 
 * You can easily edit any text, description, dates, lists, or asset paths here.
 * Organizers/Principal/SPOC can update these approved descriptions directly.
 */
export interface ExploreSceneConfig {
  id: number;
  durationMs: number; // Duration of this scene in the fallback slideshow
  title: string;
  subtitle?: string;
  description?: string;
  list?: string[];
}

export interface ExploreConfig {
  video: {
    path: string; // Location of the MP4 video (/public/videos/asi-experience.mp4)
    fallbackBgSoundtrack?: string; // Optional background soundtrack path
    volume: number; // Default volume (0.0 to 1.0)
  };
  scenes: {
    scene1Opening: {
      title: string;
      subtitle: string;
    };
    scene2WhatIsASI: {
      title: string;
      description: string;
    };
    scene3Vision: {
      title: string;
      steps: string[];
      description: string;
    };
    scene4IIMB: {
      title: string;
      description: string; // Verified relationship description with IIM Bangalore
    };
    scene5DCALL: {
      title: string;
      subtitle: string;
      description: string; // Configurable DCALL lab details
    };
    scene6StudentChapter: {
      title: string;
      institution: string;
      pillars: string[];
    };
    scene7Expectations: {
      title: string;
      activities: {
        title: string;
        desc: string;
      }[];
    };
    scene8JourneyBegins: {
      title: string;
      steps: string[];
      tagline: string;
      date: string;
      institution: string;
    };
    scene9Loop: {
      title: string;
      subtitle: string;
    };
  };
}

export const EXPLORE_CONFIG: ExploreConfig = {
  video: {
    path: '/videos/asi-experience.mp4',
    fallbackBgSoundtrack: '/assets/audio/explore-ambient.mp3', // Optional high-quality background audio
    volume: 0.3,
  },
  scenes: {
    scene1Opening: {
      title: 'ANALYTICS SOCIETY OF INDIA',
      subtitle: 'EMPOWERING THE NEXT GENERATION OF DATA-DRIVEN THINKERS',
    },
    scene2WhatIsASI: {
      title: 'WHAT IS ASI?',
      description: 'A professional society dedicated to advancing the understanding, application, and practice of analytics and data-driven decision making across industries and academia.',
    },
    scene3Vision: {
      title: "ASI'S VISION",
      steps: ['DATA', 'KNOWLEDGE', 'INSIGHT', 'IMPACT'],
      description: 'Building a culture of analytical thinking and enabling institutions to unlock the true potential of data.',
    },
    scene4IIMB: {
      title: 'IIM BANGALORE AFFILIATION',
      description: 'The Analytics Society of India (ASI) was established under the mentorship and support of the Data Centre and Analytics Lab (DCAL) at the Indian Institute of Management Bangalore (IIMB).',
    },
    scene5DCALL: {
      title: 'DCAL LAB',
      subtitle: 'DATA · COMPUTING · ANALYTICS · LEARNING',
      description: 'An initiative at IIM Bangalore that serves as a platform for research, training, and consulting in data-driven analytics and computing sciences.',
    },
    scene6StudentChapter: {
      title: 'ASI STUDENT CHAPTER',
      institution: 'SRI SHAKTHI INSTITUTE OF ENGINEERING AND TECHNOLOGY',
      pillars: ['LEARNING', 'COLLABORATION', 'EXPERIMENTATION', 'LEADERSHIP'],
    },
    scene7Expectations: {
      title: 'WHAT STUDENTS CAN EXPECT',
      activities: [
        { title: 'MASTER CLASSES', desc: 'Expert sessions on cutting-edge data technologies' },
        { title: 'WORKSHOPS', desc: 'Hands-on training in predictive modeling and analytics tools' },
        { title: 'INDUSTRY INTERACTION', desc: 'Direct connect with leaders from top analytics firms' },
        { title: 'ANALYTICS PROJECTS', desc: 'Real-world problem solving and case competitions' },
        { title: 'KNOWLEDGE SHARING', desc: 'A vibrant community of peers sharing research and tools' },
      ],
    },
    scene8JourneyBegins: {
      title: 'THE JOURNEY BEGINS',
      steps: ['FROM DATA', 'TO INSIGHT', 'TO IMPACT'],
      tagline: 'THE ASI STUDENT CHAPTER BEGINS A NEW JOURNEY',
      date: '24th Aug 2026',
      institution: 'SRI SHAKTHI INSTITUTE OF ENGINEERING AND TECHNOLOGY',
    },
    scene9Loop: {
      title: 'ANALYTICS SOCIETY OF INDIA',
      subtitle: 'ASI STUDENT CHAPTER',
    },
  },
};
