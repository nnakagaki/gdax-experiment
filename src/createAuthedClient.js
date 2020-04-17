import { AuthenticatedClient } from 'coinbase-pro';

let authedClient;

export default function({ key, secret, passphrase }) {
  if (!authedClient) {
    authedClient = new AuthenticatedClient(
      key,
      secret,
      passphrase,
      'https://api.pro.coinbase.com'
    );
  }

  return authedClient;
}
