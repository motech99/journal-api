import mongoose from 'mongoose'
import { Entry, Category } from "./db.js"

const categories = [
    { name: 'Food' },
    { name: 'Gaming' },
    { name: 'Coding' },
    { name: 'Other' }
]

await Category.deleteMany()
console.log('Deleted Categories')
const cats = await Category.insertMany(categories)
console.log('Added Categories')


const entries = [
    { category: cats[0], content: 'Pizza is yummy!' },
    { category: cats[2], content: 'Coding is fun!' },
    { category: cats[2], content: 'Coding is not fun!' },
    { category: cats[1], content: 'War. War never changes.' }
]

await Entry.deleteMany()
console.log('Deleted Entries')
await Entry.insertMany(entries)
console.log('Added Entries')

mongoose.disconnect()
