/**
 * ## CONFIGURING THE SCRIPT ##
 * 
 * To configure this script, the following constants need to be set for each of your calendars.
 * 
 * # Required constants #
 * PRIMARY_ID                             string                    Your primary GSuite account ID (e.g. 'primary@gmail.com' | 'name@primary.com')
 * SECONDARY_ID                           string                    Your secondary GSuite account ID (e.g. 'secondary@gmail.com' | 'name@secondary.com')
 * 
 * # Optional constants #
 * For each of these constants, an additional 'SECONDARY_*' prefixed constant can be set for the secondary account.
 * 
 * PRIMARY_EVENT_TITLE_OVERRIDE           string                    Overrides an event's title when it appears in the secondary calendar (e.g. 'busy')
 * PRIMARY_EVENT_TITLE_PREFIX             string                    Prefixes an event's title when it appears in the secondary calendar (e.g. 'From Secondary:' would result in 'From Secondary: Original event title')
 * PRIMARY_EVENT_COLOR_OVERRIDE           CalendarApp.EventColor    Overrides an event's colour when it appears in the secondary calendar (e.g. `CalendarApp.EventColor.CYAN`)
 * PRIMARY_INCLUDE_INVITED_EVENTS         boolean                   If true, events in your primary calendar that you have not responded to will also be synced to your secondary calendar
 * PRIMARY_EXCLUDE_LIST                   string[]                  An array of calendar event titles to be ignored
 * PRIMARY_INVITED_EVENT_COLOR_OVERRIDE   CalendarApp.EventColor    Overrides an invited event's colour when it appears in the secondary calendar (e.g. `CalendarApp.EventColor.CYAN`)
 * 
 */

// Primary calendar
const PRIMARY_ID = 'example@primary.com'
const PRIMARY_EVENT_TITLE_OVERRIDE = null
const PRIMARY_EVENT_TITLE_PREFIX = null
const PRIMARY_EVENT_COLOR_OVERRIDE = null
const PRIMARY_INCLUDE_INVITED_EVENTS = true
const PRIMARY_INVITED_EVENT_COLOR_OVERRIDE = CalendarApp.EventColor.GRAY

const PRIMARY_EXCLUDE_LIST = [
  // 'Some calendar event title to  excplude'
]

// Secondary calendar
const SECONDARY_ID = 'example@secondary.com'
const SECONDARY_EVENT_TITLE_OVERRIDE = null
const SECONDARY_EVENT_TITLE_PREFIX = null
const SECONDARY_EVENT_COLOR_OVERRIDE = null
const SECONDARY_INCLUDE_INVITED_EVENTS = true
const SECONDARY_INVITED_EVENT_COLOR_OVERRIDE = CalendarApp.EventColor.GRAY

const SECONDARY_EXCLUDE_LIST = [
  // 'Some calendar event title to  excplude'
]