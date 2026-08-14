export type InaugurationStage = 'READY' | 'CONFIRMATION' | 'COUNTDOWN' | 'INAUGURATED';

export interface EventConfig {
  organization: string;
  subTitle: string;
  institution: string;
  chiefGuest: {
    title: string;
    name: string;
    designation?: string;
  };
  eventDate: string;
  conceptFlow: string[];
  logos: {
    asiLogoPath: string;
    collegeLogoPath: string;
  };
  audio: {
    enabledByDefault: boolean;
    touchSoundPath?: string;
    confirmationSoundPath?: string;
    countdownSoundPath?: string;
    revealSoundPath?: string;
  };
}
