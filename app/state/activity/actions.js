// Detect activity actions
export const ACTIVITY_DETECT = 'ACTIVITY_DETECT';
export const ACTIVITY_TIMER_START = 'ACTIVITY_TIMER_START';

// This should be called everytime an activity is made but doesn't trigger an action
export function activityDetect() {
  return {
    type: ACTIVITY_DETECT,
  };
}

export function activityTimerStart() {
  return {
    type: ACTIVITY_TIMER_START,
  };
}
