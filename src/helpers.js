/**
 * Deletes all events that have a given tag value from the given list of events.
 * 
 * @param events  CalendarEvent[]   Events list to search through
 * @param tagKey  string            The tag key to use to filter on events
 * @param value   string            The tag value to use to filter on events
 */
function deleteEventsWithTagValue(events, tagKey, value) {
  events.filter(event => event.getTag(tagKey) === value).forEach(event => event.deleteEvent())
}

/**
 * Deletes all previously-synced events between two calendars.
 * 
 * @param fromCalendarId  string  The ID of the calender from which events were synced
 * @param toCalendarId    stribg  The ID of the calendar to which events were synced
 */
function deleteAllSyncedEventsForCalendar(fromCalendarId, toCalendarId) {
  const calendar = CalendarApp.getCalendarById(toCalendarId)
  const events = getCalendarEvents(calendar)
  deleteEventsWithTagValue(events, `${TAG_KEY_PREFIX}-${fromCalendarId}`, 'true')
}

/**
 * Gets all calender events for a specific date range.
 * 
 * @param calendar  Calendar  The calendar to get events from
 */
function getCalendarEvents(calendar) {
  const today = new Date()
  today.setHours(2) // Ensure sync runs for the entire day, incase we're half-way through an event when the sync runs
  const enddate = new Date()
  enddate.setDate(today.getDate() + DATE_RANGE_IN_DAYS)

  return calendar.getEvents(today, enddate)
}

/**
 * Whether or not the current user is attending a specific event.
 * 
 * @param event CalendarEvent The event with which to check attendance
 */
function isAttending(event) {
  return event.getMyStatus() === CalendarApp.GuestStatus.YES || event.getMyStatus() === CalendarApp.GuestStatus.MAYBE
}

/**
 * Whether or not the event was previously synced _from_ the target calender.
 * If an event exists in calendar A and was previously synced to calendar B, this function returns true for that event
 * in calendar B.
 * 
 * @param event       CalendarEvent   The event to check
 * @param calendarId  string          The ID of the calendar to check against
 */
function isReverseSync(event, calendarId) {
  return event.getTag(`${TAG_KEY_PREFIX}-${calendarId}`) === 'true'
}

/**
 * Whether or not the current time is within defined work hours. Will be used to skip syncing outside of these hours.
 * 
 * NOTE: This functions does not account for changes in time zone (e.g. British Summer Time). However, it's assumed that
 * a +-1hr accuracy for the start and end of the working day is acceptable.
 * 
 * @return boolean
 */
function isWithinWorkHours() {
  const now = new Date()
  const dayOfWeek = now.getDay()
  if (dayOfWeek > 4) {
    return false
  }

  if (now.getHours() < START_OF_DAY || now.getHours() > END_OF_DAY) {
    return false
  }

  return true
}