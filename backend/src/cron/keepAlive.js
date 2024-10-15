import axios from 'axios';
import { CronJob } from 'cron';
const job = CronJob.from({
    cronTime: '*/13 * * * *', 
    onTick: function () {
        // const apiUrl = 'http://localhost:3000/keep-alive'; // Ensure this URL is correct
        const apiUrl = 'https://rash-diary.onrender.com/keep-alive'; // Ensure this URL is correct

        // Get the current time in the specified time zone
        const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
        console.log(`Current time in Asia/Kolkata: ${now}`);

        axios.get(apiUrl)
            .then(response => {
                console.log('keep Alive');
            })
            .catch(error => {
                console.error('cron keep-alive error');
            });
    },
    start: true,
    timeZone: 'Asia/Kolkata'
});

export default job;