const dashboardAnimation = {
  name: 'Slide Right',
  variants: {
    initial: {
      opacity: 0,
      left: '100%',

    },
    animate: {
      opacity: 1,
      left: 0,

    },
    exit: {
      opacity: 0,
      left: '100%',

    }
  },
  transition: {
    duration: 0.5
  }
}
export default dashboardAnimation;