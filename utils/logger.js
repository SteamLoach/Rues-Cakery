/* eslint-disable */
import { ENABLE_LOGGER } from "@/constants/app-variables";

const getGroupTitleStyle =(backgroundColor, color) => {
  return `background-color: ${backgroundColor}; color: ${color}`
}

export const logger = ({
  title = 'GENERIC',
  time = true,
  mute= false,
  backgroundColor = 'none',
  color = '#000',
}) => {

  const showLogs = ENABLE_LOGGER && !mute;

  const logger = {

    groupTitle: null,
    groupTimestamp: null,

    group: function(groupTitle) {
      if(showLogs) {
        this.groupTitle = groupTitle;
        console.group('%c %s', getGroupTitleStyle(backgroundColor, color), ` ${title.toUpperCase()} | ${groupTitle} `);
        if(time) {
          this.groupTimestamp = new Date().getTime();
          console.time(`[${this.groupTimestamp}] ${this.groupTitle} completed in`)
        }
      }
    },

    groupEnd: function() {
      if(showLogs) {
        console.groupEnd();
        if(time) {
          console.timeEnd(`[${this.groupTimestamp}] ${this.groupTitle} completed in`)
        }
      }
    },

    break: function() {
      if(showLogs) {
        console.log('----------')
      }
    },

    line: function(str) {
      if(showLogs) {
        console.log(str);
      }
    },

    await: function(str) {
      if(showLogs) {
        console.log(`⌛ ${str}`);
      }
    },

    complete: function(str) {
      if(showLogs) {
        console.log(`✔️ ${str}`);
      }
    },

    failed: function(str) {
      if(showLogs) {
        console.log(`❌ ${str}`);
      }
    },

    task: function(str) {
      if(showLogs) {
        console.log(`🛠 ${str}`);
      }
    },

    info: function(val) {
      if(showLogs) {
        console.info(val);
      }
    },

    warn: function(str) {
      if(showLogs) {
        console.warn(str);
      }
    },

    error: function(val) {
      if(showLogs) {
        console.error(val);
      }
    }

  }

  return logger;

}