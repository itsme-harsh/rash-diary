import cron from 'node-cron';
import { People } from '../models/people.model.js'; // Adjust import path as needed
import { Relation } from '../models/relation.modal.js'; // Ensure the import path is correct

// Function to check for people's birthdays
async function checkBirthdays() {
  try {
    const today = new Date();
    const month = today.getMonth() + 1; // Month is 0-indexed in JavaScript
    const day = today.getDate();

    const peopleWithBirthdaysToday = await People.aggregate([
      {
        $match: {
          dob: { 
            $ne: null // Ensure dob is not null
          }
        }
      },
      {
        $addFields: {
          month: { $month: "$dob" },
          day: { $dayOfMonth: "$dob" }
        }
      },
      {
        $match: {
          month: month,
          day: day
        }
      }
    ]);

    console.log(`Found ${peopleWithBirthdaysToday.length} people with birthdays today.`);

    for (const person of peopleWithBirthdaysToday) {
      const relation = await Relation.findById(person.relationId);
      if (relation) {
        console.log(`Hello world! User ID: ${relation.userId}, Name: ${person.name}, Profile: ${person.profile}, DOB: ${person.dob}`);
      }
    }
  } catch (err) {
    console.error('Error checking birthdays:', err);
  }
}


// Automatically start the cron job
// cron.schedule('0 12 * * *', () => { // Runs every day at 12:00 PM
cron.schedule('*/1 * * * *', () => { // Runs every day at 12:00 PM
  console.log('Running the birthday cron job...');
  checkBirthdays();
});
