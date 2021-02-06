import app from './app'

const server = app.listen(process.env.PORT || 8080, () => {
  const { host, port }: any = server.address()

  console.log(`server started ${process.env.NODE_ENV} at http://${host}:${port}`)
})
