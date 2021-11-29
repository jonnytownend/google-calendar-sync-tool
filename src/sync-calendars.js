/**
 * Syncs all relevant events from one calendar to another.
 * 
 * @param fromCalendar          Calendar        The calendar to sync events from
 * @param toCalendar            Calendar        The calendar to sybc events to
 * @param placeholderTitle      string | null   If specified, this string will replace the title for all events
 * @param titlePrefix           string | null   If specified, this string will be prefixed to the event title
 * @param exludeList            string[]        A list of event titles to be ignored
 * @param mainColorOverride     string          Color (or value from CalendarApp.EventColor) to override a default event's color
 * @param includeInvites        boolean         Whether to include invited (but not attended) events
 * @param invitedColorOverride  string          Color (or value from CalendarApp.EventColor) to override an invited event's color
 */
function syncCalendars(fromCalendar, toCalendar, placeholderTitle, titlePrefix, excludeList, mainColorOverride, includeInvites, invitedColorOverride) {
  const tagKey = `${TAG_KEY_PREFIX}-${fromCalendar.getId()}`
  const fromCalendarEvents = getCalendarEvents(fromCalendar)
  const toCalendarEvents = getCalendarEvents(toCalendar)

  // First, remove all future events that have already been synced.
  // This allows events that have been deleted in the 'from' calendar to also be deleted in the 'to' calendar.
  deleteEventsWithTagValue(toCalendarEvents, tagKey, 'true')
  
  // Then, sync updated events between calendars.
  fromCalendarEvents.forEach(fromCalendarEvent => {
    if (
      (!includeInvites && !isAttending(fromCalendarEvent)) || // Ensure the event is being attended
      isReverseSync(fromCalendarEvent, toCalendar.getId()) || // Ensure the event was not synced from the other calendar
      excludeList.includes(fromCalendarEvent.getTitle())
    ) {
      return
    }

    const startTime = fromCalendarEvent.getStartTime()
    const endTime = fromCalendarEvent.getEndTime()
    const titlePrefixString = titlePrefix ? `${titlePrefix}: ` : ''
    const title = placeholderTitle ?? `${titlePrefixString}${fromCalendarEvent.getTitle()}`

    var newEvent
    if (fromCalendarEvent.isAllDayEvent()) {
      newEvent = toCalendar.createAllDayEvent(title, startTime)
    } else {
      newEvent = toCalendar.createEvent(title, startTime, endTime)
    }
    newEvent.removeAllReminders()
    newEvent.setTag(tagKey, 'true')
    if (includeInvites && !isAttending(fromCalendarEvent)) {
      // Make the event private to simulate an invited (but not attended) event, and set the color to distinguish from attending events.
      newEvent.setVisibility(CalendarApp.Visibility.PRIVATE)
      newEvent.setColor(invitedColorOverride || CalendarApp.EventColor.GRAY)
    } else if (mainColorOverride) {
      newEvent.setColor(mainColorOverride)
    }
  })
}