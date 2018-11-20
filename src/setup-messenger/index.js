const { fbClient } = require('../utils/axios');

fbClient.post('/me/messenger_profile', {
  get_started: {
    payload: 'WELCOME',
  },
  persistent_menu: [
    {
      locale: 'default',
      composer_input_disabled: false,
      call_to_actions: [
        {
          type: 'postback',
          title: 'Create',
          payload: 'CREATE',
        }, {
          type: 'postback',
          title: 'List all',
          payload: 'LIST',
        },
      ],
    },
  ],
}).then((response) => {
  console.log(response.status, response.statusText, response.data);
}, ({ response }) => {
  console.error(response.status, response.statusText, response.data);
});
