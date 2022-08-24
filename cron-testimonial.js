import { schedule } from 'node-cron';
import dotenv from 'dotenv'
import axios from 'axios'
import fs from 'fs'

dotenv.config()

schedule('* 9,21 * * *', async function() {
  console.log('cronjob testimonial is running')

  const SHEETDB_API_ONLINE_GUEST = process.env.VITE_SHEETDB_API_ONLINE_GUEST

  try {
    const testimonials = await loadTestimonials()

    const filePath = './static/'
    const fileName = 'testimonials.json'

    console.log('testimonials', testimonials)

    fs.writeFileSync(filePath + fileName, JSON.stringify(testimonials), 'utf-8')

    console.log('file written')
  } catch(e) {
    console.log('Testimonial Error', e)
  }

  async function loadTestimonials () {
    const { data } = await axios.get(`${SHEETDB_API_ONLINE_GUEST}/search?ONLINE=ONLINE`)
    return data
      .filter(guest => guest.Testimonial)
      .map(guest => ({
        name: guest.Name,
        testimonial: guest.Testimonial
      }))
  }
});
