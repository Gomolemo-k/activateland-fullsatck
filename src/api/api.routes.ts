import express from 'npm:express@4.18.2'
import usersRoutes from '../modules/user/routes/user.routes.ts'

const app = express()

app.use(express.json())

// Add routes from diferent files
// app.use('/api', usersRoutes)
app.use(usersRoutes)

export default app;