import {logger} from '@/utils/logger'

const log = logger({
  title: "toolkit",
  time: false,
  backgroundColor: "#057add",
  color: "#fff"
})

const toolkit = {

  // Dates
  ISODate: (val = false) => {
    if(val) {
      return new Date(val).toISOString().split('T')[0];
    } else {
      return ''
    }
  },

  shortDate: (val = false) => {
    const date = val ? new Date(val) : new Date();
    return `${date.getDate()}-${(date.getMonth() + 1)}-${date.getFullYear()}`
  },


  // Integers
  isEven: (num) => {
    return num % 2 === 0;
  },

  randomInt: (min = 0, max = 10000) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  },


  // Objects, Arrays, Values
  isEmpty: (val) => {
    return (
      val === null
      || val === undefined
      || val === ''
      || (Object.prototype.hasOwnProperty.call(val, 'length') && val.length === 0)
      || (val.constructor === Object && Object.keys(val).length === 0)
    )
  },

  // Type Check
  isObject: (val) => {
    return typeof val === 'object' && val !== null;
  },

  isArray: (val) => {
    return Array.isArray(val);
  },

  isString: (val) => {
    return typeof val === 'string';
  },

  // Case Converters
  camelCase: (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
      if (+match === 0) return "";
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  },
  kebabCase: (str) => {
      return str && str
          .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
          .map(x => x.toLowerCase())
          .join('-');
  },
  snakeCase: (str) => {
      return str && str
          .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
          .map(x => x.toLowerCase())
          .join('_');
  },
  titleCase: (str) => {
    return str.toLowerCase().split(' ').map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  },
  capitalizeFirstLetter: (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },


  // Scroll Page
  scrollPage: ({
    target,
    axis = 'top',
    offset = false,
    smooth = false,
  } = {}) => {

    log.group(`scrollPage to '${target}'`);

    const targetElement = document.querySelector(target);

    if(!targetElement) {
      return log.warn(`scrollPage(${target}) failed because the [target] element does not exist`)
    }

    let targetOffset = 0
    if (offset) {
      if(offset.element) {
        const offsetElement = document.querySelector(offset.element)
        if(!offsetElement) {
          return log.warn(`scrollPage(${target}) failed because the specified [offset] element does not exist`)
        }
        targetOffset = document.querySelector(offset).clientHeight;
      } else if(offset.value) {
        targetOffset = offset.value
      }
    }

    const scrollOptions = {
      left: 0,
      top: (targetElement.getBoundingClientRect()
      [axis] + window.pageYOffset) - targetOffset,
    }

    if(smooth) {scrollOptions.behavior = 'smooth'}

    window.scrollTo(scrollOptions);

    log.groupEnd();

  },

  // Set background image (Vue only)
  setBackgroundImage: (url) => {
    return {backgroundImage: `url('${url}')`}
  },


}

export default ({app}, inject) => {
  inject('toolkit', toolkit);
}