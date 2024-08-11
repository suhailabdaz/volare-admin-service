import 'dotenv/config'

export default {
    rabbitMQ: {
      url: String(process.env.RABBITMQ_LINK),
      queues: {
        adminQueue: "admin_queue",
      },
    },
  };