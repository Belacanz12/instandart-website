/**
 * debounce function
 * use inDebounce to maintain internal reference of timeout to clear
 */
export const debounce = (func, delay) => {
  let inDebounce
  return function() {
    const context = this
    const args = arguments
    clearTimeout(inDebounce)
    inDebounce = setTimeout(() => func.apply(context, args), delay)
  }
}

/**
 * throttle function that catches and triggers last invocation
 * use time to see if there is a last invocation
 */
export const throttle = (func, limit) => {
  let lastFunc
  let lastRan
  return function() {
    const context = this
    const args = arguments
    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function() {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}

export const getScrollHeight = (width) => {
  let i = 0 - 600;

  if(width === 320) {
    i += 2030;
  } else if(320 <= width && width < 480) {
    i += 2234;
  } else if(480 <= width && width < 600){
    i += 2148;
  } else if(600 <= width && width < 750){
    i += 1720;
  } else if(750 <= width && width < 970){
    i += 2013;
  } else if(970 <= width && width < 1280){
    i += 2817;
  } else {
    i += 2817;
  }

  return i;
}
