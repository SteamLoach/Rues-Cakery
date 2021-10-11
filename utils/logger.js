/* eslint-disable */
import { ENABLE_LOGGER } from "@/constants/app-variables";

const getGroupTitleStyle =(backgroundColor, color) => {
  return `background-color: ${backgroundColor}; color: ${color}`
}

const colorMap = [
  {
    match: 'MIXIN',
    backgroundColor: '#ff96f8',
  }
]

export const logger = ({
  title = 'GENERIC',
  time = true,
  mute= false,
  backgroundColor = 'none',
  color = '#000',
}) => {

  const showLogs = ENABLE_LOGGER && !mute;

  const logger = {

    logTitle: title.toUpperCase(),
    groupTitle: null,
    groupBackgroundColor: backgroundColor,
    groupColor: color,
    groupTimestamp: null,

    group: function(groupTitle) {
      if(showLogs) {
        const mappedColor = colorMap.find(
          map => map.match === this.logTitle
        );
        if(mappedColor) {
          this.groupBackgroundColor = mappedColor.backgroundColor;
          this.groupColor = color || mappedColor.color
        }
        this.groupTitle = groupTitle;
        console.group('%c %s', getGroupTitleStyle(this.groupBackgroundColor, this.groupColor), ` ${this.logTitle} | ${this.groupTitle} `
        );
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

    spacer: function() {
      if(showLogs) {
        console.log('          ')
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

    table: function(val) {
      if(showLogs) {
        console.table(val)
        console.log('          ')
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