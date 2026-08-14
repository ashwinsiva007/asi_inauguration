export type InaugurationStage = 'READY' | 'CONFIRMATION' | 'COUNTDOWN' | 'INAUGURATED';

export interface EventConfig {
  organization: string;
  subTitle: string;
  institution: string;
  chiefGuest: {
    title: string;
    name: string;
    designation?: string;
    summaryLines?: string[];
    photoPath?: string;
  };
  eventDate: string;
  conceptFlow: string[];
  logos: {
    asiLogoPath: string;
    collegeLogoPath: string;
    asiStudentChapterEmblemPath?: string;
  };
  audio: {
    enabledByDefault: boolean;
    touchSoundPath?: string;
    confirmationSoundPath?: string;
    countdownSoundPath?: string;
    revealSoundPath?: string;
  };
}
