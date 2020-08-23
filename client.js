const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const PROTO_PATH = __dirname + '/hello.proto'

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
)

const helloProto = grpc.loadPackageDefinition(packageDefinition)

const client = new helloProto.hello.Greeter('127.0.0.1:6565', grpc.credentials.createInsecure())

client.sayHello({id:1, name: '太郎'}, (error, response) => {
  if(!error){
    console.log(response.message)
  }else{
    console.error(error)
  }
})
