import axios from 'axios';
import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.axios = axios;
window.Pusher = Pusher;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true;
window.axios.defaults.withXSRFToken = true;
window.Echo = new Echo({broadcaster: "pusher",key: import.meta.env.VITE_PUSHER_APP_KEY,cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,forceTLS: true,
});
// Laravel axios request-үүдийг AJAX request гэж танина.