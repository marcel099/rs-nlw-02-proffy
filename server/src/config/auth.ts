// export interface AuthConfig {
//   secret: string,
//   expire: string,
// }

// No deploy isso fará com que todos os tokens se tornem inválidos uma vez que o server seja reiniciado
// import crypto from 'crypto';
// crypto.randomBytes(6).toString('hex')

const authConfig = {
  secret: 'secret',
  expire: '24h',
}

export default authConfig;
