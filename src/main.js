/**
 * Runs the two-way sync for the specified calendars.
 */
function run() {
  if (!isWithinWorkHours()) {
    console.log('Calendars not synced - current time is outside of the working week')
    return
  }
  
  const primaryCalendar = CalendarApp.getCalendarById(PRIMARY_ID)
  const secondaryCalendar = CalendarApp.getCalendarById(SECONDARY_ID)

  // Sync primary to secondary
  syncCalendars(
    primaryCalendar,
    secondaryCalendar,
    SECONDARY_EVENT_TITLE_OVERRIDE,
    SECONDARY_EVENT_TITLE_PREFIX,
    PRIMARY_EXCLUDE_LIST,
    SECONDARY_EVENT_COLOR_OVERRIDE,
    PRIMARY_INCLUDE_INVITED_EVENTS,
    PRIMARY_INVITED_EVENT_COLOR_OVERRIDE
  )

  // Sync secondary to primary
  syncCalendars(
    secondaryCalendar,
    primaryCalendar,
    PRIMARY_EVENT_TITLE_OVERRIDE,
    PRIMARY_EVENT_TITLE_PREFIX,
    SECONDARY_EXCLUDE_LIST,
    PRIMARY_EVENT_COLOR_OVERRIDE,
    SECONDARY_INCLUDE_INVITED_EVENTS,
    SECONDARY_INVITED_EVENT_COLOR_OVERRIDE
  )
}

/**
 * Deletes all events ever synced between the two calendars, for both calendars.
 */
function deleteAllSyncedEvents() {
  deleteAllSyncedEventsForCalendar(PRIMARY_ID, SECONDARY_ID)
  deleteAllSyncedEventsForCalendar(SECONDARY_ID, PRIMARY_ID)
}