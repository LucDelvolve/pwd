module.exports = {
    purge: {
      enabled: process.env.NODE_ENV === 'production',
      content: [ './src/views/**/*.js' ],
    },
    theme: {
      extend: {},
    },
    variants: {},
    plugins: [],
  }
  