const { FRACTAL_STATUS } = require('../../../../constants');

module.exports = {
  label: 'Notificatiebalk',
  status: FRACTAL_STATUS.inprogress.id,
  default: 'default',
  variants: [
    {
      name: 'default',
      label: 'Standaard',
      context: {
        info: true,
      },
    },
    {
      name: 'info',
      label: 'Info',
      context: {
        themeClass: 'notification-bar__info',
        info: true,
      },
    },
    {
      name: 'warning',
      label: 'Waarschuwing',
      context: {
        themeClass: 'notification-bar__warning',
        exclamation: true,
      },
    },
    {
      name: 'danger',
      label: 'Fout',
      context: {
        themeClass: 'notification-bar__danger',
        cross: true,
      },
    },
    {
      name: 'success',
      label: 'Succes',
      context: {
        themeClass: 'notification-bar__success',
        check: true,
      },
    },
  ],
};
