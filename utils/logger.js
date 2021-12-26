/* eslint-disable */
const getGroupTitleStyle =(backgroundColor, color) => {
  return `background-color: ${backgroundColor}; color: ${color}`
}

const colorMap = [
  {
    match: 'MIXIN',
    backgroundColor: '#ff96f8',
  },
  {
    match: 'STORYBLOK',
    color: '#fff',
    backgroundColor: '#089B97'
  },
  {
    match: 'PLUGIN',
    color: '#fff',
    backgroundColor: '#18aa01'
  }
]

export const logger = ({
  title = 'GENERIC',
  time = true,
  mute = false,
  backgroundColor = 'none',
  color = '#000',
}) => {

  const showLogs = process.env.NUXT_ENV_ENABLE_LOGGER && !mute;

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
          this.groupColor = mappedColor.color || color
        }
        this.groupTitle = groupTitle;
        console.group('%c %s', getGroupTitleStyle(this.groupBackgroundColor, this.groupColor), ` ${this.logTitle} | ${this.groupTitle} `
        );
        if(time) {
          this.groupTimestamp = new Date().getTime();
          console.time(`⌚ [${this.groupTimestamp}] completed in`)
        }
      }
    },

    groupEnd: function() {
      if(showLogs) {
        console.groupEnd();
        if(time) {
          console.timeEnd(`⌚ [${this.groupTimestamp}] completed in`)
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