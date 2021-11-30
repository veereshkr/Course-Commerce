export default {
  items: [
    // {
    //   name: 'Home',
    //   url: '/home',
    //   icon: 'icon-home',
    //   badge: {
    //     variant: 'info',
    //     text: ''
    //   }
    // },
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: ''
      }
    },
    {
      name: 'Reviews',
      url: '/reviews',
      icon: 'icon-emotsmile',
      badge: {
        variant: 'info',
        text: ''
      }
    },
    {
      name: 'Stats',
      url: '/sentiments-sentences',
      icon: 'icon-chart'
    },
    // {
    //   name: 'Manage Users',
    //   url: '/manage-users',
    //   icon: 'icon-people',
    //
    // },

    // {
    //   title: true,
    //   name: 'UI elements',
    //   wrapper: {            // optional wrapper object
    //     element: '',        // required valid HTML5 element tag
    //     attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
    //   },
    //   class: ''             // optional class names space delimited list for title item ex: "text-center"
    // },
    // {
    //   name: 'Reviews',
    //   url: '/components',
    //   icon: 'icon-emotsmile',
    //   children: [
    //     {
    //       name: 'Buttons',
    //       url: '/components/buttons',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Social Buttons',
    //       url: '/components/social-buttons',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Cards',
    //       url: '/components/cards',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Forms',
    //       url: '/components/forms',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Modals',
    //       url: '/components/modals',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Switches',
    //       url: '/components/switches',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Tables',
    //       url: '/components/tables',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Tabs',
    //       url: '/components/tabs',
    //       icon: 'icon-puzzle'
    //     }
    //   ]
    // },
    {
      name: 'Feedback',
      url: '/icons',
      icon: 'icon-speech',
      children: [
        {
          name: 'Feedback Overview',
          url: '/feedbacks',
          icon: 'fa fa-snowflake-o fa-lg mt-4',
          badge: {
            variant: 'secondary',
            text: ''
          }
        },
        {
          name: 'Upload Emails',
          url: '/upload-emails',
          icon: 'fa fa-upload fa-lg mt-4',
          badge: {
            variant: 'secondary',
            text: ''
          }
        },
        {
          name: 'Uploaded Guest List',
          url: '/guests',
          icon: 'fa fa-list-alt fa-lg mt-4'
        }
      ]
    },
    // {
    //   name: 'Guest List',
    //   url: '/guest-list',
    //   icon: 'icon-list',
    //
    // },
    // {
    //   name: 'Engage',
    //   url: '/engage',
    //   icon: 'icon-bubbles',
    //   badge: {
    //     variant: 'info',
    //     text: 'NEW'
    //   }
    // },

    {
      divider: true
    }
    // ,
    //
    // {
    //   name: 'Call ',
    //   icon: 'icon-phone',
    //
    // },
    // {
    //   name: 'Email ',
    //   url: '/mailto:team@.com?Subject=Hello',
    //   icon: 'icon-envelope'
    // }
    // {
    //   name: 'Try GT Engage',
    //   url: 'http://.com/',
    //   icon: 'icon-layers',
    //   class: 'mt-auto',
    //   variant: 'danger'
    // }
  ]
};
