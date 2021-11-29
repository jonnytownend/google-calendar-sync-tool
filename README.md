# google-calendar-sync-tool
A Google Apps Script tool to sync two calendars from different GSuite accounts.

This tool can be used to two-way sync two Google calendars so that events in one calendar appear in the other. Some key benefits to syncing calendars in this way:
- See all events in one place, in one calendar
- People who only have access to one calendar can see your full availability
- Automatically block out events from one calendar in the other as 'busy'

## Getting started
Using this tool requires access to the two Google accounts to be synced, and access to Google Drive on one of the accounts (the 'primary' account). Code in this repo will be copied into a [Google Apps Script](https://developers.google.com/apps-script) hosted in your primary account's Google Drive, where the script can be manually run, or configured to run at regular intervals.

1. Ensure that your primary account has access to your secondary account's calendar by sharing the calendar with the primary (instructions [here](https://support.google.com/calendar/answer/37082?hl=en)).
2. In your secondary account's Drive, create a new Apps Script ('+New' -> 'More' -> 'Google Apps Script'). You can name it whatever you like, and save it anywhere within your Drive's file system.
3. Delete the default `Code.gs` file.
4. For each file in this repo's `src` directory, create an equivalently-named 'script' file in your new Apps Script and copy-paste the code for that file.
5. Navigate to the new `Configure.gs` file in your Apps Script, and set each of the config constants accordingly (there is a description of each of these constants within the file itself)
6. Navigate to `main.gs`, ensure the `run` function is selected in the top menu bar, and press the 'Run' button.
7. An execution log should appear at the bottom of the screen to show that the script is now running. You may be asked to grant permissions the first time you run the script. For busy people, the sync might take a couple of minutes to complete!

## Configuring the script to run at regular intervals
1. With the Apps Script open, navigate to the 'Triggers' tab on the left.
2. Click '+ Add Trigger' -> choose the `run` function -> choose a suitable time period (every half-hour is a suggestion).
3. Your script should now run once every specified interval.

## Things to note
- By default, the tool will only sync calendar events in the following 14 days from the time that the script runs (for optimisation purposes). The tool will also only run within the working week between 7am and 7pm local time. These restrictions can be changed by updating constants in `global-constants.gs`.
- This tool has not yet been thoroughly tested on different types of calendars - use at your own risk!
