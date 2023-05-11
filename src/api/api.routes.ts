import express from 'npm:express'
import usersRoutes from '../modules/user/routes/user.routes.ts'

const app = express()

app.use(express.json())

// Add routes from diferent files
// app.use('/api', usersRoutes)
app.use(usersRoutes)

export default app;