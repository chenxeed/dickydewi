import { schedule } from 'node-cron';
import dotenv from 'dotenv'
import axios from 'axios'
import fs from 'fs'

dotenv.config()

schedule('* 9,21 * * *', async function() {
  console.log('cronjob testimonial is running at', Date(Date.now()).toString())

  const SHEETDB_API_ONLINE_GUEST = process.env.VITE_SHEETDB_API_ONLINE_GUEST

  try {
    const testimonials = await loadTestimonials()
    console.log('testimonials length: ', testimonials?.length)

    const filePath = './static/'
    const fileName = 'testimonials.json'
    fs.writeFileSync(filePath + fileName, JSON.stringify(testimonials), 'utf-8')
    console.log('file successfully written')
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
